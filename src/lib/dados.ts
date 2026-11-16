import { categorias, produtos } from "@/data/produtos";
import { carregarCatalogo } from "@/lib/catalogo";

/** Catálogo já validado. Usado por todas as páginas. */
export const catalogo = carregarCatalogo(categorias, produtos);

export function categoriaPorSlug(slug: string) {
  return catalogo.categorias.find((c) => c.slug === slug);
}

export function produtosDaCategoria(slug: string) {
  return catalogo.produtos.filter((p) => p.categoria === slug);
}
