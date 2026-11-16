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
  /** Frase curta embaixo do nome, no logo. */
  assinatura: "impressão 3D sob encomenda",
  titulo: "Peças impressas em 3D para presentear, decorar e organizar",
  descricao:
    "Escolha no catálogo ou mande a sua ideia. Cor, quantidade e prazo a gente combina pelo WhatsApp.",

  /**
   * WhatsApp com código do país e DDD, só números. Ex.: "5511987654321".
   * Vazio = botões de WhatsApp aparecem desativados.
   */
  whatsapp: "",

  /** Cidade e UF, ex.: "Campinas · SP". Vazio = não aparece no site. */
  cidade: "",
  entrega: "Retirada combinada ou envio pelos Correios. Frete calculado à parte.",
  materiais: "PLA e PETG",

  /** Instagram sem @ (opcional). */
  instagram: "",
} as const;
