import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

export const apiKey = argv.key || process.env.ABACATE_PAY_API_KEY;

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

export const ABACATE_PAY_API_BASE = "https://api.abacatepay.com/v1";
export const USER_AGENT = "abacate-pay-mcp/1.0"; 