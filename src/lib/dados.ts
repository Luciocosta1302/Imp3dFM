import { categorias, pecasBanner, produtos } from "@/data/produtos";
import { carregarCatalogo } from "@/lib/catalogo";

/** Catálogo já validado. Usado por todas as páginas. */
export const catalogo = carregarCatalogo(categorias, produtos);

/** Peças do banner, na ordem escolhida; ignora slugs que não existem ou estão esgotados. */
export const vitrine = pecasBanner
  .map((slug) => catalogo.produtos.find((p) => p.slug === slug && p.disponivel))
  .filter((p) => p !== undefined);

export function categoriaPorSlug(slug: string) {
  return catalogo.categorias.find((c) => c.slug === slug);
}

export function produtosDaCategoria(slug: string) {
  return catalogo.produtos.filter((p) => p.categoria === slug);
}
