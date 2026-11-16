/**
 * Dados da loja. Edite este arquivo para trocar nome, contato e textos.
 *
 * ATENÇÃO: os valores abaixo são de DEMONSTRAÇÃO. Enquanto `demonstracao`
 * for `true`, o site mostra uma faixa avisando que o conteúdo é fictício.
 */
export const loja = {
  /** Mostra a faixa "conteúdo de demonstração". Mude para false ao publicar. */
  demonstracao: true,

  nome: "Loja 3D",
  slogan: "Peças impressas em 3D, feitas sob medida para você",
  descricao:
    "Catálogo de peças impressas em 3D. Escolha uma peça e fale direto pelo WhatsApp para combinar cor, prazo e entrega.",

  /**
   * WhatsApp com código do país e DDD, só números. Ex.: "5511987654321".
   * Vazio = botões de WhatsApp aparecem desativados.
   */
  whatsapp: "",

  cidade: "Sua cidade · UF",
  entrega: "Retirada combinada ou envio pelos Correios. Frete calculado à parte.",

  /** Instagram sem @ (opcional). */
  instagram: "",
} as const;

export type Loja = typeof loja;
