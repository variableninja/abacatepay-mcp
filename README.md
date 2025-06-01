# 🥑 Abacate Pay MCP Server

Um servidor MCP (Model Context Protocol) para integração com a API do Abacate Pay, permitindo gerenciar pagamentos, clientes e cobranças diretamente através de assistentes de IA como Claude e Cursor.

## O que você pode fazer

- 👥 **Gerenciar clientes**: Criar e listar clientes
- 💰 **Criar cobranças**: Links de pagamento e faturas  
- 📱 **QR Codes PIX**: Pagamentos instantâneos
- 🎫 **Cupons de desconto**: Promoções e descontos
- 🔄 **Simular pagamentos**: Testar fluxos em desenvolvimento

## 🚀 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/AbacatePay/abacatepay-mcp.git
cd abacatepay-mcp
npm install
npm run build
```

### 2. Configure no Claude Desktop

Adicione ao seu `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "abacate-pay": {
      "command": "node",
      "args": ["/caminho/completo/para/abacatepay-mcp/dist/index.js"],
      "env": {
        "ABACATE_PAY_API_KEY": "sua_api_key_aqui"
      }
    }
  }
}
```

### 3. Configure no Cursor

Adicione ao seu `settings.json` do Cursor:

```json
{
  "mcp.servers": {
    "abacate-pay": {
      "command": "node",
      "args": ["/caminho/completo/para/abacatepay-mcp/dist/index.js"],
      "env": {
        "ABACATE_PAY_API_KEY": "sua_api_key_aqui"
      }
    }
  }
}
```

**⚠️ Importante**: Substitua `/caminho/completo/para/abacatepay-mcp/` pelo caminho real onde você clonou o repositório.

## 🔑 Como obter sua API Key

1. Acesse [Abacate Pay](https://www.abacatepay.com)
2. Vá em **Integrar** → **API Keys**
3. Copie sua API Key e coloque na configuração acima

## 📝 Exemplos de Uso

### 🎯 Campanha com Influencer
```
"Eu contratei um influencer chamado Alex para divulgar meu negócio. Você pode criar um cupom com 15% de desconto usando o código ALEX15 que vale para até 100 usos? Preciso acompanhar o desempenho da campanha."
```

### 🔍 Investigação de Cobranças
```
"Tive uma cobrança estranha ontem que não reconheço. Você pode buscar todas as cobranças de ontem e me mostrar os detalhes para eu verificar o que pode ter acontecido?"
```

### 💼 Novo Cliente Corporativo  
```
"Acabei de fechar um contrato com a empresa TechSolutions LTDA (CNPJ: 12.345.678/0001-90). Pode criar o cadastro deles com o email contato@techsolutions.com e telefone (11) 3456-7890? Depois preciso gerar um QR Code PIX de R$ 10 para o pagamento."
```

## 🐛 Problemas Comuns

### Erro de API Key
```
❌ Chave de API não fornecida
```
**Solução**: Verifique se sua API Key está correta no arquivo de configuração.

### MCP Server não conecta
**Solução**: 
1. Verifique se o caminho para o arquivo está correto
2. Reinicie o Claude Desktop/Cursor após adicionar a configuração
3. Certifique-se de que executou `npm run build`

### Erro de permissão
**Solução**: Certifique-se de que o arquivo `dist/index.js` tenha permissões de execução:
```bash
chmod +x dist/index.js
```

## 🤝 Contribuição

Quer contribuir? Veja o [Guia de Contribuição](CONTRIBUTING.md).

## 📄 Licença

MIT - veja [LICENSE](LICENSE) para detalhes.

---



