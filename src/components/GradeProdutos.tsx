import type { Produto } from "@/lib/catalogo";
import { CartaoProduto } from "./CartaoProduto";

export function GradeProdutos({ produtos }: { produtos: Produto[] }) {
  return (
    <div className="grade">
      {produtos.map((p, i) => (
        <CartaoProduto key={p.slug} produto={p} ordem={i % 6} />
      ))}
    </div>
  );
}
