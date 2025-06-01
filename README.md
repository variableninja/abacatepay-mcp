# 🥑 Abacate Pay MCP Server

Um servidor MCP (Model Context Protocol) para integração com a API do Abacate Pay, permitindo gerenciar pagamentos, clientes e cobranças diretamente através de assistentes de IA como Claude e Cursor.

## O que você pode fazer

- 👥 **Gerenciar clientes**: Criar e listar clientes
- 💰 **Criar cobranças**: Links de pagamento e faturas  
- 📱 **QR Codes PIX**: Pagamentos instantâneos
- 🎫 **Cupons de desconto**: Promoções e descontos
- 🔄 **Simular pagamentos**: Testar fluxos em desenvolvimento

## 🚀 Configuração Rápida

### Claude Desktop

Adicione ao seu `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "abacate-pay": {
      "command": "npx",
      "args": [
        "-y",
        "abacatepay-mcp"
      ],
      "env": {
        "ABACATE_PAY_API_KEY": "sua_api_key_aqui"
      }
    }
  }
}
```

### Cursor

Adicione ao seu `settings.json` do Cursor:

```json
{
  "mcp.servers": {
    "abacate-pay": {
      "command": "npx",
      "args": ["abacatepay-mcp"],
      "env": {
        "ABACATE_PAY_API_KEY": "sua_api_key_aqui"
      }
    }
  }
}
```

## 🔑 API Key

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
Error: API Key inválida
```
**Solução**: Verifique se sua API Key está correta no arquivo de configuração.


### MCP Server não conecta
**Solução**: Reinicie o Claude Desktop/Cursor após adicionar a configuração.

## 🤝 Contribuição

Quer contribuir? Veja o [Guia de Contribuição](CONTRIBUTING.md) para:

## 📄 Licença

MIT - veja [LICENSE](LICENSE) para detalhes.

---



