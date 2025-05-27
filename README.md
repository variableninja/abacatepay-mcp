# 🥑 Abacate Pay MCP Server

Um servidor MCP (Model Context Protocol) para integração com a API do Abacate Pay 🥑, permitindo gerenciar clientes, cobranças, QR Codes PIX e cupons de desconto através de assistentes de IA como Claude.

## 🚀 Funcionalidades

### 👥 Gestão de Clientes
- **createCustomer**: Criar novos clientes
- **listCustomers**: Listar todos os clientes cadastrados

### 💰 Gestão de Cobranças
- **createBilling**: Criar cobranças/links de pagamento
- **listBillings**: Listar todas as cobranças

### 📱 QR Code PIX
- **createPixQrCode**: Criar QR Code PIX para pagamento direto
- **simulatePixPayment**: Simular pagamento PIX (modo desenvolvimento)
- **checkPixStatus**: Verificar status de QR Code PIX

### 🎫 Gestão de Cupons
- **createCoupon**: Criar cupons de desconto
- **listCoupons**: Listar todos os cupons

## 📋 Pré-requisitos

- Node.js 16 ou superior
- Chave de API do Abacate Pay 🥑
- Claude Desktop ou outro cliente MCP

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/ViniciusAmeric/abacate-pay-mcp.git
cd abacate-pay-mcp
```

2. Instale as dependências:
```bash
npm install
```

3. Compile o projeto:
```bash
npm run build
```

## ⚙️ Configuração

### Opção 1: Variável de Ambiente
```bash
export ABACATE_PAY_API_KEY="sua_chave_api_aqui"
```

### Opção 2: Argumento de Linha de Comando
```bash
node dist/index.js --key sua_chave_api_aqui
```

### Opção 3: Claude Desktop
Adicione ao arquivo `claude_desktop_config.json`:

**macOS/Linux:**
```json
{
  "mcpServers": {
    "abacate-pay": {
      "command": "node",
      "args": [
        "/caminho/absoluto/para/abacate-pay-mcp/dist/index.js",
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
        "C:\\caminho\\absoluto\\para\\abacate-pay-mcp\\dist\\index.js",
        "--key",
        "sua_chave_api_do_abacate_pay"
      ]
    }
  }
}
```

## 🎯 Uso

Após configurar, você pode usar comandos naturais no Claude:

- "Crie um cliente chamado João Silva"
- "Liste meus clientes"
- "Crie uma cobrança de R$ 100 para consultoria"
- "Crie um QR Code PIX de R$ 50"
- "Crie um cupom de 20% de desconto"

## 📚 Scripts Disponíveis

- `npm run build`: Compila o projeto
- `npm run dev`: Modo desenvolvimento com recompilação automática
- `npm run start`: Executa o servidor compilado
- `npm run clean`: Remove a pasta de compilação

## 🔧 Desenvolvimento

### Estrutura do Projeto
```
abacate-pay-mcp/
├── src/
│   └── index.ts          # Código principal do servidor MCP
├── dist/                 # Arquivos compilados
├── package.json          # Configurações do projeto
├── tsconfig.json         # Configurações do TypeScript
└── README.md            # Este arquivo
```

### Adicionando Novas Funcionalidades

1. Adicione a nova ferramenta em `src/index.ts`
2. Compile o projeto: `npm run build`
3. Teste a funcionalidade

## 🐛 Troubleshooting

### Servidor não aparece no Claude
1. Verifique se o caminho no `claude_desktop_config.json` está correto
2. Certifique-se de que o projeto foi compilado (`npm run build`)
3. Reinicie o Claude Desktop completamente

### Erro de autenticação
1. Verifique se a chave de API está correta
2. Confirme se a chave tem as permissões necessárias
3. Teste a chave diretamente na API do Abacate Pay 🥑

### Logs de Debug
O servidor inclui logs de debug que aparecem no stderr:
- URL construída para cada requisição
- Método HTTP utilizado
- Erros detalhados

## 🤝 Contribuindo

Contribuições são bem-vindas! Este projeto foi criado para a comunidade do Abacate Pay 🥑.

### Como Contribuir
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para mais detalhes sobre o desenvolvimento.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- [Abacate Pay](https://abacatepay.com) 🥑 pela excelente API de pagamentos
- [Anthropic](https://anthropic.com) pelo Model Context Protocol
- Comunidade open source brasileira

## 📞 Suporte

- 🐛 [Issues](https://github.com/ViniciusAmeric/abacate-pay-mcp/issues)
- 📖 [Documentação do Abacate Pay](https://docs.abacatepay.com)
- 🔧 [Model Context Protocol](https://modelcontextprotocol.io)

---

Feito com ❤️ para a comunidade brasileira de desenvolvedores


