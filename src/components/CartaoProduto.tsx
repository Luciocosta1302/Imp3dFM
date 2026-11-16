import Link from "next/link";
import { formatarPreco, type Produto } from "@/lib/catalogo";

export function CartaoProduto({ produto }: { produto: Produto }) {
  const foto = produto.fotos[0];
  return (
    <article className={`cartao${produto.disponivel ? "" : " cartao-indisponivel"}`}>
      <Link href={`/produtos/${produto.slug}/`} className="cartao-link">
        <div className="cartao-foto">
          <img src={foto.src} alt={foto.alt} loading="lazy" width={600} height={600} />
          {!produto.disponivel && <span className="selo">Indisponível</span>}
        </div>
        <div className="cartao-corpo">
          <p className="cartao-categoria">{produto.categoria}</p>
          <h3 className="cartao-nome">{produto.nome}</h3>
          <p className="cartao-preco">{formatarPreco(produto.precoCentavos)}</p>
        </div>
      </Link>
    </article>
  );
}
