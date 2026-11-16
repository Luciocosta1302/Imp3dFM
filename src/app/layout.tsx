import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "@fontsource-variable/plus-jakarta-sans";
import { loja } from "@/config/loja";
import { catalogo } from "@/lib/dados";
import { Cabecalho } from "@/components/Cabecalho";
import { Logo } from "@/components/Logo";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { mensagemPersonalizada } from "@/lib/whatsapp";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: `${loja.nome} · ${loja.assinatura}`, template: `%s · ${loja.nome}` },
  description: loja.descricao,
  robots: loja.demonstracao ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = { themeColor: "#0d1424" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ano = new Date().getFullYear();
  return (
    <html lang="pt-BR">
      <body>
        <a href="#conteudo" className="pular">Pular para o conteúdo</a>

        <div className="faixa-topo">
          <div className="container faixa-topo-linha">
            <span>Peças impressas sob encomenda</span>
            <span className="faixa-topo-extra">Cores e tamanhos à escolha</span>
            <span className="faixa-topo-extra">{loja.cidade ? `Atendemos ${loja.cidade}` : "Retirada ou envio"}</span>
          </div>
        </div>
        {loja.demonstracao && (
          <p className="faixa-demo" role="note">
            Site em demonstração: preços fictícios e WhatsApp ainda não configurado.
          </p>
        )}

        <Cabecalho />

        <main id="conteudo">{children}</main>

        <footer className="rodape">
          <div className="container rodape-grade">
            <div className="rodape-marca">
              <Logo claro />
              <p>{loja.descricao}</p>
              {loja.instagram && (
                <a href={`https://instagram.com/${loja.instagram}`} target="_blank" rel="noopener noreferrer">
                  Instagram @{loja.instagram}
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
                <li><Link href="/#personalizados">Peças personalizadas</Link></li>
              </ul>
            </nav>
            <div>
              <h2>Atendimento</h2>
              <p>{loja.entrega}</p>
              {loja.cidade && <p>{loja.cidade}</p>}
              <BotaoWhatsApp mensagem={mensagemPersonalizada()} className="botao-pequeno">
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
