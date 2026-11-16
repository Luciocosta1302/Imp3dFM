"use client";

import { useState } from "react";
import type { Produto } from "@/lib/catalogo";
import { CartaoProduto } from "./CartaoProduto";

export function Catalogo({ produtos, categorias }: { produtos: Produto[]; categorias: string[] }) {
  const [ativa, setAtiva] = useState<string | null>(null);
  const visiveis = ativa ? produtos.filter((p) => p.categoria === ativa) : produtos;

  return (
    <>
      <div className="filtros" role="group" aria-label="Filtrar por categoria">
        {[null, ...categorias].map((c) => (
          <button
            key={c ?? "todas"}
            type="button"
            className="filtro"
            aria-pressed={ativa === c}
            onClick={() => setAtiva(c)}
          >
            {c ?? "Todas"}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {visiveis.length} {visiveis.length === 1 ? "peça" : "peças"}
      </p>
      <div className="grade">
        {visiveis.map((p) => (
          <CartaoProduto key={p.slug} produto={p} />
        ))}
      </div>
    </>
  );
}
