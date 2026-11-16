import Link from "next/link";
import { loja } from "@/config/loja";
import { catalogo } from "@/lib/dados";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { GradeProdutos } from "@/components/GradeProdutos";
import { Vantagens } from "@/components/Vantagens";
import { Icone } from "@/components/Icone";
import { mensagemDataComemorativa, mensagemPersonalizada } from "@/lib/whatsapp";

export default function Inicio() {
  const maisProcurados = catalogo.produtos.filter((p) => p.destaque && p.disponivel).slice(0, 6);
  const qtd = (slug: string) => catalogo.produtos.filter((p) => p.categoria === slug).length;

  return (
    <>
      <section className="hero">
        <img className="hero-imagem" src="/img/banner-impressora.webp" alt="" width={1600} height={900} fetchPriority="high" />
        <div className="container hero-conteudo">
          <p className="sobretitulo">Impressão 3D{loja.cidade ? ` em ${loja.cidade}` : ""}</p>
          <h1>{loja.titulo}</h1>
          <p className="hero-texto">{loja.descricao}</p>
          <div className="hero-acoes">
            <Link href="/catalogo/" className="botao botao-claro">
              Ver catálogo <Icone nome="seta" tamanho={18} />
            </Link>
            <BotaoWhatsApp mensagem={mensagemPersonalizada()} variante="whatsapp">
              Orçar peça personalizada
            </BotaoWhatsApp>
          </div>
        </div>
      </section>

      <section id="categorias" className="secao container" aria-labelledby="t-categorias">
        <div className="secao-topo">
          <h2 id="t-categorias">Categorias</h2>
          <Link href="/catalogo/" className="link-seta">Ver tudo <Icone nome="seta" tamanho={16} /></Link>
        </div>
        <ul className="categorias">
          {catalogo.categorias.map((c) => (
            <li key={c.slug}>
              <Link href={`/categorias/${c.slug}/`} className="categoria">
                <img src={c.imagem} alt="" width={800} height={800} loading="lazy" />
                <span className="categoria-nome">{c.nome}</span>
                <span className="categoria-qtd">{qtd(c.slug)} {qtd(c.slug) === 1 ? "peça" : "peças"}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="container colecoes" aria-label="Coleções">
        <Link href="/categorias/natal/" className="colecao colecao-natal">
          <img src="/img/colecao-natal.webp" alt="" width={1200} height={900} loading="lazy" />
          <span className="colecao-texto">
            <span className="sobretitulo">Coleção</span>
            <span className="colecao-titulo">Natal</span>
            <span>Árvores, bolas e casinhas para a decoração de fim de ano.</span>
            <span className="botao botao-claro botao-pequeno">Ver coleção <Icone nome="seta" tamanho={16} /></span>
          </span>
        </Link>
        <Link href="/categorias/mesa-e-organizacao/" className="colecao colecao-mesa">
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
        <div className="secao-topo">
          <h2 id="t-procurados">Mais procurados</h2>
          <Link href="/catalogo/" className="link-seta">Ver catálogo <Icone nome="seta" tamanho={16} /></Link>
        </div>
        <GradeProdutos produtos={maisProcurados} />
      </section>

      <section className="container faixas" aria-label="Encomendas">
        <div className="faixa-promo faixa-datas">
          <Icone nome="calendario" tamanho={28} />
          <div>
            <h2>Datas comemorativas</h2>
            <p>Páscoa, Dia das Mães, Dia dos Pais, Dia das Crianças, Halloween. Encomende com pelo menos duas semanas de antecedência.</p>
          </div>
          <BotaoWhatsApp mensagem={mensagemDataComemorativa()} variante="claro" className="botao-pequeno">
            Encomendar
          </BotaoWhatsApp>
        </div>
        <div id="personalizados" className="faixa-promo faixa-personalizado">
          <Icone nome="conversa" tamanho={28} />
          <div>
            <h2>Tem uma ideia ou um arquivo?</h2>
            <p>Mande foto, medidas ou o arquivo STL. A gente avalia e passa o orçamento pelo WhatsApp.</p>
          </div>
          <BotaoWhatsApp mensagem={mensagemPersonalizada()} variante="claro" className="botao-pequeno">
            Pedir orçamento
          </BotaoWhatsApp>
        </div>
      </section>

      <Vantagens />

      <section id="como-encomendar" className="secao container" aria-labelledby="t-como">
        <h2 id="t-como">Como encomendar</h2>
        <ol className="passos">
          <li>
            <h3>Escolha a peça</h3>
            <p>No catálogo, ou mande a ideia, a foto ou o arquivo da peça que você quer.</p>
          </li>
          <li>
            <h3>Combine pelo WhatsApp</h3>
            <p>Cor, quantidade e prazo. Peças personalizadas recebem orçamento na conversa.</p>
          </li>
          <li>
            <h3>Retire ou receba</h3>
            <p>{loja.entrega}</p>
          </li>
        </ol>
      </section>
    </>
  );
}
