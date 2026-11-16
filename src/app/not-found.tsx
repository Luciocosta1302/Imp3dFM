import Link from "next/link";

export default function NaoEncontrado() {
  return (
    <div className="container pagina vazio">
      <h1>Página não encontrada</h1>
      <p>Essa peça pode ter saído do catálogo.</p>
      <Link className="botao botao-escuro" href="/catalogo/">Ver catálogo</Link>
    </div>
  );
}
