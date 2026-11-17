"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Logo } from "./Logo";
import { Icone } from "./Icone";
import { loja } from "@/config/loja";

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
  const [rolado, setRolado] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolado(window.scrollY > 8);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Fecha o menu ao trocar de página.
  useEffect(() => setAberto(false), [caminho]);

  return (
    <header className={`cabecalho${rolado ? " cabecalho-rolado" : ""}`}>
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

        {loja.instagram && (
          <a
            className="link-instagram"
            href={`https://instagram.com/${loja.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram @${loja.instagram}`}
          >
            <Icone nome="instagram" tamanho={22} />
          </a>
        )}

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
