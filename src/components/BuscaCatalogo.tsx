"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { buscar, type Categoria, type Produto } from "@/lib/catalogo";
import { GradeProdutos } from "./GradeProdutos";

type Props = { produtos: Produto[]; categorias: Categoria[] };

export function BuscaCatalogo({ produtos, categorias }: Props) {
  const params = useSearchParams();
  const [termo, setTermo] = useState(params.get("q") ?? "");
  const [categoria, setCategoria] = useState(params.get("categoria") ?? "");

  // Acompanha buscas feitas pelo campo do cabeçalho (mesma página, novo ?q=).
  useEffect(() => {
    setTermo(params.get("q") ?? "");
    setCategoria(params.get("categoria") ?? "");
  }, [params]);

  // Mantém a URL atualizada para dar para compartilhar a busca.
  useEffect(() => {
    const url = new URL(window.location.href);
    termo.trim() ? url.searchParams.set("q", termo.trim()) : url.searchParams.delete("q");
    categoria ? url.searchParams.set("categoria", categoria) : url.searchParams.delete("categoria");
    if (url.href !== window.location.href) window.history.replaceState(null, "", url);
  }, [termo, categoria]);

  const daCategoria = categoria ? produtos.filter((p) => p.categoria === categoria) : produtos;
  const visiveis = buscar(daCategoria, categorias, termo);

  return (
    <>
      <div className="filtros-barra">
        <label className="filtro-busca">
          <span className="sr-only">Buscar no catálogo</span>
          <input
            type="search"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Buscar por nome, cor ou material"
            autoComplete="off"
          />
        </label>
        <div className="filtros" role="group" aria-label="Filtrar por categoria">
          {[{ slug: "", nome: "Todas" }, ...categorias].map((c) => (
            <button
              key={c.slug || "todas"}
              type="button"
              className="filtro"
              aria-pressed={categoria === c.slug}
              onClick={() => setCategoria(c.slug)}
            >
              {c.nome}
            </button>
          ))}
        </div>
      </div>

      <p className="resultado" aria-live="polite">
        {visiveis.length === 0
          ? "Nenhuma peça encontrada."
          : `${visiveis.length} ${visiveis.length === 1 ? "peça" : "peças"}`}
      </p>

      {visiveis.length > 0 ? (
        <GradeProdutos produtos={visiveis} />
      ) : (
        <div className="vazio">
          <p>Tente outra palavra ou veja todas as peças.</p>
          <button type="button" className="botao botao-contorno" onClick={() => { setTermo(""); setCategoria(""); }}>
            Limpar busca
          </button>
        </div>
      )}
    </>
  );
}
