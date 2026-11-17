import Link from "next/link";
import { loja } from "@/config/loja";
import { catalogo, vitrine } from "@/lib/dados";
import { formatarPreco } from "@/lib/catalogo";
import { ImprimindoAgora } from "@/components/ImprimindoAgora";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { GradeProdutos } from "@/components/GradeProdutos";
import { Vantagens } from "@/components/Vantagens";
import { Icone } from "@/components/Icone";
import { mensagemContato } from "@/lib/whatsapp";

export default function Inicio() {
  const maisProcurados = catalogo.produtos.filter((p) => p.destaque && p.disponivel).slice(0, 6);
  const qtd = (slug: string) => catalogo.produtos.filter((p) => p.categoria === slug).length;

  return (
    <>
      <section className="hero">
        <img className="hero-imagem" src="/img/banner-impressora.webp" alt="" width={1600} height={900} fetchPriority="high" />
        <div className="container hero-grade">
        <div className="hero-conteudo">
          <p className="sobretitulo">{loja.nome}{loja.cidade ? ` · Impressão 3D em ${loja.cidade.split(" · ")[0]}` : ""}</p>
          <h1>{loja.titulo}</h1>
          <p className="hero-texto">{loja.descricao}</p>
          <div className="hero-acoes">
            <Link href="/catalogo/" className="botao botao-claro">
              Ver catálogo <Icone nome="seta" tamanho={18} />
            </Link>
            <BotaoWhatsApp mensagem={mensagemContato()} variante="whatsapp">
              Falar no WhatsApp
            </BotaoWhatsApp>
          </div>
        </div>
        <ImprimindoAgora
          pecas={vitrine.map((p) => ({
            slug: p.slug,
            nome: p.nome,
            preco: formatarPreco(p.precoCentavos),
            foto: p.fotos[0].src,
            alt: p.fotos[0].alt,
          }))}
        />
        </div>
      </section>

      <section id="categorias" className="secao container" aria-labelledby="t-categorias">
        <div className="secao-topo" data-revelar>
          <h2 id="t-categorias">Categorias</h2>
          <Link href="/catalogo/" className="link-seta">Ver tudo <Icone nome="seta" tamanho={16} /></Link>
        </div>
        <ul className="categorias">
          {catalogo.categorias.map((c, i) => (
            <li key={c.slug} data-revelar style={{ "--i": i } as React.CSSProperties}>
              <Link href={`/categorias/${c.slug}/`} className="categoria">
                <span className="categoria-foto">
                  <img src={c.imagem} alt="" width={800} height={800} loading="lazy" />
                </span>
                <span className="categoria-nome">{c.nome}</span>
                <span className="categoria-qtd">{qtd(c.slug)} {qtd(c.slug) === 1 ? "peça" : "peças"}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="container colecoes" aria-label="Coleções">
        <Link href="/categorias/natal/" className="colecao colecao-natal" data-revelar>
          <img src="/img/colecao-natal.webp" alt="" width={1200} height={900} loading="lazy" />
          <span className="colecao-texto">
            <span className="sobretitulo">Coleção</span>
            <span className="colecao-titulo">Natal</span>
            <span>Árvores, bolas e casinhas para a decoração de fim de ano.</span>
            <span className="botao botao-claro botao-pequeno">Ver coleção <Icone nome="seta" tamanho={16} /></span>
          </span>
        </Link>
        <Link href="/categorias/mesa-e-organizacao/" className="colecao colecao-mesa" data-revelar style={{ "--i": 1 } as React.CSSProperties}>
          <img src="/img/colecao-mesa.webp" alt="" width={1200} height={900} loading="lazy" />
          <span className="colecao-texto">
            <span className="sobretitulo">Para o dia a dia</span>
            <span className="colecao-titulo">Mesa, celular e chaveiros</span>
            <span>Suportes, organizadores e lembrancinhas.</span>
            <span className="botao botao-escuro botao-pequeno">Ver peças <Icone nome="seta" tamanho={16} /></span>
          </span>
        </Link>
      </section>

      <section className="secao container" aria-labelledby="t-procurados">
        <div className="secao-topo" data-revelar>
          <h2 id="t-procurados">Mais procurados</h2>
          <Link href="/catalogo/" className="link-seta">Ver catálogo <Icone nome="seta" tamanho={16} /></Link>
        </div>
        <GradeProdutos produtos={maisProcurados} />
      </section>

      <section className="container faixas" aria-label="Novidades e atendimento">
        <div className="faixa-promo faixa-datas" data-revelar>
          <Icone nome="calendario" tamanho={28} />
          <div>
            <h2>Datas comemorativas</h2>
            <p>Coleções de Páscoa, Dia das Mães, Dia dos Pais e Dia das Crianças. As novidades saem primeiro no Instagram.</p>
          </div>
          {loja.instagram && (
            <a className="botao botao-claro botao-pequeno" href={`https://instagram.com/${loja.instagram}`} target="_blank" rel="noopener noreferrer">
              <Icone nome="instagram" tamanho={18} /> Seguir
            </a>
          )}
        </div>
        <div className="faixa-promo faixa-duvidas" data-revelar style={{ "--i": 1 } as React.CSSProperties}>
          <Icone nome="conversa" tamanho={28} />
          <div>
            <h2>Ficou com dúvida sobre uma peça?</h2>
            <p>Pergunte sobre cores, prazo ou entrega. A gente responde pelo WhatsApp.</p>
          </div>
          <BotaoWhatsApp mensagem={mensagemContato()} variante="claro" className="botao-pequeno">
            Perguntar
          </BotaoWhatsApp>
        </div>
      </section>

      <Vantagens />

      <section id="como-encomendar" className="secao container" aria-labelledby="t-como">
        <h2 id="t-como" data-revelar>Como encomendar</h2>
        <ol className="passos">
          <li data-revelar style={{ "--i": 0 } as React.CSSProperties}>
            <h3>Escolha a peça</h3>
            <p>Navegue pelo catálogo ou pelas categorias e abra a peça que você gostou.</p>
          </li>
          <li data-revelar style={{ "--i": 1 } as React.CSSProperties}>
            <h3>Combine pelo WhatsApp</h3>
            <p>Toque em "Pedir pelo WhatsApp". A mensagem já vai com o nome da peça; é só combinar cor, quantidade e prazo.</p>
          </li>
          <li data-revelar style={{ "--i": 2 } as React.CSSProperties}>
            <h3>Retire ou receba</h3>
            <p>{loja.entrega}</p>
          </li>
        </ol>
      </section>
    </>
  );
}
