import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalogo, categoriaPorSlug } from "@/lib/dados";
import { formatarPreco, relacionados } from "@/lib/catalogo";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { GradeProdutos } from "@/components/GradeProdutos";
import { mensagemProduto } from "@/lib/whatsapp";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return catalogo.produtos.map((p) => ({ slug: p.slug }));
}

function porSlug(slug: string) {
  return catalogo.produtos.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = porSlug((await params).slug);
  return p ? { title: p.nome, description: p.descricao } : {};
}

export default async function PaginaProduto({ params }: { params: Promise<Params> }) {
  const produto = porSlug((await params).slug);
  if (!produto) notFound();

  const categoria = categoriaPorSlug(produto.categoria)!;
  const preco = formatarPreco(produto.precoCentavos);
  const [principal, ...outras] = produto.fotos;
  const sugestoes = relacionados(catalogo.produtos, produto);

  return (
    <div className="container pagina">
      <nav aria-label="Você está em" className="trilha">
        <Link href="/">Início</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/categorias/${categoria.slug}/`}>{categoria.nome}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{produto.nome}</span>
      </nav>

      <div className="produto">
        <div className="produto-fotos">
          <img src={principal.src} alt={principal.alt} width={800} height={800} fetchPriority="high" />
          {outras.length > 0 && (
            <div className="produto-miniaturas">
              {outras.map((f) => (
                <img key={f.src} src={f.src} alt={f.alt} width={800} height={800} loading="lazy" />
              ))}
            </div>
          )}
        </div>

        <div className="produto-info">
          <Link href={`/categorias/${categoria.slug}/`} className="cartao-categoria">{categoria.nome}</Link>
          <h1>{produto.nome}</h1>
          <p className="produto-preco">{preco}</p>
          {!produto.disponivel && (
            <p className="aviso" role="status">Esgotado no momento. Pergunte pelo WhatsApp quando volta.</p>
          )}
          <p className="produto-descricao">{produto.descricao}</p>

          <dl className="ficha">
            <div><dt>Material</dt><dd>{produto.material}</dd></div>
            <div><dt>Tamanho</dt><dd>{produto.dimensoes}</dd></div>
            <div><dt>Cores</dt><dd>{produto.cores.join(", ")}</dd></div>
          </dl>

          <BotaoWhatsApp mensagem={mensagemProduto(produto.nome, produto.slug, preco)} className="botao-largo">
            {produto.disponivel ? "Pedir pelo WhatsApp" : "Perguntar disponibilidade"}
          </BotaoWhatsApp>
          <p className="nota">Cor, prazo e frete são confirmados na conversa. Referência: {produto.slug}</p>
        </div>
      </div>

      {sugestoes.length > 0 && (
        <section className="secao-relacionados" aria-labelledby="t-relacionados">
          <h2 id="t-relacionados">Você também pode gostar</h2>
          <GradeProdutos produtos={sugestoes} />
        </section>
      )}
    </div>
  );
}
