import { describe, expect, it } from "vitest";
import { produtos } from "@/data/produtos";
import { carregarCatalogo, formatarPreco, validarCatalogo, type Produto } from "@/lib/catalogo";
import { linkWhatsApp, mensagemProduto } from "@/lib/whatsapp";

const base: Produto = {
  slug: "peca-teste",
  nome: "Peça teste",
  categoria: "Teste",
  precoCentavos: 1000,
  descricao: "x",
  material: "PLA",
  dimensoes: "1 cm",
  cores: ["Preto"],
  disponivel: true,
  fotos: [{ src: "/produtos/x.svg", alt: "x" }],
};

describe("catálogo", () => {
  it("o catálogo do projeto é válido", () => {
    expect(validarCatalogo(produtos)).toEqual([]);
  });

  it("rejeita slug repetido, slug inválido e preço não inteiro", () => {
    const erros = validarCatalogo([
      base,
      { ...base },
      { ...base, slug: "Com Espaço" },
      { ...base, slug: "preco-quebrado", precoCentavos: 39.9 },
      { ...base, slug: "preco-zero", precoCentavos: 0 },
    ]);
    expect(erros.join("\n")).toMatch(/slug repetido/);
    expect(erros.join("\n")).toMatch(/Com Espaço: slug inválido/);
    expect(erros.join("\n")).toMatch(/preco-quebrado: preço/);
    expect(erros.join("\n")).toMatch(/preco-zero: preço/);
  });

  it("rejeita foto sem texto alternativo ou fora da pasta", () => {
    const erros = validarCatalogo([{ ...base, fotos: [{ src: "https://x.com/a.png", alt: " " }] }]);
    expect(erros).toHaveLength(2);
  });

  it("carregarCatalogo lança erro e coloca disponíveis primeiro", () => {
    expect(() => carregarCatalogo([base, base])).toThrow(/Catálogo inválido/);
    const lista = carregarCatalogo([
      { ...base, slug: "a", disponivel: false },
      { ...base, slug: "b" },
    ]);
    expect(lista.map((p) => p.slug)).toEqual(["b", "a"]);
  });

  it("formata preço em reais a partir de centavos", () => {
    expect(formatarPreco(4990).replace(/\s/g, " ")).toBe("R$ 49,90");
    expect(formatarPreco(null)).toBe("Sob consulta");
  });
});

describe("WhatsApp", () => {
  it("monta link com número limpo e mensagem codificada", () => {
    const link = linkWhatsApp("+55 (11) 98765-4321", mensagemProduto("Vaso & cia", "vaso", "R$ 49,90"));
    expect(link).toMatch(/^https:\/\/wa\.me\/5511987654321\?text=/);
    expect(decodeURIComponent(link!.split("text=")[1])).toContain('"Vaso & cia" (ref. vaso, R$ 49,90)');
  });

  it("retorna null com número vazio ou curto", () => {
    expect(linkWhatsApp("", "oi")).toBeNull();
    expect(linkWhatsApp("98765-4321", "oi")).toBeNull();
  });
});
