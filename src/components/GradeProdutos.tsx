import type { Produto } from "@/lib/catalogo";
import { CartaoProduto } from "./CartaoProduto";

export function GradeProdutos({ produtos }: { produtos: Produto[] }) {
  return (
    <div className="grade">
      {produtos.map((p) => (
        <CartaoProduto key={p.slug} produto={p} />
      ))}
    </div>
  );
}
