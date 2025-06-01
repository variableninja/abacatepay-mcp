# 🤝 Como Contribuir - Abacate Pay MCP 🥑

## ⚡ Setup Rápido

```bash
# Fork + clone + install
npm install

# 🎯 TESTE PRIMEIRO: Se o inspector abrir, está pronto!
npm run inspector
```

## 🔧 Configuração Local (Claude Desktop)

Para testar no Claude Desktop localmente, adicione ao `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "abacate-pay": {
      "command": "node",
      "args": ["/caminho/completo/para/abacatepay-mcp/dist/index.js"],
      "env": {
        "ABACATE_PAY_API_KEY": "sua_api_key"
      }
    }
  }
}
```

## 📝 Fazendo Mudanças

Após implementar sua funcionalidade ou correção:

```bash
# 1. Crie um changeset para documentar sua mudança
npm run changeset

# O CLI vai perguntar:
# - Tipo de mudança (patch/minor/major)
# - Descrição da mudança para usuários finais

# 2. Commit tudo junto
git add .
git commit -m "feat: sua funcionalidade + changeset"
```

---

**Dúvidas?** Abra uma [issue](https://github.com/AbacatePay/abacatepay-mcp/issues) 🙋‍♂️