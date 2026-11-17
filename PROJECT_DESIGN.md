# PROJECT_DESIGN · Galaxy 3D

Roteiro de design para dar mais vida ao catálogo. Direção confirmada: **vitrine viva**, com movimento **equilibrado**.

## 1. Contexto

- **Produto:** catálogo estático da Galaxy 3D (impressão 3D em Marabá · PA). Não tem carrinho: a compra fecha no WhatsApp.
- **Quem usa:** gente de Marabá vindo do Instagram, quase sempre pelo celular, procurando presente, decoração ou item gamer.
- **Tarefa principal:** achar uma peça de que goste e tocar em "Pedir pelo WhatsApp".
- **Sucesso:** mais peças vistas por visita, caminho claro até o WhatsApp e a sensação de uma loja de verdade, cuidada.
- **Restrições:** site estático (sem servidor), CSP sem scripts externos, nenhum pacote de animação pesado, celular em primeiro lugar.

## 2. O que já existe

- **Manter:** fundo claro, fotos como protagonistas, azul da marca `#1662d6`, marinho `#0a0f1a`, fonte Plus Jakarta Sans e grade de cartões.
- **Ponto forte:** as fotos coloridas das peças e o logo azul e escuro, com a frase "Do digital ao real".
- **Ponto fraco:** tudo é estático. Nada responde ao toque, o banner é só uma foto e, no celular, o botão do WhatsApp some ao rolar a página da peça.

## 3. Direção

- **Frase da marca:** uma lojinha local que transforma arquivos em objetos coloridos.
- **Assinatura visual:** a peça "sendo impressa", camada por camada, no banner.
- **Fica discreto:** textos, rodapé e filtros. O movimento vai para as peças e para o botão de pedir.
- **Evitar:** neon, estrelas, vidro fosco, bolhas de gradiente, contador inventado e animação que atrase a leitura.

## 4. Referências (só como material)

- **Airbnb:** cartões com sombra em camadas que sobem ao passar o mouse, e categorias em pílulas que deslizam. *Não copiar:* o vermelho e a fonte.
- **Pinterest:** foto em primeiro lugar e cantos generosos. *Não copiar:* a grade estilo Pinterest (masonry), porque a nossa é uniforme e mais fácil de comparar.

## 5. Movimento

| Elemento | Comportamento | Duração |
|---|---|---|
| **Banner: "imprimindo agora"** | Cartão claro com uma peça em destaque. A foto aparece de baixo para cima em degraus, como as camadas, com uma linha de bico subindo. Depois mostra nome e preço e troca de peça a cada ~6 s. Tocar abre a peça. | 2,4 s de impressão em 24 passos |
| **Entrada ao rolar** | Seções e cartões sobem 16 px e aparecem, em cascata de 50 ms por cartão (no máximo 6). | 500 ms, `cubic-bezier(.2,.7,.2,1)` |
| **Cartão de peça** | Ao passar o mouse, sobe 4 px, ganha sombra em 3 camadas, a foto aumenta 4% e a seta do botão desliza. Ao tocar, encolhe para 0,98. | 200 ms |
| **Categoria** | Sobe ao passar o mouse e a foto gira levemente (-2°) e aumenta. | 250 ms |
| **Cabeçalho** | Ganha sombra ao rolar. O menu do celular abre deslizando. | 200 ms |
| **Filtro do catálogo** | Ao trocar categoria ou busca, os cartões entram de novo em cascata. | 400 ms |
| **Página da peça (celular)** | Barra fixa embaixo com preço e "Pedir pelo WhatsApp", que aparece quando o botão principal sai da tela. | 250 ms |
| **Compartilhar peça** | Botão que abre o compartilhamento do celular ou copia o link, com aviso "Link copiado". | aviso de 2 s |
| **Botões** | Ao tocar, encolhem para 0,97. | 120 ms |

**Regras:**
- **Movimento reduzido:** quem configura o celular para reduzir movimento vê tudo pronto, sem animação e sem troca automática no banner.
- **Sem JavaScript:** o conteúdo nunca fica escondido. A animação de entrada só liga quando o JavaScript carrega, pela classe `js` no `<html>`.
- **Desempenho:** só `transform`, `opacity` e `clip-path`. Nada mexe no layout. O banner pausa quando sai da tela ou a aba fica oculta.
- **Toque:** áreas de toque continuam com pelo menos 44 px.

## 6. Arquivos

- **Novos:** `components/ImprimindoAgora.tsx` (banner), `components/Revelar.tsx` (entrada ao rolar), `components/BarraPedido.tsx` (barra fixa), `components/Compartilhar.tsx`.
- **Mudam:** `app/layout.tsx` (classe `js`, observador), `app/page.tsx`, `app/produtos/[slug]/page.tsx`, `components/BuscaCatalogo.tsx`, `components/Cabecalho.tsx` e `app/globals.css` (tokens de movimento e sombras).

## 7. Como verificar

- `npm run check`.
- Prints em 320, 390, 768 e 1280 px, sem rolagem lateral.
- Teste no navegador:
  - o banner troca de peça e o toque leva à peça;
  - os cartões aparecem ao rolar;
  - a barra fixa aparece e some no celular;
  - compartilhar copia o link.
- Com movimento reduzido ligado, nada fica escondido ou animado.
- Comparar com a versão atual: o site deve ficar mais vivo **e** levar ao WhatsApp com a mesma clareza.
