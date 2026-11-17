"use client";

import { useEffect, useState } from "react";
import { Icone } from "./Icone";

export function Compartilhar({ titulo }: { titulo: string }) {
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    if (!aviso) return;
    const t = window.setTimeout(() => setAviso(""), 2200);
    return () => window.clearTimeout(t);
  }, [aviso]);

  async function compartilhar() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: titulo, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setAviso("Link copiado");
    } catch (e) {
      // Cancelar o compartilhamento não é erro.
      if ((e as DOMException)?.name !== "AbortError") setAviso("Não deu para copiar o link");
    }
  }

  return (
    <>
      <button type="button" className="botao botao-contorno botao-pequeno" onClick={compartilhar}>
        <Icone nome="compartilhar" tamanho={18} /> Compartilhar
      </button>
      <p className={`aviso-flutuante${aviso ? " aviso-flutuante-visivel" : ""}`} role="status" aria-live="polite">
        {aviso}
      </p>
    </>
  );
}
