"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Logo } from "./Logo";
import { Icone } from "./Icone";

const links = [
  { href: "/", rotulo: "Início" },
  { href: "/catalogo/", rotulo: "Catálogo" },
  { href: "/#categorias", rotulo: "Categorias" },
  { href: "/#como-encomendar", rotulo: "Como encomendar" },
];

export function Cabecalho() {
  const [aberto, setAberto] = useState(false);
  const caminho = usePathname();
  const idMenu = useId();

  // Fecha o menu ao trocar de página.
  useEffect(() => setAberto(false), [caminho]);

  return (
    <header className="cabecalho">
      <div className="container cabecalho-linha">
        <Logo />

        <nav aria-label="Principal" id={idMenu} className={`nav${aberto ? " nav-aberta" : ""}`}>
          {links.map((l) => {
            const atual = l.href === "/" ? caminho === "/" : caminho.startsWith(l.href) && !l.href.includes("#");
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={atual ? "page" : undefined}
                onClick={() => setAberto(false)}
              >
                {l.rotulo}
              </Link>
            );
          })}
        </nav>

        <form className="busca" action="/catalogo/" role="search">
          <label htmlFor="busca-topo" className="sr-only">Buscar peças</label>
          <Icone nome="busca" tamanho={18} />
          <input id="busca-topo" name="q" type="search" placeholder="Buscar peças" autoComplete="off" />
        </form>

        <button
          type="button"
          className="botao-menu"
          aria-expanded={aberto}
          aria-controls={idMenu}
          onClick={() => setAberto((v) => !v)}
        >
          <Icone nome={aberto ? "fechar" : "menu"} tamanho={22} />
          <span className="sr-only">{aberto ? "Fechar menu" : "Abrir menu"}</span>
        </button>
      </div>
    </header>
  );
}
