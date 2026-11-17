import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "@fontsource-variable/plus-jakarta-sans";
import { loja } from "@/config/loja";
import { catalogo } from "@/lib/dados";
import { Cabecalho } from "@/components/Cabecalho";
import { Logo } from "@/components/Logo";
import { Icone } from "@/components/Icone";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { mensagemContato } from "@/lib/whatsapp";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${loja.nome} · Impressão 3D${loja.cidade ? ` em ${loja.cidade.split(" · ")[0]}` : ""}`,
    template: `%s · ${loja.nome}`,
  },
  description: loja.descricao,
  robots: loja.demonstracao ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = { themeColor: "#0a0f1a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ano = new Date().getFullYear();
  return (
    <html lang="pt-BR">
      <body>
        <a href="#conteudo" className="pular">Pular para o conteúdo</a>

        <div className="faixa-topo">
          <div className="container faixa-topo-linha">
            <span>Do digital ao real</span>
            <span className="faixa-topo-extra">Presentes, decoração e setup gamer</span>
            <span className="faixa-topo-extra">{loja.cidade ? `Atendemos ${loja.cidade}` : "Retirada ou envio"}</span>
          </div>
        </div>
        {loja.demonstracao && (
          <p className="faixa-demo" role="note">
            Site em construção: preços e fotos de exemplo, WhatsApp ainda não configurado.
          </p>
        )}

        <Cabecalho />

        <main id="conteudo">{children}</main>

        <footer className="rodape">
          <div className="container rodape-grade">
            <div className="rodape-marca">
              <Logo claro grande />
              <p>{loja.descricao}</p>
              {loja.instagram && (
                <a className="rodape-instagram" href={`https://instagram.com/${loja.instagram}`} target="_blank" rel="noopener noreferrer">
                  <Icone nome="instagram" tamanho={18} /> @{loja.instagram}
                </a>
              )}
            </div>
            <nav aria-label="Categorias">
              <h2>Categorias</h2>
              <ul>
                {catalogo.categorias.map((c) => (
                  <li key={c.slug}><Link href={`/categorias/${c.slug}/`}>{c.nome}</Link></li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Loja">
              <h2>Loja</h2>
              <ul>
                <li><Link href="/catalogo/">Catálogo completo</Link></li>
                <li><Link href="/#como-encomendar">Como encomendar</Link></li>
              </ul>
            </nav>
            <div>
              <h2>Atendimento</h2>
              <p>{loja.entrega}</p>
              {loja.cidade && <p>{loja.cidade}</p>}
              <BotaoWhatsApp mensagem={mensagemContato()} className="botao-pequeno">
                Falar no WhatsApp
              </BotaoWhatsApp>
            </div>
          </div>
          <div className="container rodape-base">
            <span>© {ano} {loja.nome}</span>
            <span>Fotos meramente ilustrativas; cores podem variar.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
