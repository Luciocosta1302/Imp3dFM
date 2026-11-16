import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { loja } from "@/config/loja";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { mensagemPersonalizada } from "@/lib/whatsapp";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: loja.nome, template: `%s · ${loja.nome}` },
  description: loja.descricao,
  robots: loja.demonstracao ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#171513" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ano = new Date().getFullYear();
  return (
    <html lang="pt-BR">
      <body>
        <a href="#conteudo" className="pular">Pular para o conteúdo</a>
        {loja.demonstracao && (
          <div className="faixa-demo" role="note">
            Conteúdo de demonstração: peças, preços e fotos são fictícios.
          </div>
        )}
        <header className="topo">
          <div className="container topo-interno">
            <Link href="/" className="marca">
              <span className="marca-icone" aria-hidden="true">◆</span>
              {loja.nome}
            </Link>
            <nav aria-label="Principal" className="nav">
              <Link href="/#catalogo">Catálogo</Link>
              <Link href="/#como-encomendar">Como encomendar</Link>
            </nav>
          </div>
        </header>

        <main id="conteudo">{children}</main>

        <footer className="rodape">
          <div className="container rodape-interno">
            <div>
              <p className="marca">{loja.nome}</p>
              <p>{loja.cidade}</p>
              <p>{loja.entrega}</p>
              {loja.instagram && (
                <p>
                  <a href={`https://instagram.com/${loja.instagram}`} target="_blank" rel="noopener noreferrer">
                    @{loja.instagram}
                  </a>
                </p>
              )}
            </div>
            <div>
              <BotaoWhatsApp mensagem={mensagemPersonalizada()} variante="secundario">
                Falar no WhatsApp
              </BotaoWhatsApp>
            </div>
          </div>
          <p className="container rodape-copy">© {ano} {loja.nome}</p>
        </footer>
      </body>
    </html>
  );
}
