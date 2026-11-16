export type Foto = { src: string; alt: string };

export type Categoria = {
  slug: string;
  nome: string;
  descricao: string;
  imagem: string;
};

export type Produto = {
  /** Identificador na URL: só letras minúsculas, números e hífen. */
  slug: string;
  nome: string;
  /** Slug de uma categoria existente. */
  categoria: string;
  /** Preço em centavos inteiros, ou null para "Sob consulta". */
  precoCentavos: number | null;
  descricao: string;
  material: string;
  dimensoes: string;
  cores: string[];
  disponivel: boolean;
  /** Aparece em "Mais procurados" na página inicial. */
  destaque: boolean;
  fotos: Foto[];
};

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PASTA_IMAGENS = "/img/";

/** Lista os problemas do catálogo. Vazio = catálogo válido. */
export function validarCatalogo(categorias: Categoria[], produtos: Produto[]): string[] {
  const erros: string[] = [];
  const slugsCategorias = new Set<string>();

  for (const c of categorias) {
    const id = `categoria ${c.slug || c.nome}`;
    if (!SLUG.test(c.slug)) erros.push(`${id}: slug inválido`);
    if (slugsCategorias.has(c.slug)) erros.push(`${id}: slug repetido`);
    slugsCategorias.add(c.slug);
    if (!c.nome.trim()) erros.push(`${id}: nome vazio`);
    if (!c.imagem.startsWith(PASTA_IMAGENS)) erros.push(`${id}: imagem fora de ${PASTA_IMAGENS}`);
  }

  const vistos = new Set<string>();
  for (const p of produtos) {
    const id = p.slug || p.nome || "(sem nome)";
    if (!SLUG.test(p.slug)) erros.push(`${id}: slug inválido`);
    if (vistos.has(p.slug)) erros.push(`${id}: slug repetido`);
    vistos.add(p.slug);
    if (!p.nome.trim()) erros.push(`${id}: nome vazio`);
    if (!slugsCategorias.has(p.categoria)) erros.push(`${id}: categoria "${p.categoria}" não existe`);
    if (
      p.precoCentavos !== null &&
      (!Number.isSafeInteger(p.precoCentavos) || p.precoCentavos <= 0)
    ) {
      erros.push(`${id}: preço deve ser inteiro positivo em centavos ou null`);
    }
    if (p.fotos.length === 0) erros.push(`${id}: precisa de pelo menos uma foto`);
    for (const f of p.fotos) {
      if (!f.src.startsWith(PASTA_IMAGENS)) erros.push(`${id}: foto fora de ${PASTA_IMAGENS}`);
      if (!f.alt.trim()) erros.push(`${id}: foto sem texto alternativo`);
    }
  }
  return erros;
}

export type Catalogo = {
  categorias: Categoria[];
  produtos: Produto[];
};

/** Retorna o catálogo validado; lança erro (e quebra o build) se houver problema. */
export function carregarCatalogo(categorias: Categoria[], produtos: Produto[]): Catalogo {
  const erros = validarCatalogo(categorias, produtos);
  if (erros.length > 0) {
    throw new Error(`Catálogo inválido:\n- ${erros.join("\n- ")}`);
  }
  return {
    categorias,
    // Disponíveis primeiro, mantendo a ordem do arquivo.
    produtos: [...produtos].sort((a, b) => Number(b.disponivel) - Number(a.disponivel)),
  };
}

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function formatarPreco(centavos: number | null): string {
  if (centavos === null) return "Sob consulta";
  // Espaço comum no lugar do não separável, para o texto da mensagem ficar limpo.
  return brl.format(centavos / 100).replace(/ /g, " ");
}

/** Minúsculas e sem acento, para a busca achar "organizacao" em "organização". */
export function normalizar(texto: string): string {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

export function buscar(produtos: Produto[], categorias: Categoria[], termo: string): Produto[] {
  const palavras = normalizar(termo).split(/\s+/).filter(Boolean);
  if (palavras.length === 0) return produtos;
  const nomeCategoria = new Map(categorias.map((c) => [c.slug, c.nome]));
  return produtos.filter((p) => {
    const texto = normalizar(
      [p.nome, p.descricao, p.material, nomeCategoria.get(p.categoria) ?? "", ...p.cores].join(" "),
    );
    return palavras.every((w) => texto.includes(w));
  });
}

/** Peças da mesma categoria primeiro, depois as outras disponíveis. */
export function relacionados(produtos: Produto[], atual: Produto, limite = 4): Produto[] {
  const outros = produtos.filter((p) => p.slug !== atual.slug && p.disponivel);
  const mesma = outros.filter((p) => p.categoria === atual.categoria);
  const resto = outros.filter((p) => p.categoria !== atual.categoria);
  return [...mesma, ...resto].slice(0, limite);
}
