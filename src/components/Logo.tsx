import Link from "next/link";
import { loja } from "@/config/loja";

export function Logo({ claro = false, grande = false }: { claro?: boolean; grande?: boolean }) {
  const tamanho = grande ? 72 : 44;
  return (
    <Link href="/" className={`logo${claro ? " logo-claro" : ""}`} aria-label={`${loja.nome}, página inicial`}>
      <img src={loja.logo} alt="" width={tamanho} height={tamanho} className="logo-marca" />
      <span className="logo-texto">
        <span className="logo-nome">{loja.nome}</span>
        <span className="logo-assinatura">{loja.assinatura}</span>
      </span>
    </Link>
  );
}
