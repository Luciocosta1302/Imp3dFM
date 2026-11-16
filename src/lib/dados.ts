import { produtos } from "@/data/produtos";
import { carregarCatalogo } from "@/lib/catalogo";

/** Catálogo já validado. Usado por todas as páginas. */
export const catalogo = carregarCatalogo(produtos);
