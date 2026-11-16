import { linkWhatsApp } from "@/lib/whatsapp";
import { loja } from "@/config/loja";
import { IconeWhatsApp } from "./Icone";

type Props = {
  mensagem: string;
  children: React.ReactNode;
  variante?: "whatsapp" | "claro" | "escuro";
  className?: string;
};

export function BotaoWhatsApp({ mensagem, children, variante = "whatsapp", className = "" }: Props) {
  const href = linkWhatsApp(loja.whatsapp, mensagem);
  const classe = `botao botao-${variante} ${className}`.trim();

  if (!href) {
    return (
      <span className={`${classe} botao-desativado`} aria-disabled="true" title="Número de WhatsApp ainda não configurado">
        <IconeWhatsApp />
        {children}
      </span>
    );
  }
  return (
    <a className={classe} href={href} target="_blank" rel="noopener noreferrer">
      <IconeWhatsApp />
      {children}
    </a>
  );
}
