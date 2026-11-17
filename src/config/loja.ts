/**
 * Dados da loja. Edite este arquivo para trocar nome, contato e textos.
 *
 * Enquanto `demonstracao` for `true`, o site mostra uma faixa avisando
 * que preços e WhatsApp ainda são de demonstração.
 */
export const loja = {
  /** Mostra a faixa "site em demonstração". Mude para false ao publicar. */
  demonstracao: true,

  nome: "Galaxy 3D",
  /** Frase curta embaixo do nome, no logo. */
  assinatura: "Ideias que ganham forma",
  logo: "/img/logo-galaxy3d.webp",
  titulo: "Ideias que ganham forma",
  descricao:
    "Impressão 3D em Marabá: peças funcionais, decoração e presentes criativos. Escolha no catálogo e combine cor e entrega pelo WhatsApp.",

  /**
   * WhatsApp com código do país e DDD, só números. Ex.: "5594987654321".
   * Vazio = botões de WhatsApp aparecem desativados.
   */
  whatsapp: "",

  /** Cidade e UF. Vazio = não aparece no site. */
  cidade: "Marabá · PA",
  entrega: "Retirada combinada em Marabá ou envio pelos Correios. Frete calculado à parte.",
  materiais: "PLA e PETG",

  /** Instagram sem @ (opcional). */
  instagram: "galaxy3d.mab",
} as const;
