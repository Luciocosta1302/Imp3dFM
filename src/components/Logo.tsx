import Link from "next/link";
import { loja } from "@/config/loja";

export function Logo({ claro = false }: { claro?: boolean }) {
  return (
    <Link href="/" className={`logo${claro ? " logo-claro" : ""}`} aria-label={`${loja.nome}, página inicial`}>
      <svg aria-hidden="true" viewBox="0 0 32 32" width="30" height="30" className="logo-marca">
        <path d="M16 3 28 10v12l-12 7-12-7V10z" fill="currentColor" />
        <path d="M16 3 28 10 16 17 4 10z" fill="#fff" fillOpacity=".28" />
        <path d="M16 17v12" stroke="#fff" strokeOpacity=".35" strokeWidth="1.2" />
      </svg>
      <span className="logo-texto">
        <span className="logo-nome">{loja.nome}</span>
        <span className="logo-assinatura">{loja.assinatura}</span>
      </span>
    </Link>
  );
}
