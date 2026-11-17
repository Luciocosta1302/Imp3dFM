import Link from "next/link";
import { formatarPreco, type Produto } from "@/lib/catalogo";
import { Icone } from "./Icone";

export function CartaoProduto({ produto, ordem = 0 }: { produto: Produto; ordem?: number }) {
  const foto = produto.fotos[0];
  const href = `/produtos/${produto.slug}/`;
  return (
    <article className={`cartao${produto.disponivel ? "" : " cartao-esgotado"}`} data-revelar style={{ "--i": ordem } as React.CSSProperties}>
      <Link href={href} className="cartao-foto" tabIndex={-1} aria-hidden="true">
        <img src={foto.src} alt="" loading="lazy" width={800} height={800} />
        {!produto.disponivel && <span className="selo">Esgotado</span>}
      </Link>
      <div className="cartao-corpo">
        <h3 className="cartao-nome">
          <Link href={href}>{produto.nome}</Link>
        </h3>
        <p className="cartao-preco">{formatarPreco(produto.precoCentavos)}</p>
        <Link href={href} className="botao botao-escuro botao-pequeno cartao-botao" tabIndex={-1} aria-hidden="true">
          Ver peça <Icone nome="seta" tamanho={16} />
        </Link>
      </div>
    </article>
  );
}
