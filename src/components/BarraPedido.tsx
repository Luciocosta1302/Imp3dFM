"use client";

import { useEffect, useState } from "react";
import { BotaoWhatsApp } from "./BotaoWhatsApp";

/**
 * Barra fixa no rodapé da tela (só no celular) com o pedido pelo WhatsApp.
 * Aparece quando o botão principal já passou para cima da tela. No celular a página
 * ganha um espaço no fim (CSS) para a barra não cobrir o rodapé.
 * Usa a posição real a cada rolagem (1x por quadro), porque uma rolagem rápida
 * pode pular o botão sem que um IntersectionObserver perceba.
 */
export function BarraPedido({ nome, preco, mensagem, rotulo }: { nome: string; preco: string; mensagem: string; rotulo: string }) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const botao = document.getElementById("pedido-principal");
    if (!botao) return;
    let quadro = 0;
    const medir = () => {
      quadro = 0;
      setVisivel(botao.getBoundingClientRect().bottom < 0);
    };
    const agendar = () => { if (!quadro) quadro = requestAnimationFrame(medir); };
    medir();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
    };
  }, []);

  return (
    <div className={`barra-pedido${visivel ? " barra-pedido-visivel" : ""}`} aria-hidden={!visivel}>
      <div className="barra-pedido-info">
        <span className="barra-pedido-nome">{nome}</span>
        <span className="barra-pedido-preco">{preco}</span>
      </div>
      <BotaoWhatsApp mensagem={mensagem} className="botao-pequeno" tabIndex={visivel ? 0 : -1}>
        {rotulo}
      </BotaoWhatsApp>
    </div>
  );
}
