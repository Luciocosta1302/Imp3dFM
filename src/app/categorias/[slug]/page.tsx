import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalogo, categoriaPorSlug, produtosDaCategoria } from "@/lib/dados";
import { GradeProdutos } from "@/components/GradeProdutos";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { mensagemPersonalizada } from "@/lib/whatsapp";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return catalogo.categorias.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const c = categoriaPorSlug((await params).slug);
  return c ? { title: c.nome, description: c.descricao } : {};
}

export default async function PaginaCategoria({ params }: { params: Promise<Params> }) {
  const categoria = categoriaPorSlug((await params).slug);
  if (!categoria) notFound();
  const produtos = produtosDaCategoria(categoria.slug);
  const outras = catalogo.categorias.filter((c) => c.slug !== categoria.slug);

  return (
    <div className="container pagina">
      <nav aria-label="Você está em" className="trilha">
        <Link href="/">Início</Link>
        <span aria-hidden="true">/</span>
        <Link href="/catalogo/">Catálogo</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{categoria.nome}</span>
      </nav>
      <header className="pagina-topo">
        <h1>{categoria.nome}</h1>
        <p>{categoria.descricao}</p>
      </header>

      {produtos.length > 0 ? (
        <GradeProdutos produtos={produtos} />
      ) : (
        <div className="vazio">
          <p>Ainda não tem peças cadastradas aqui, mas dá para encomendar.</p>
          <BotaoWhatsApp mensagem={mensagemPersonalizada()}>Falar no WhatsApp</BotaoWhatsApp>
        </div>
      )}

      <section className="outras-categorias" aria-labelledby="t-outras">
        <h2 id="t-outras">Outras categorias</h2>
        <ul className="pilulas">
          {outras.map((c) => (
            <li key={c.slug}><Link href={`/categorias/${c.slug}/`} className="filtro">{c.nome}</Link></li>
          ))}
        </ul>
      </section>
    </div>
  );
}
