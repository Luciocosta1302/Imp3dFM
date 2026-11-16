# CLAUDE.md

Catálogo estático de impressão 3D (Next.js 16, `output: "export"`). Sem backend, login ou banco.

- Comandos: `npm run dev`, `npm run check` (typecheck + vitest + build). Rode `npm run check` antes de cada commit.
- Dados: `src/config/loja.ts` (loja) e `src/data/produtos.ts` (peças). Preço sempre em centavos inteiros ou `null`.
- `carregarCatalogo` valida o catálogo no build; mantenha essa validação.
- Conteúdo de demonstração deve ficar identificado (`demonstracao: true`). Não inventar telefone, preço ou dados reais do Felipe.
- Não usar recursos que exigem servidor (API routes, server actions, middleware): o site é publicado como arquivos estáticos.
- Mensagens de WhatsApp não devem incluir custos internos nem URLs privadas.
- Escopo completo futuro (formulário, painel, calculadora): `PLANEJAMENTO-LOJA-IMPRESSAO-3D.md`.
