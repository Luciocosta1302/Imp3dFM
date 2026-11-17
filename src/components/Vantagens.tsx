import { loja } from "@/config/loja";
import { Icone, type NomeIcone } from "./Icone";

const itens: { icone: NomeIcone; titulo: string; texto: string }[] = [
  { icone: "paleta", titulo: "Você escolhe a cor", texto: "Entre as opções de cada peça" },
  { icone: "cubo", titulo: "Feito em Marabá", texto: "Impresso aqui, sem esperar importação" },
  { icone: "regua", titulo: "Material", texto: loja.materiais },
  { icone: "caminhao", titulo: "Retirada ou envio", texto: "Frete combinado na conversa" },
];

export function Vantagens() {
  return (
    <section className="vantagens" aria-label="Como trabalhamos">
      <ul className="container vantagens-lista">
        {itens.map((i) => (
          <li key={i.titulo}>
            <span className="vantagem-icone"><Icone nome={i.icone} tamanho={26} /></span>
            <span>
              <strong>{i.titulo}</strong>
              <span>{i.texto}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
