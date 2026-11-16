import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { categorias, produtos } from "@/data/produtos";
import {
  buscar,
  carregarCatalogo,
  formatarPreco,
  relacionados,
  validarCatalogo,
  type Categoria,
  type Produto,
} from "@/lib/catalogo";
import { linkWhatsApp, mensagemProduto } from "@/lib/whatsapp";

const cat: Categoria = { slug: "teste", nome: "Teste", descricao: "x", imagem: "/img/x.webp" };
const base: Produto = {
  slug: "peca-teste",
  nome: "Peça teste",
  categoria: "teste",
  precoCentavos: 1000,
  descricao: "x",
  material: "PLA",
  dimensoes: "1 cm",
  cores: ["Preto"],
  disponivel: true,
  destaque: false,
  fotos: [{ src: "/img/x.webp", alt: "x" }],
};

describe("catálogo do projeto", () => {
  it("é válido", () => {
    expect(validarCatalogo(categorias, produtos)).toEqual([]);
  });

  it("todas as imagens existem em public/", () => {
    const caminhos = [...categorias.map((c) => c.imagem), ...produtos.flatMap((p) => p.fotos.map((f) => f.src))];
    const faltando = caminhos.filter((c) => !existsSync(path.join("public", c)));
    expect(faltando).toEqual([]);
  });
});

describe("validação", () => {
  it("rejeita slug repetido, slug inválido, preço não inteiro e categoria inexistente", () => {
    const erros = validarCatalogo([cat], [
      base,
      { ...base },
      { ...base, slug: "Com Espaço" },
      { ...base, slug: "preco-quebrado", precoCentavos: 39.9 },
      { ...base, slug: "preco-zero", precoCentavos: 0 },
      { ...base, slug: "sem-categoria", categoria: "nao-existe" },
    ]).join("\n");
    expect(erros).toMatch(/peca-teste: slug repetido/);
    expect(erros).toMatch(/Com Espaço: slug inválido/);
    expect(erros).toMatch(/preco-quebrado: preço/);
    expect(erros).toMatch(/preco-zero: preço/);
    expect(erros).toMatch(/sem-categoria: categoria "nao-existe" não existe/);
  });

  it("rejeita foto sem texto alternativo ou fora da pasta", () => {
    const erros = validarCatalogo([cat], [{ ...base, fotos: [{ src: "https://x.com/a.png", alt: " " }] }]);
    expect(erros).toHaveLength(2);
  });

  it("carregarCatalogo lança erro e coloca disponíveis primeiro", () => {
    expect(() => carregarCatalogo([cat], [base, base])).toThrow(/Catálogo inválido/);
    const { produtos: lista } = carregarCatalogo([cat], [
      { ...base, slug: "a", disponivel: false },
      { ...base, slug: "b" },
    ]);
    expect(lista.map((p) => p.slug)).toEqual(["b", "a"]);
  });
});

describe("busca e sugestões", () => {
  const lista: Produto[] = [
    { ...base, slug: "porta-canetas", nome: "Porta-canetas", cores: ["Branco"] },
    { ...base, slug: "organizador", nome: "Organização de cabos", cores: ["Cinza"] },
    { ...base, slug: "outro", nome: "Outra peça", categoria: "outra" },
  ];

  it("ignora acentos, maiúsculas e ordem das palavras", () => {
    expect(buscar(lista, [cat], "ORGANIZACAO").map((p) => p.slug)).toEqual(["organizador"]);
    expect(buscar(lista, [cat], "branco porta").map((p) => p.slug)).toEqual(["porta-canetas"]);
    expect(buscar(lista, [cat], "   ")).toHaveLength(3);
    expect(buscar(lista, [cat], "teste")).toHaveLength(2); // pelo nome da categoria
  });

  it("sugere primeiro a mesma categoria e nunca a própria peça", () => {
    const r = relacionados(lista, lista[0]);
    expect(r.map((p) => p.slug)).toEqual(["organizador", "outro"]);
  });
});

describe("preço e WhatsApp", () => {
  it("formata preço em reais a partir de centavos", () => {
    expect(formatarPreco(4990)).toBe("R$ 49,90");
    expect(formatarPreco(123456)).toBe("R$ 1.234,56");
    expect(formatarPreco(null)).toBe("Sob consulta");
  });

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
