import type { Metadata } from "next";
import { Suspense } from "react";
import { catalogo } from "@/lib/dados";
import { BuscaCatalogo } from "@/components/BuscaCatalogo";
import { GradeProdutos } from "@/components/GradeProdutos";

export const metadata: Metadata = { title: "Catálogo" };

export default function PaginaCatalogo() {
  return (
    <div className="container pagina">
      <header className="pagina-topo">
        <h1>Catálogo</h1>
        <p>Todas as peças podem ser feitas em outras cores. Pergunte pelo WhatsApp.</p>
      </header>
      <Suspense fallback={<GradeProdutos produtos={catalogo.produtos} />}>
        <BuscaCatalogo produtos={catalogo.produtos} categorias={catalogo.categorias} />
      </Suspense>
    </div>
  );
}
