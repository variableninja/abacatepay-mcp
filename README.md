# 🥑 Abacate Pay MCP Server

Um servidor MCP (Model Context Protocol) para integração com a API do Abacate Pay, permitindo gerenciar pagamentos, clientes e cobranças através de assistentes de IA como Claude.

## ✨ O que você pode fazer

- 👥 **Gerenciar clientes**: Criar e listar clientes
- 💰 **Criar cobranças**: Links de pagamento e faturas
- 📱 **QR Codes PIX**: Pagamentos instantâneos
- 🎫 **Cupons de desconto**: Promoções e descontos
- 🔍 **Testar facilmente**: Script inspector integrado

## 🚀 Instalação Rápida

```bash
# Clone e instale
git clone https://github.com/AbacatePay/abacatepay-mcp.git
cd abacatepay-mcp
npm install && npm run build

# Configure sua chave de API
export ABACATE_PAY_API_KEY="sua_chave_api_aqui"

# Teste
npm run inspector
```

## ⚙️ Configuração no Claude Desktop

Adicione ao seu `claude_desktop_config.json`:

**macOS/Linux:**
```json
{
  "mcpServers": {
    "abacate-pay": {
      "command": "node",
      "args": [
        "/caminho/absoluto/para/abacatepay-mcp/dist/index.js",
        "--key",
        "sua_chave_api_do_abacate_pay"
      ]
    }
  }
}
```

**Windows:**
```json
{
  "mcpServers": {
    "abacate-pay": {
      "command": "node",
      "args": [
        "C:\\caminho\\absoluto\\para\\abacatepay-mcp\\dist\\index.js",
        "--key",
        "sua_chave_api_do_abacate_pay"
      ]
    }
  }
}
```

## 🎯 Como usar

Após configurar, use comandos naturais no Claude:

```
"Crie um cliente chamado João Silva com CPF 123.456.789-01"
"Liste meus clientes cadastrados"
"Crie uma cobrança de R$ 150 para consultoria"
"Gere um QR Code PIX de R$ 50 para pagamento rápido"
"Crie um cupom de 20% de desconto com código PROMO20"
```

## 🔍 Testando com MCP Inspector

O **MCP Inspector** é a forma mais fácil de testar e explorar as funcionalidades:

```bash
npm run inspector
```

**O que acontece:**
- ✅ Verifica se o projeto está compilado
- ✅ Compila automaticamente se necessário  
- ✅ Pede sua chave de API de forma segura (sem mostrar no terminal)
- ✅ Abre o MCP Inspector no navegador
- ✅ Permite testar todas as funcionalidades interativamente

**💡 Dica:** Configure a variável de ambiente para não precisar digitar a chave toda vez:
```bash
export ABACATE_PAY_API_KEY="sua_chave_aqui"
npm run inspector
```

## 📚 Funcionalidades Disponíveis

### 👥 Gestão de Clientes
- `createCustomer` - Criar novos clientes com CPF/CNPJ
- `listCustomers` - Listar todos os clientes cadastrados

### 💰 Gestão de Cobranças  
- `createBilling` - Criar links de pagamento personalizados
- `listBillings` - Listar todas as cobranças criadas

### 📱 QR Code PIX
- `createPixQrCode` - Gerar QR Code PIX para pagamento direto
- `checkPixStatus` - Verificar status de pagamento
- `simulatePixPayment` - Simular pagamento (modo desenvolvimento)

### 🎫 Gestão de Cupons
- `createCoupon` - Criar cupons de desconto (% ou valor fixo)
- `listCoupons` - Listar todos os cupons criados

## 🐛 Problemas Comuns

### Servidor não aparece no Claude
1. Verifique se o caminho no `claude_desktop_config.json` está correto
2. Certifique-se de que executou `npm run build`
3. Reinicie o Claude Desktop completamente

### Erro de autenticação
1. Confirme se a chave de API está correta
2. Teste primeiro com `npm run inspector`
3. Verifique se a chave tem as permissões necessárias

### Erro de compilação
```bash
# Limpe e recompile
npm run clean
npm run build
```

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Este projeto é amigável para iniciantes.

**Contribuição rápida:**
```bash
# Fork, clone e configure
git clone https://github.com/SEU_USUARIO/abacatepay-mcp.git
cd abacatepay-mcp && npm install

# Faça suas mudanças e teste
npm run build && npm run inspector

# Envie sua contribuição
git add . && git commit -m "feat: minha contribuição"
git push origin minha-branch
```

📖 **Guia completo de desenvolvimento**: [CONTRIBUTING.md](CONTRIBUTING.md)

## 📞 Suporte

- 🐛 [Reportar problemas](https://github.com/AbacatePay/abacatepay-mcp/issues)
- 📖 [Documentação do Abacate Pay](https://docs.abacatepay.com)
- 🔧 [Model Context Protocol](https://modelcontextprotocol.io)

---

Feito com ❤️ para a comunidade brasileira de desenvolvedores


