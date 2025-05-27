# 🤝 Contribuindo para o Abacate Pay MCP

Obrigado por considerar contribuir para este projeto! 

## 🚀 Configuração do Ambiente de Desenvolvimento

### Pré-requisitos
- Node.js 16 ou superior
- npm ou yarn
- Chave de API do Abacate Pay

### Instalação
```bash
# Clone o repositório
git clone https://github.com/ViniciusAmeric/abacate-pay-mcp.git
cd abacate-pay-mcp

# Instale as dependências
npm install

# Compile o projeto
npm run build
```

### Scripts Disponíveis
- `npm run build` - Compila o TypeScript para JavaScript
- `npm run dev` - Modo desenvolvimento com recompilação automática
- `npm run start` - Executa o servidor compilado
- `npm run clean` - Remove a pasta de compilação

## 🧪 Testando

Para testar o MCP:
```bash
# Configure sua chave de API
export ABACATE_PAY_API_KEY="sua_chave_aqui"

# Execute o servidor
npm run build && npm start
```

## 📝 Padrões de Código

- Use TypeScript
- Siga as convenções do ESLint (quando configurado)
- Documente funções públicas
- Use nomes descritivos para variáveis e funções

## 🔄 Processo de Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📋 Estrutura do Projeto

```
abacate-pay-mcp/
├── src/
│   └── index.ts          # Código principal do servidor MCP
├── dist/                 # Arquivos compilados (não versionados)
├── package.json          # Configurações do projeto
├── tsconfig.json         # Configurações do TypeScript
├── README.md            # Documentação principal
└── CONTRIBUTING.md      # Este arquivo
```