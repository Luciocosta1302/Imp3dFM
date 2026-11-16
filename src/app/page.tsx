import { loja } from "@/config/loja";
import { catalogo } from "@/lib/dados";
import { categorias } from "@/lib/catalogo";
import { Catalogo } from "@/components/Catalogo";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { mensagemPersonalizada } from "@/lib/whatsapp";

export default function Inicio() {
  return (
    <>
      <section className="hero">
        <div className="container hero-interno">
          <p className="hero-sobre">Impressão 3D · {loja.cidade}</p>
          <h1>{loja.slogan}</h1>
          <p className="hero-texto">{loja.descricao}</p>
          <div className="hero-acoes">
            <a className="botao botao-secundario" href="#catalogo">Ver catálogo</a>
            <BotaoWhatsApp mensagem={mensagemPersonalizada()}>Pedir peça personalizada</BotaoWhatsApp>
          </div>
        </div>
      </section>

      <section id="catalogo" className="secao container" aria-labelledby="titulo-catalogo">
        <h2 id="titulo-catalogo">Catálogo</h2>
        <Catalogo produtos={catalogo} categorias={categorias(catalogo)} />
      </section>

      <section id="como-encomendar" className="secao secao-alt" aria-labelledby="titulo-como">
        <div className="container">
          <h2 id="titulo-como">Como encomendar</h2>
          <ol className="passos">
            <li>
              <h3>Escolha a peça</h3>
              <p>Veja o catálogo ou tenha em mãos a ideia, foto ou arquivo da peça que você quer.</p>
            </li>
            <li>
              <h3>Chame no WhatsApp</h3>
              <p>Combine cor, quantidade e prazo. Peças personalizadas recebem orçamento na conversa.</p>
            </li>
            <li>
              <h3>Receba</h3>
              <p>{loja.entrega}</p>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
