/**
 * Catálogo de peças.
 *
 * Para adicionar uma peça: copie um bloco, troque os dados e coloque as fotos
 * em `public/produtos/`. O build falha se algum dado estiver inválido
 * (slug repetido, preço negativo etc.), então nada quebrado vai para o ar.
 *
 * Preço em CENTAVOS: R$ 39,90 = 3990. Use `null` para "sob consulta".
 *
 * ATENÇÃO: peças, preços e fotos abaixo são FICTÍCIOS (demonstração).
 */
import type { Produto } from "@/lib/catalogo";

export const produtos: Produto[] = [
  {
    slug: "vaso-geometrico",
    nome: "Vaso geométrico",
    categoria: "Decoração",
    precoCentavos: 4990,
    descricao:
      "Vaso facetado para suculentas e plantas pequenas. Acompanha furo de drenagem opcional.",
    material: "PLA",
    dimensoes: "10 × 10 × 12 cm",
    cores: ["Branco", "Preto", "Terracota"],
    disponivel: true,
    fotos: [{ src: "/produtos/vaso-geometrico.svg", alt: "Vaso geométrico facetado" }],
  },
  {
    slug: "suporte-headset",
    nome: "Suporte para headset",
    categoria: "Escritório",
    precoCentavos: 5990,
    descricao: "Suporte de mesa estável para fones de ouvido, com base antiderrapante.",
    material: "PETG",
    dimensoes: "12 × 10 × 26 cm",
    cores: ["Preto", "Cinza"],
    disponivel: true,
    fotos: [{ src: "/produtos/suporte-headset.svg", alt: "Suporte de mesa para headset" }],
  },
  {
    slug: "organizador-gaveta",
    nome: "Organizador de gaveta modular",
    categoria: "Casa",
    precoCentavos: 2990,
    descricao: "Módulos encaixáveis para organizar talheres, ferramentas ou material de escritório.",
    material: "PLA",
    dimensoes: "Módulo de 8 × 16 × 5 cm",
    cores: ["Branco", "Cinza", "Azul"],
    disponivel: true,
    fotos: [{ src: "/produtos/organizador-gaveta.svg", alt: "Módulos de organizador de gaveta" }],
  },
  {
    slug: "chaveiro-personalizado",
    nome: "Chaveiro personalizado",
    categoria: "Personalizados",
    precoCentavos: 1500,
    descricao: "Chaveiro com nome ou logotipo. Mande o texto ou a arte pelo WhatsApp.",
    material: "PLA",
    dimensoes: "Até 6 × 3 cm",
    cores: ["Várias cores"],
    disponivel: true,
    fotos: [{ src: "/produtos/chaveiro-personalizado.svg", alt: "Chaveiro com nome personalizado" }],
  },
  {
    slug: "miniatura-dragao",
    nome: "Miniatura de dragão",
    categoria: "Colecionáveis",
    precoCentavos: null,
    descricao:
      "Miniatura detalhada para pintura ou coleção. Tamanho e acabamento combinados por encomenda.",
    material: "Resina",
    dimensoes: "Sob encomenda",
    cores: ["Cinza para pintura"],
    disponivel: true,
    fotos: [{ src: "/produtos/miniatura-dragao.svg", alt: "Miniatura de dragão" }],
  },
  {
    slug: "porta-celular",
    nome: "Porta-celular articulado",
    categoria: "Escritório",
    precoCentavos: 3490,
    descricao: "Suporte com ângulo ajustável para celular ou tablet pequeno.",
    material: "PETG",
    dimensoes: "8 × 9 × 11 cm",
    cores: ["Preto", "Branco"],
    disponivel: false,
    fotos: [{ src: "/produtos/porta-celular.svg", alt: "Porta-celular com ângulo ajustável" }],
  },
];
