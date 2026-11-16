/**
 * Monta o link wa.me. Retorna null se o número não estiver configurado
 * ou for inválido, para a interface desativar o botão.
 */
export function linkWhatsApp(numero: string, mensagem: string): string | null {
  const digitos = numero.replace(/\D/g, "");
  // Código do país + DDD + número: entre 12 e 15 dígitos.
  if (digitos.length < 12 || digitos.length > 15) return null;
  return `https://wa.me/${digitos}?text=${encodeURIComponent(mensagem)}`;
}

export function mensagemProduto(nome: string, slug: string, preco: string): string {
  return `Olá! Tenho interesse na peça "${nome}" (ref. ${slug}, ${preco}). Pode me passar cores e prazo?`;
}

export function mensagemPersonalizada(): string {
  return "Olá! Quero orçar uma peça personalizada. Vou mandar foto, medidas ou o arquivo.";
}

export function mensagemDataComemorativa(): string {
  return "Olá! Quero encomendar peças para uma data comemorativa. Qual o prazo?";
}
