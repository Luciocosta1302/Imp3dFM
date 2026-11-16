import Link from "next/link";

export default function NaoEncontrado() {
  return (
    <div className="container secao vazio">
      <h1>Página não encontrada</h1>
      <p>Essa peça pode ter saído do catálogo.</p>
      <Link className="botao botao-secundario" href="/#catalogo">Voltar ao catálogo</Link>
    </div>
  );
}
