# 🤝 Guia de Contribuição - Abacate Pay MCP

## 📝 Conventional Commits

Usamos **Conventional Commits** para gerar automaticamente changelogs e versões. Formato:

```
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé opcional]
```

### 🏷️ **Tipos de Commit:**

- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Mudanças na documentação
- **style**: Formatação (sem mudança de código)
- **refactor**: Refatoração de código
- **test**: Adição/modificação de testes
- **chore**: Tarefas de manutenção

### ✨ **Exemplos:**

```bash
# ✅ Bons exemplos
git commit -m "feat: adiciona suporte a boletos bancários"
git commit -m "fix: corrige erro no cálculo de juros"
git commit -m "docs: atualiza README com novas instruções"
git commit -m "feat(pix): adiciona validação de CPF no QR Code"
git commit -m "fix(billing): resolve bug na criação de cobranças"
git commit -m "chore: atualiza dependências do projeto"

# ❌ Evite
git commit -m "mudanças"
git commit -m "fix stuff"
git commit -m "WIP"
```

### 🔄 **Impacto nas Versões:**

- **feat**: Nova funcionalidade → **Minor** (1.0.0 → 1.1.0)
- **fix**: Correção de bug → **Patch** (1.0.0 → 1.0.1)
- **BREAKING CHANGE**: Quebra compatibilidade → **Major** (1.0.0 → 2.0.0)

---

## 🚀 **Workflow de Release**

### **1️⃣ Preparar Nova Versão:**
```bash
# Para correções de bugs (1.0.0 → 1.0.1)
npm run release:patch

# Para novas funcionalidades (1.0.0 → 1.1.0)
npm run release:minor

# Para mudanças que quebram compatibilidade (1.0.0 → 2.0.0)
npm run release:major

# Para release automático (detecta tipo pelos commits)
npm run release
```

**O que o release-it faz:**
- ✅ Roda lint e build
- ✅ Atualiza versão no `package.json`
- ✅ Cria commit personalizado baseado no tipo
- ✅ Cria tag git
- ✅ Faz push para GitHub
- ❌ **NÃO publica** no NPM automaticamente
- ❌ **NÃO cria** GitHub Release automaticamente

### **2️⃣ Publicar no NPM (Quando quiser):**
```bash
# Primeiro, teste se tudo está ok:
npm run build
npm pack  # Cria arquivo .tgz para testar

# Se estiver tudo certo, publique:
npm publish

# Verificar se foi publicado:
npm view abacatepay-mcp
```

### **3️⃣ Criar GitHub Release (Opcional):**
```bash
# Via GitHub web interface:
# 1. Vá para: https://github.com/AbacatePay/abacatepay-mcp/releases
# 2. Clique em "Create a new release"
# 3. Escolha a tag (ex: v1.0.1)
# 4. Adicione título e descrição
# 5. Publique

# Ou via CLI (se tiver gh instalado):
gh release create v1.0.1 --title "🥑 Abacate Pay MCP v1.0.1" --notes "Correções e melhorias"
```

## 🛡️ **Verificações de Segurança:**

### **Antes de publicar no NPM:**
```bash
# 1. Verificar se você está logado:
npm whoami

# 2. Verificar se o package.json está correto:
cat package.json | grep version

# 3. Verificar se o build está ok:
npm run build
ls -la dist/

# 4. Testar localmente:
npm run inspector

# 5. Verificar se não tem arquivos desnecessários:
npm pack --dry-run
```

### **Checklist de Release:**
- [ ] ✅ Todos os testes passando
- [ ] ✅ Build sem erros
- [ ] ✅ README atualizado
- [ ] ✅ CHANGELOG.md atualizado (se necessário)
- [ ] ✅ Testado com inspector
- [ ] ✅ Versão correta no package.json
- [ ] ✅ Logado no NPM correto (`npm whoami`)

## 📊 **Comandos Úteis:**

### **Verificar o que vai ser publicado:**
```bash
npm pack --dry-run  # Lista arquivos sem criar .tgz
npm pack           # Cria .tgz para inspeção
tar -tzf abacatepay-mcp-1.0.0.tgz  # Ver conteúdo do package
```

### **Cancelar publicação (se necessário):**
```bash
# Despublicar versão específica (cuidado!)
npm unpublish abacatepay-mcp@1.0.1

# Despublicar package completo (MUITO CUIDADO!)
npm unpublish abacatepay-mcp --force
```

### **Reverter versão local (se algo deu errado):**
```bash
# Reverter último commit de release:
git reset --hard HEAD~1

# Deletar tag local:
git tag -d v1.0.1

# Deletar tag remota:
git push origin :refs/tags/v1.0.1
```

## 🎯 **Workflow Recomendado:**

```bash
# 1. Fazer mudanças no código
git add .
git commit -m "feat: nova funcionalidade"
git push origin main

# 2. Quando estiver pronto para release:
npm run release:minor  # ou deixe automático: npm run release

# 3. Testar uma última vez:
npm run inspector

# 4. Publicar no NPM:
npm publish

# 5. (Opcional) Criar release no GitHub via web interface
```

## 🔒 **Vantagens da Abordagem Manual:**

- ✅ **Controle total** sobre quando publicar
- ✅ **Pode testar** antes de disponibilizar publicamente
- ✅ **Sem surpresas** ou publicações acidentais
- ✅ **Pode cancelar** se algo der errado
- ✅ **Aprende o processo** por trás das ferramentas
- ✅ **Mais seguro** para projetos críticos

---

**💡 Dica:** Comece sempre com `npm run release:patch` e `npm pack --dry-run` para ver o que vai acontecer!

## 🎯 **Fluxo de Contribuição:**

1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Crie** uma branch: `git checkout -b minha-feature`
4. **Desenvolva** com commits convencionais
5. **Teste** com `npm run inspector`
6. **Push** para seu fork
7. **Crie** Pull Request
8. **Aguarde** review e merge

## 📊 **Versionamento Automático:**

| Commit Type | Exemplo | Versão |
|-------------|---------|---------|
| `fix:` | Correção de bug | `1.0.0` → `1.0.1` |
| `feat:` | Nova funcionalidade | `1.0.0` → `1.1.0` |
| `feat!:` | Breaking change | `1.0.0` → `2.0.0` |

## 💡 **Dicas:**

- Use `npm run release:dry` para ver o que vai acontecer
- Commits devem ser em **português** para facilitar leitura
- Sempre teste com `npm run inspector` antes do release
- Releases automáticos mantêm histórico limpo
- CHANGELOG.md é gerado automaticamente

---

**Dúvidas?** Abra uma [Issue](https://github.com/AbacatePay/abacatepay-mcp/issues) 🙋‍♂️ 