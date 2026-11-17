"use client";

import { useEffect } from "react";

/**
 * Faz os elementos com [data-revelar] surgirem quando chegam na tela
 * (ou quando a página já passou deles, por exemplo num link de âncora).
 * O CSS só esconde esses elementos quando o <html> tem a classe "js",
 * então sem JavaScript tudo aparece normalmente.
 */
export function Revelar() {
  useEffect(() => {
    let quadro = 0;
    const verificar = () => {
      quadro = 0;
      const limite = window.innerHeight * 0.92;
      document.querySelectorAll("[data-revelar]:not(.visivel)").forEach((el) => {
        if (el.getBoundingClientRect().top < limite) el.classList.add("visivel");
      });
    };
    const agendar = () => { if (!quadro) quadro = requestAnimationFrame(verificar); };
    verificar();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    // Cartões novos (troca de página, filtro do catálogo).
    const mo = new MutationObserver(agendar);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      mo.disconnect();
    };
  }, []);
  return null;
}
