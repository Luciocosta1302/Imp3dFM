/**
 * Categorias e peças do catálogo.
 *
 * Para adicionar uma peça: copie um bloco de `produtos`, troque os dados e
 * coloque a foto em `public/img/` (quadrada, de preferência 800 × 800).
 * O build falha se algum dado estiver inválido (slug repetido, categoria que
 * não existe, preço negativo etc.), então nada quebrado vai para o ar.
 *
 * Preço em CENTAVOS: R$ 39,90 = 3990. Use `null` para "Sob consulta".
 *
 * ATENÇÃO: preços abaixo são FICTÍCIOS (demonstração).
 */
import type { Categoria, Produto } from "@/lib/catalogo";

export const categorias: Categoria[] = [
  {
    slug: "natal",
    nome: "Natal",
    descricao: "Enfeites, árvores e casinhas para montar a decoração ou presentear.",
    imagem: "/img/arvore-natal-espiral.webp",
  },
  {
    slug: "acessorios-celular",
    nome: "Acessórios para celular",
    descricao: "Suportes e organizadores para o celular ficar sempre à mão.",
    imagem: "/img/suporte-celular-triangular.webp",
  },
  {
    slug: "chaveiros",
    nome: "Chaveiros",
    descricao: "Modelos prontos ou com nome, logo e cores que você escolher.",
    imagem: "/img/chaveiros-tematicos.webp",
  },
  {
    slug: "antiestresse",
    nome: "Antiestresse",
    descricao: "Bichinhos articulados e brinquedos para mexer enquanto pensa.",
    imagem: "/img/axolote-articulado.webp",
  },
  {
    slug: "mesa-e-organizacao",
    nome: "Mesa e organização",
    descricao: "Porta-canetas, organizadores de cabo e outras peças para a mesa.",
    imagem: "/img/porta-canetas-canelado.webp",
  },
];

export const produtos: Produto[] = [
  {
    slug: "suporte-celular-triangular",
    nome: "Suporte de celular triangular",
    categoria: "acessorios-celular",
    precoCentavos: 3490,
    descricao:
      "Suporte firme para deixar o celular em pé na mesa, com encaixe para o cabo carregador passar por baixo. Serve na maioria dos celulares, com ou sem capinha.",
    material: "PLA",
    dimensoes: "9 × 10 × 8 cm",
    cores: ["Azul", "Preto", "Branco"],
    disponivel: true,
    destaque: true,
    fotos: [{ src: "/img/suporte-celular-triangular.webp", alt: "Suporte de celular azul em formato triangular com um celular apoiado" }],
  },
  {
    slug: "axolote-articulado",
    nome: "Axolote articulado",
    categoria: "antiestresse",
    precoCentavos: 3990,
    descricao:
      "Axolote impresso já montado, com o corpo em gomos que se mexem. Bom para quem gosta de ficar mexendo em alguma coisa e faz sucesso com criança.",
    material: "PLA",
    dimensoes: "Cerca de 20 cm de comprimento",
    cores: ["Azul com verde", "Rosa", "Roxo"],
    disponivel: true,
    destaque: true,
    fotos: [{ src: "/img/axolote-articulado.webp", alt: "Axolote articulado azul com guelras verdes" }],
  },
  {
    slug: "arvore-natal-espiral",
    nome: "Árvore de Natal espiral",
    categoria: "natal",
    precoCentavos: 4490,
    descricao:
      "Árvore de mesa com camadas em espiral. Fica bonita sozinha na estante ou em conjunto com outras peças da coleção de Natal.",
    material: "PLA",
    dimensoes: "18 cm de altura",
    cores: ["Verde", "Branco", "Dourado"],
    disponivel: true,
    destaque: true,
    fotos: [{ src: "/img/arvore-natal-espiral.webp", alt: "Árvore de Natal verde com camadas em espiral" }],
  },
  {
    slug: "chaveiros-tematicos",
    nome: "Chaveiros temáticos",
    categoria: "chaveiros",
    precoCentavos: 1290,
    descricao:
      "Chaveiros com argola de metal. Tem foguete, patinha e outros modelos, e dá para fazer com nome ou logo. Preço por unidade; para lembrancinha em quantidade, chama no WhatsApp.",
    material: "PLA",
    dimensoes: "Cerca de 5 cm",
    cores: ["Azul", "Laranja", "Outras cores sob consulta"],
    disponivel: true,
    destaque: true,
    fotos: [{ src: "/img/chaveiros-tematicos.webp", alt: "Chaveiro azul de foguete e chaveiro laranja de patinha" }],
  },
  {
    slug: "casinha-natal",
    nome: "Casinha de Natal",
    categoria: "natal",
    precoCentavos: 5990,
    descricao:
      "Casinha com telhado vermelho e janelas em destaque, impressa em várias cores. Pode receber uma luzinha de LED por baixo.",
    material: "PLA",
    dimensoes: "12 × 9 × 13 cm",
    cores: ["Como na foto"],
    disponivel: true,
    destaque: true,
    fotos: [{ src: "/img/casinha-natal.webp", alt: "Casinha de Natal com telhado vermelho e paredes cor de terra" }],
  },
  {
    slug: "porta-canetas-canelado",
    nome: "Porta-canetas canelado",
    categoria: "mesa-e-organizacao",
    precoCentavos: 2990,
    descricao: "Porta-canetas com acabamento canelado, que também serve de vasinho para suculenta.",
    material: "PLA",
    dimensoes: "9 cm de diâmetro × 10 cm",
    cores: ["Branco", "Preto", "Cinza"],
    disponivel: true,
    destaque: true,
    fotos: [{ src: "/img/porta-canetas-canelado.webp", alt: "Porta-canetas branco canelado com duas canetas" }],
  },
  {
    slug: "organizador-cabos",
    nome: "Organizador de cabos",
    categoria: "mesa-e-organizacao",
    precoCentavos: 1490,
    descricao: "Prende até três cabos na beirada da mesa para eles não caírem no chão.",
    material: "PETG",
    dimensoes: "10 × 3 × 3 cm",
    cores: ["Cinza", "Preto", "Branco"],
    disponivel: true,
    destaque: false,
    fotos: [{ src: "/img/organizador-cabos.webp", alt: "Organizador de cabos cinza com um cabo USB-C encaixado" }],
  },
  {
    slug: "bola-natal-vazada",
    nome: "Bola de Natal vazada",
    categoria: "natal",
    precoCentavos: 990,
    descricao: "Bola com desenho geométrico vazado e cordão para pendurar na árvore. Preço por unidade.",
    material: "PLA",
    dimensoes: "7 cm de diâmetro",
    cores: ["Vermelho", "Dourado", "Branco"],
    disponivel: true,
    destaque: false,
    fotos: [{ src: "/img/bola-natal-vazada.webp", alt: "Bola de Natal vermelha com desenho geométrico vazado" }],
  },
  {
    slug: "floco-de-neve",
    nome: "Floco de neve com base",
    categoria: "natal",
    precoCentavos: 1990,
    descricao: "Floco de neve em pé, com base redonda, para enfeitar mesa e prateleira.",
    material: "PLA",
    dimensoes: "11 cm de altura",
    cores: ["Marfim", "Branco"],
    disponivel: false,
    destaque: false,
    fotos: [{ src: "/img/floco-de-neve.webp", alt: "Floco de neve cor marfim sobre base redonda" }],
  },
];
