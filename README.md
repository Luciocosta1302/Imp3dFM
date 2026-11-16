# Catálogo de impressão 3D

Site estático de catálogo: vitrine de peças, página de cada peça e botão de WhatsApp.
Não tem backend, login nem banco de dados. Os produtos ficam em um arquivo do projeto.

## Comandos

```bash
npm ci            # instala as dependências pelo lockfile
npm run dev       # site em http://localhost:3000
npm run check     # TypeScript + testes + build
npm run build     # gera o site final na pasta out/
```

## Editar a loja

| O quê | Onde |
|---|---|
| Nome, slogan, WhatsApp, cidade, entrega, Instagram | `src/config/loja.ts` |
| Peças (nome, preço, descrição, fotos, disponibilidade) | `src/data/produtos.ts` |
| Fotos das peças | `public/produtos/` (JPG, PNG, WebP ou SVG; de preferência quadradas, até ~300 KB) |
| Cores e visual | `src/app/globals.css` (variáveis no topo) |

- **Preço em centavos:** R$ 39,90 = `3990`. Use `null` para "Sob consulta".
- **Esconder uma peça:** apague o bloco ou marque `disponivel: false` (continua visível com selo "Indisponível").
- **WhatsApp:** só números, com país e DDD, ex. `"5511987654321"`. Vazio = botões desativados.
- O build **falha** se o catálogo tiver erro (slug repetido, preço inválido, foto sem descrição), então dado quebrado não vai para o ar.

## Antes de publicar

1. Trocar os dados de `src/config/loja.ts` pelos reais e colocar `demonstracao: false`.
2. Trocar as peças e imagens de demonstração pelas reais (com permissão de uso das fotos).
3. `npm run check`.

## Publicar (Cloudflare Pages, gratuito com uso comercial)

- Build command: `npm run build` · Output directory: `out` · Node 22.
- O arquivo `public/_headers` aplica cabeçalhos de segurança (CSP, nosniff, anti-iframe).
- Conectar o domínio do Felipe (registrado no nome dele) nas configurações do projeto.

Também funciona em Netlify ou qualquer hospedagem de arquivos estáticos. Evite o plano Hobby da Vercel, que é só para uso não comercial.

## Evolução

O projeto já é Next.js + TypeScript. Formulário, painel e calculadora do
`PLANEJAMENTO-LOJA-IMPRESSAO-3D.md` podem ser adicionados depois, reaproveitando o visual e o catálogo.
