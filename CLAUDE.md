# CLAUDE.md

Catálogo estático de impressão 3D (Next.js 16, `output: "export"`). Sem backend, login ou banco.

- Comandos: `npm run dev`, `npm run check` (typecheck + vitest + build). Rode `npm run check` antes de cada commit.
- Dados: `src/config/loja.ts` (loja) e `src/data/produtos.ts` (categorias e peças); imagens em `public/img/`. Preço sempre em centavos inteiros ou `null`.
- `carregarCatalogo` valida o catálogo no build; mantenha essa validação.
- Conteúdo de demonstração deve ficar identificado (`demonstracao: true`). Não inventar telefone, preço ou dados reais do Felipe.
- Não usar recursos que exigem servidor (API routes, server actions, middleware): o site é publicado como arquivos estáticos.
- Mensagens de WhatsApp não devem incluir custos internos nem URLs privadas.
- Escopo completo futuro (formulário, painel, calculadora): `PLANEJAMENTO-LOJA-IMPRESSAO-3D.md`.
- CSS: `.container` só define padding lateral (`padding-inline`); nunca usar `padding: 0 X` nele, que zera o espaçamento vertical das seções.
- Antes de entregar mudança visual, conferir em 320, 390, 768 e 1280 px de largura.
- A loja NÃO faz peças personalizadas por enquanto: não anunciar orçamento sob medida, envio de ideia/foto/STL, nome ou logo nas peças.
- Design e animação seguem `PROJECT_DESIGN.md` (direção "vitrine viva", movimento equilibrado). Skill de UI instalada em `.claude/skills/tasteful-ui`.
- Animações: só `transform`, `opacity` e `clip-path`; entrada ao rolar via `data-revelar` (+ `--i` para cascata); tudo desligado em `prefers-reduced-motion`; nada pode ficar escondido sem JavaScript (esconder só sob `.js`).
