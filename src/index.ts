import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import minimist from "minimist";

// Parse argumentos da linha de comando
const argv = minimist(process.argv.slice(2));

// Obter chave de API do argumento ou variável de ambiente
const apiKey = argv.key || process.env.ABACATE_PAY_API_KEY;

if (!apiKey) {
  console.error(
    "❌ Chave de API não fornecida.\n" +
    "Use uma das opções:\n" +
    "  1. --key sua_chave_aqui\n" +
    "  2. Variável de ambiente ABACATE_PAY_API_KEY\n" +
    "  3. Configure no claude_desktop_config.json"
  );
  process.exit(1);
}

console.error("✅ Abacate Pay MCP Server iniciado com sucesso");

const ABACATE_PAY_API_BASE = "https://api.abacatepay.com/v1";
const USER_AGENT = "abacate-pay-mcp/1.0";

const server = new McpServer({
  name: "abacate-pay-mcp",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

async function makeAbacatePayRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    "User-Agent": USER_AGENT,
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
  };

  // Construir URL corretamente
  const url = `${ABACATE_PAY_API_BASE}/${endpoint}`;
  
  // Log para debug
  console.error(`Debug - URL construída: ${url}`);
  console.error(`Debug - Método: ${options.method || 'GET'}`);

  try {
    const response = await fetch(url, {
      ...options,
      headers: { ...headers, ...options.headers }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return await response.json() as T;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}

//Create Customer
server.tool(
  "createCustomer",
  "Cria um novo cliente no Abacate Pay",
  {
    name: z.string().describe("Nome completo do cliente"),
    cellphone: z.string().describe("Celular do cliente (ex: (11) 4002-8922)"),
    email: z.string().email().describe("E-mail do cliente"),
    taxId: z.string().describe("CPF ou CNPJ válido do cliente (ex: 123.456.789-01)")
  },
  async ({ name, cellphone, email, taxId }) => {
    try {
      const response = await makeAbacatePayRequest<any>("customer/create", {
        method: "POST",
        body: JSON.stringify({
          name,
          cellphone,
          email,
          taxId
        })
      });

      return {
        content: [
          {
            type: "text",
            text: `Cliente criado com sucesso!\nID: ${response.data?.id || 'N/A'}\nNome: ${name}\nEmail: ${email}\nCelular: ${cellphone}\nCPF/CNPJ: ${taxId}`
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Falha ao criar cliente: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
          }
        ]
      };
    }
  }
);

//List Customers
server.tool(
  "listCustomers",
  "Lista todos os clientes cadastrados no Abacate Pay",
  {},
  async () => {
    try {
      const response = await makeAbacatePayRequest<any>("customer/list", {
        method: "GET"
      });

      if (!response.data || response.data.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "Nenhum cliente encontrado."
            }
          ]
        };
      }

      const customersList = response.data.map((customer: any, index: number) => {
        const metadata = customer.metadata || {};
        return `${index + 1}. ID: ${customer.id}
   Nome: ${metadata.name || 'N/A'}
   Email: ${metadata.email || 'N/A'}
   Celular: ${metadata.cellphone || 'N/A'}
   CPF/CNPJ: ${metadata.taxId || 'N/A'}`;
      }).join('\n\n');

      return {
        content: [
          {
            type: "text",
            text: `Lista de Clientes (${response.data.length} encontrado(s)):\n\n${customersList}`
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Falha ao listar clientes: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
          }
        ]
      };
    }
  }
);

//Create Billing
server.tool(
  "createBilling",
  "Cria uma nova cobrança no Abacate Pay",
  {
    frequency: z.enum(["ONE_TIME", "MULTIPLE_PAYMENTS"]).default("ONE_TIME").describe("Tipo de frequência da cobrança"),
    methods: z.array(z.enum(["PIX"])).default(["PIX"]).describe("Métodos de pagamento (atualmente apenas PIX)"),
    products: z.array(z.object({
      externalId: z.string().describe("ID externo do produto"),
      name: z.string().describe("Nome do produto"),
      description: z.string().describe("Descrição do produto"),
      quantity: z.number().describe("Quantidade do produto"),
      price: z.number().describe("Preço unitário em centavos")
    })).describe("Lista de produtos"),
    returnUrl: z.string().url().describe("URL para redirecionar caso o cliente clique em 'Voltar'"),
    completionUrl: z.string().url().describe("URL para redirecionar quando o pagamento for concluído"),
    customerId: z.string().optional().describe("ID de um cliente já cadastrado (opcional)")
  },
  async ({ frequency, methods, products, returnUrl, completionUrl, customerId }) => {
    try {
      const requestBody: any = {
        frequency,
        methods,
        products,
        returnUrl,
        completionUrl
      };

      if (customerId) {
        requestBody.customerId = customerId;
      }

      const response = await makeAbacatePayRequest<any>("billing/create", {
        method: "POST",
        body: JSON.stringify(requestBody)
      });

      const data = response.data;
      const totalAmount = (data.amount / 100).toFixed(2);
      
      return {
        content: [
          {
            type: "text",
            text: `Cobrança criada com sucesso! 🎉\n\n` +
                  `📋 **Detalhes da Cobrança:**\n` +
                  `• ID: ${data.id}\n` +
                  `• Status: ${data.status}\n` +
                  `• Valor Total: R$ ${totalAmount}\n` +
                  `• Frequência: ${data.frequency}\n` +
                  `• Métodos: ${data.methods.join(', ')}\n` +
                  `• Produtos: ${data.products.length} item(s)\n\n` +
                  `🔗 **Link de Pagamento:**\n${data.url}\n\n` +
                  `${data.devMode ? '⚠️ Modo de desenvolvimento ativo' : '✅ Modo de produção'}`
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Falha ao criar cobrança: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
          }
        ]
      };
    }
  }
);

//List Billings
server.tool(
  "listBillings",
  "Lista todas as cobranças criadas no Abacate Pay",
  {},
  async () => {
    try {
      const response = await makeAbacatePayRequest<any>("billing/list", {
        method: "GET"
      });

      if (!response.data || response.data.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "Nenhuma cobrança encontrada."
            }
          ]
        };
      }

      const billingsList = response.data.map((billing: any, index: number) => {
        const amount = (billing.amount / 100).toFixed(2);
        const customer = billing.customer?.metadata;
        
        const statusEmojis: Record<string, string> = {
          'PENDING': '⏳',
          'PAID': '✅',
          'EXPIRED': '⏰',
          'CANCELLED': '❌',
          'REFUNDED': '↩️'
        };
        const statusEmoji = statusEmojis[billing.status] || '❓';

        return `${index + 1}. ${statusEmoji} **${billing.status}** - R$ ${amount}
   📋 ID: ${billing.id}
   🔗 URL: ${billing.url}
   📦 Produtos: ${billing.products.length} item(s)
   👤 Cliente: ${customer?.name || 'N/A'}
   📅 Frequência: ${billing.frequency}
   💳 Métodos: ${billing.methods.join(', ')}
   ${billing.devMode ? '⚠️ Modo Dev' : '✅ Produção'}`;
      }).join('\n\n');

      return {
        content: [
          {
            type: "text",
            text: `📋 **Lista de Cobranças** (${response.data.length} encontrada(s)):\n\n${billingsList}`
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Falha ao listar cobranças: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
          }
        ]
      };
    }
  }
);

//Create PIX QR Code
server.tool(
  "createPixQrCode",
  "Cria um QR Code PIX para pagamento direto",
  {
    amount: z.number().describe("Valor da cobrança em centavos"),
    expiresIn: z.number().optional().describe("Tempo de expiração em segundos (opcional)"),
    description: z.string().max(140).optional().describe("Mensagem que aparecerá no pagamento PIX (máx 140 caracteres)"),
    customer: z.object({
      name: z.string().describe("Nome completo do cliente"),
      cellphone: z.string().describe("Celular do cliente"),
      email: z.string().email().describe("E-mail do cliente"),
      taxId: z.string().describe("CPF ou CNPJ do cliente")
    }).optional().describe("Dados do cliente (opcional)")
  },
  async ({ amount, expiresIn, description, customer }) => {
    try {
      const requestBody: any = {
        amount
      };

      if (expiresIn) {
        requestBody.expiresIn = expiresIn;
      }

      if (description) {
        requestBody.description = description;
      }

      if (customer) {
        requestBody.customer = customer;
      }

      const response = await makeAbacatePayRequest<any>("pixQrCode/create", {
        method: "POST",
        body: JSON.stringify(requestBody)
      });

      const data = response.data;
      const amountFormatted = (data.amount / 100).toFixed(2);
      const feeFormatted = (data.platformFee / 100).toFixed(2);
      
      return {
        content: [
          {
            type: "text",
            text: `🎯 **QR Code PIX criado com sucesso!**\n\n` +
                  `📋 **Detalhes:**\n` +
                  `• ID: ${data.id}\n` +
                  `• Valor: R$ ${amountFormatted}\n` +
                  `• Status: ${data.status}\n` +
                  `• Taxa da Plataforma: R$ ${feeFormatted}\n` +
                  `• Criado em: ${new Date(data.createdAt).toLocaleString('pt-BR')}\n` +
                  `• Expira em: ${new Date(data.expiresAt).toLocaleString('pt-BR')}\n\n` +
                  `📱 **Código PIX (Copia e Cola):**\n\`\`\`\n${data.brCode}\n\`\`\`\n\n` +
                  `🖼️ **QR Code Base64:**\n${data.brCodeBase64.substring(0, 100)}...\n\n` +
                  `${data.devMode ? '⚠️ Modo de desenvolvimento ativo' : '✅ Modo de produção'}`
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Falha ao criar QR Code PIX: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
          }
        ]
      };
    }
  }
);

//Simulate PIX Payment
server.tool(
  "simulatePixPayment",
  "Simula o pagamento de um QR Code PIX (apenas em modo desenvolvimento)",
  {
    id: z.string().describe("ID do QR Code PIX para simular o pagamento"),
    metadata: z.object({}).optional().describe("Metadados opcionais para a requisição")
  },
  async ({ id, metadata }) => {
    try {
      const requestBody: any = {};

      if (metadata) {
        requestBody.metadata = metadata;
      }

      const response = await makeAbacatePayRequest<any>(`pixQrCode/simulate-payment?id=${id}`, {
        method: "POST",
        body: JSON.stringify(requestBody)
      });

      const data = response.data;
      const amountFormatted = (data.amount / 100).toFixed(2);
      const feeFormatted = (data.platformFee / 100).toFixed(2);
      
      const statusEmojis: Record<string, string> = {
        'PENDING': '⏳',
        'PAID': '✅',
        'EXPIRED': '⏰',
        'CANCELLED': '❌',
        'REFUNDED': '↩️'
      };
      const statusEmoji = statusEmojis[data.status] || '❓';
      
      return {
        content: [
          {
            type: "text",
            text: `${statusEmoji} **Pagamento PIX simulado com sucesso!**\n\n` +
                  `📋 **Detalhes do Pagamento:**\n` +
                  `• ID: ${data.id}\n` +
                  `• Status: ${data.status}\n` +
                  `• Valor: R$ ${amountFormatted}\n` +
                  `• Taxa da Plataforma: R$ ${feeFormatted}\n` +
                  `• Criado em: ${new Date(data.createdAt).toLocaleString('pt-BR')}\n` +
                  `• Atualizado em: ${new Date(data.updatedAt).toLocaleString('pt-BR')}\n` +
                  `• Expira em: ${new Date(data.expiresAt).toLocaleString('pt-BR')}\n\n` +
                  `${data.devMode ? '⚠️ Simulação realizada em modo de desenvolvimento' : '✅ Pagamento em produção'}\n\n` +
                  `🎉 O pagamento foi processado com sucesso!`
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Falha ao simular pagamento PIX: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
          }
        ]
      };
    }
  }
);

//Check PIX Status
server.tool(
  "checkPixStatus",
  "Verifica o status de um QR Code PIX",
  {
    id: z.string().describe("ID do QR Code PIX para verificar o status")
  },
  async ({ id }) => {
    try {
      const response = await makeAbacatePayRequest<any>(`pixQrCode/check?id=${id}`, {
        method: "GET"
      });

      const data = response.data;
      
      const statusEmojis: Record<string, string> = {
        'PENDING': '⏳',
        'PAID': '✅',
        'EXPIRED': '⏰',
        'CANCELLED': '❌',
        'REFUNDED': '↩️'
      };
      const statusEmoji = statusEmojis[data.status] || '❓';
      
      return {
        content: [
          {
            type: "text",
            text: `${statusEmoji} **Status do QR Code PIX**\n\n` +
                  `📋 **ID**: ${id}\n` +
                  `📊 **Status**: ${data.status}\n` +
                  `⏰ **Expira em**: ${new Date(data.expiresAt).toLocaleString('pt-BR')}\n\n` +
                  `${data.status === 'PENDING' ? '⏳ Aguardando pagamento...' : 
                    data.status === 'PAID' ? '✅ Pagamento confirmado!' :
                    data.status === 'EXPIRED' ? '⏰ QR Code expirado' :
                    data.status === 'CANCELLED' ? '❌ QR Code cancelado' :
                    data.status === 'REFUNDED' ? '↩️ Pagamento estornado' : 
                    '❓ Status desconhecido'}`
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Falha ao verificar status do PIX: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
          }
        ]
      };
    }
  }
);

//Create Coupon
server.tool(
  "createCoupon",
  "Cria um novo cupom de desconto",
  {
    code: z.string().describe("Código único do cupom (ex: DESCONTO20)"),
    discountKind: z.enum(["PERCENTAGE", "FIXED"]).describe("Tipo de desconto: PERCENTAGE (porcentagem) ou FIXED (valor fixo)"),
    discount: z.number().describe("Valor do desconto (em % para PERCENTAGE ou em centavos para FIXED)"),
    notes: z.string().optional().describe("Descrição sobre o cupom"),
    maxRedeems: z.number().default(-1).describe("Quantidade máxima de usos (-1 para ilimitado)"),
    metadata: z.object({}).optional().describe("Metadados adicionais do cupom")
  },
  async ({ code, discountKind, discount, notes, maxRedeems, metadata }) => {
    try {
      const requestBody: any = {
        code,
        discountKind,
        discount,
        maxRedeems
      };

      // Adicionar campos opcionais apenas se fornecidos
      if (notes) {
        requestBody.notes = notes;
      }

      if (metadata) {
        requestBody.metadata = metadata;
      }

      const response = await makeAbacatePayRequest<any>("coupon/create", {
        method: "POST",
        body: JSON.stringify(requestBody)
      });

      const data = response.data;
      
      const discountText = data.discountKind === 'PERCENTAGE' 
        ? `${data.discount}%` 
        : `R$ ${(data.discount / 100).toFixed(2)}`;
      
      const maxRedeemsText = data.maxRedeems === -1 
        ? 'Ilimitado' 
        : `${data.maxRedeems} vezes`;

      return {
        content: [
          {
            type: "text",
            text: `🎫 **Cupom criado com sucesso!**\n\n` +
                  `📋 **Detalhes do Cupom:**\n` +
                  `• Código: **${data.code}**\n` +
                  `• Desconto: ${discountText} (${data.discountKind === 'PERCENTAGE' ? 'Porcentagem' : 'Valor Fixo'})\n` +
                  `• Usos Máximos: ${maxRedeemsText}\n` +
                  `• Descrição: ${data.notes || 'Sem descrição'}\n\n` +
                  `✅ O cupom **${data.code}** está pronto para ser usado pelos seus clientes!`
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Falha ao criar cupom: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
          }
        ]
      };
    }
  }
);

//List Coupons
server.tool(
  "listCoupons",
  "Lista todos os cupons de desconto criados",
  {},
  async () => {
    try {
      const response = await makeAbacatePayRequest<any>("coupon/list", {
        method: "GET"
      });

      if (!response.data || response.data.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "Nenhum cupom encontrado."
            }
          ]
        };
      }

      const couponsList = response.data.map((coupon: any, index: number) => {
        const discountText = coupon.discountKind === 'PERCENTAGE' 
          ? `${coupon.discount}%` 
          : `R$ ${(coupon.discount / 100).toFixed(2)}`;
        
        const maxRedeemsText = coupon.maxRedeems === -1 
          ? 'Ilimitado' 
          : `${coupon.maxRedeems} vezes`;

        return `${index + 1}. 🎫 **${coupon.code}**
   💰 Desconto: ${discountText} (${coupon.discountKind === 'PERCENTAGE' ? 'Porcentagem' : 'Valor Fixo'})
   🔄 Usos: ${maxRedeemsText}
   📝 Descrição: ${coupon.notes || 'Sem descrição'}`;
      }).join('\n\n');

      return {
        content: [
          {
            type: "text",
            text: `🎫 **Lista de Cupons** (${response.data.length} encontrado(s)):\n\n${couponsList}`
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Falha ao listar cupons: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
          }
        ]
      };
    }
  }
);


async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Abacate Pay MCP Server rodando em stdio");
}

main().catch((error) => {
  console.error("Erro fatal em main():", error);
  process.exit(1);
});