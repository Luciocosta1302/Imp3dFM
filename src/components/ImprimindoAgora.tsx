"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type PecaVitrine = { slug: string; nome: string; preco: string; foto: string; alt: string };

const TEMPO_POR_PECA = 6500;

/**
 * Cartão do banner que "imprime" uma peça do catálogo camada por camada
 * e troca de peça sozinho. Pausa fora da tela, com a aba oculta, com o mouse
 * ou o foco em cima, e não anima para quem pediu movimento reduzido.
 */
export function ImprimindoAgora({ pecas }: { pecas: PecaVitrine[] }) {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [parado, setParado] = useState(false); // fora da tela, aba oculta ou movimento reduzido
  const [emCima, setEmCima] = useState(false);
  const [ativo, setAtivo] = useState(false); // só começa a "imprimir" quando aparece na tela
  const raiz = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visivel = true;
    const atualizar = () => setParado(reduzir.matches || document.hidden || !visivel);
    const obs = new IntersectionObserver(([e]) => {
      visivel = e.isIntersecting;
      if (visivel) setAtivo(true);
      atualizar();
    }, { threshold: 0.6 });
    if (raiz.current) obs.observe(raiz.current);
    document.addEventListener("visibilitychange", atualizar);
    reduzir.addEventListener("change", atualizar);
    atualizar();
    return () => {
      obs.disconnect();
      document.removeEventListener("visibilitychange", atualizar);
      reduzir.removeEventListener("change", atualizar);
    };
  }, []);

  const rodando = ativo && pecas.length > 1 && !pausado && !parado && !emCima;
  useEffect(() => {
    if (!rodando) return;
    const t = window.setTimeout(() => setAtual((i) => (i + 1) % pecas.length), TEMPO_POR_PECA);
    return () => window.clearTimeout(t);
  }, [rodando, atual, pecas.length]);

  if (pecas.length === 0) return null;
  const peca = pecas[atual];

  return (
    <section
      ref={raiz}
      className={`imprimindo${ativo ? " ativo" : ""}`}
      aria-label="Peças em destaque"
      onMouseEnter={() => setEmCima(true)}
      onMouseLeave={() => setEmCima(false)}
      onFocus={() => setEmCima(true)}
      onBlur={() => setEmCima(false)}
    >
      <div className="imprimindo-status" aria-hidden="true">
        <span className="imprimindo-luz" />
        <span className="imprimindo-txt" key={`s-${atual}`}>
          <span className="txt-imprimindo">Imprimindo…</span>
          <span className="txt-pronta">Pronta para você</span>
        </span>
      </div>

      <Link href={`/produtos/${peca.slug}/`} className="imprimindo-link">
        <span className="imprimindo-mesa" key={`m-${atual}`}>
          <img src={peca.foto} alt={peca.alt} width={800} height={800} className="imprimindo-peca" />
          <span className="imprimindo-camadas" aria-hidden="true" />
          <span className="imprimindo-trilho" aria-hidden="true"><span className="imprimindo-bico" /></span>
        </span>
        <span className="imprimindo-rotulo" key={`r-${atual}`}>
          <span className="imprimindo-nome">{peca.nome}</span>
          <span className="imprimindo-preco">{peca.preco}</span>
        </span>
      </Link>

      {pecas.length > 1 && (
        <div className="imprimindo-controles">
          <div className="imprimindo-pontos">
            {pecas.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                className="imprimindo-ponto"
                aria-label={`Mostrar ${p.nome}`}
                aria-pressed={i === atual}
                onClick={() => setAtual(i)}
              />
            ))}
          </div>
          <button type="button" className="imprimindo-pausa" onClick={() => setPausado((v) => !v)}>
            {pausado ? "Continuar" : "Pausar"}
          </button>
        </div>
      )}
    </section>
  );
}
