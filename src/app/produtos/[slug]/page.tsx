import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalogo } from "@/lib/dados";
import { formatarPreco } from "@/lib/catalogo";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { mensagemProduto } from "@/lib/whatsapp";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return catalogo.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = catalogo.find((x) => x.slug === slug);
  return p ? { title: p.nome, description: p.descricao } : {};
}

export default async function PaginaProduto({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const produto = catalogo.find((p) => p.slug === slug);
  if (!produto) notFound();

  const preco = formatarPreco(produto.precoCentavos);
  const [principal, ...outras] = produto.fotos;

  return (
    <div className="container produto">
      <nav aria-label="Navegação estrutural" className="trilha">
        <Link href="/#catalogo">Catálogo</Link> <span aria-hidden="true">/</span> {produto.nome}
      </nav>

      <div className="produto-grade">
        <div className="produto-fotos">
          <img src={principal.src} alt={principal.alt} width={600} height={600} />
          {outras.length > 0 && (
            <div className="produto-miniaturas">
              {outras.map((f) => (
                <img key={f.src} src={f.src} alt={f.alt} width={600} height={600} loading="lazy" />
              ))}
            </div>
          )}
        </div>

        <div className="produto-info">
          <p className="cartao-categoria">{produto.categoria}</p>
          <h1>{produto.nome}</h1>
          <p className="produto-preco">{preco}</p>
          {!produto.disponivel && (
            <p className="aviso">Indisponível no momento. Pergunte pelo WhatsApp quando volta.</p>
          )}
          <p>{produto.descricao}</p>

          <dl className="ficha">
            <dt>Material</dt>
            <dd>{produto.material}</dd>
            <dt>Dimensões</dt>
            <dd>{produto.dimensoes}</dd>
            <dt>Cores</dt>
            <dd>{produto.cores.join(", ")}</dd>
            <dt>Referência</dt>
            <dd>{produto.slug}</dd>
          </dl>

          <BotaoWhatsApp mensagem={mensagemProduto(produto.nome, produto.slug, preco)}>
            {produto.disponivel ? "Quero esta peça" : "Perguntar disponibilidade"}
          </BotaoWhatsApp>
          <p className="nota">Cor, prazo e frete são confirmados na conversa.</p>
        </div>
      </div>
    </div>
  );
}
