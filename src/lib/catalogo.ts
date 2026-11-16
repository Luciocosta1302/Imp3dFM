export type Foto = { src: string; alt: string };

export type Produto = {
  /** Identificador na URL: só letras minúsculas, números e hífen. */
  slug: string;
  nome: string;
  categoria: string;
  /** Preço em centavos inteiros, ou null para "sob consulta". */
  precoCentavos: number | null;
  descricao: string;
  material: string;
  dimensoes: string;
  cores: string[];
  disponivel: boolean;
  fotos: Foto[];
};

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Lista os problemas do catálogo. Vazio = catálogo válido. */
export function validarCatalogo(produtos: Produto[]): string[] {
  const erros: string[] = [];
  const vistos = new Set<string>();

  for (const p of produtos) {
    const id = p.slug || p.nome || "(sem nome)";
    if (!SLUG.test(p.slug)) erros.push(`${id}: slug inválido`);
    if (vistos.has(p.slug)) erros.push(`${id}: slug repetido`);
    vistos.add(p.slug);
    if (!p.nome.trim()) erros.push(`${id}: nome vazio`);
    if (!p.categoria.trim()) erros.push(`${id}: categoria vazia`);
    if (
      p.precoCentavos !== null &&
      (!Number.isSafeInteger(p.precoCentavos) || p.precoCentavos <= 0)
    ) {
      erros.push(`${id}: preço deve ser inteiro positivo em centavos ou null`);
    }
    if (p.fotos.length === 0) erros.push(`${id}: precisa de pelo menos uma foto`);
    for (const f of p.fotos) {
      if (!f.src.startsWith("/produtos/")) erros.push(`${id}: foto fora de /produtos/`);
      if (!f.alt.trim()) erros.push(`${id}: foto sem texto alternativo`);
    }
  }
  return erros;
}

/** Retorna o catálogo validado; lança erro (e quebra o build) se houver problema. */
export function carregarCatalogo(produtos: Produto[]): Produto[] {
  const erros = validarCatalogo(produtos);
  if (erros.length > 0) {
    throw new Error(`Catálogo inválido:\n- ${erros.join("\n- ")}`);
  }
  // Disponíveis primeiro, mantendo a ordem do arquivo.
  return [...produtos].sort((a, b) => Number(b.disponivel) - Number(a.disponivel));
}

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function formatarPreco(centavos: number | null): string {
  if (centavos === null) return "Sob consulta";
  return brl.format(centavos / 100);
}

export function categorias(produtos: Produto[]): string[] {
  return [...new Set(produtos.map((p) => p.categoria))].sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );
}
