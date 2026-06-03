import type { LucideIcon } from "lucide-react";
import { Bot, ShoppingBag, Activity } from "lucide-react";

/**
 * Estrutura tipada de um projeto do portfólio.
 *
 * Esta interface é a fonte única de verdade (single source of truth)
 * consumida tanto pelo Bento Grid da home (`ProjectsBento`) quanto pelas
 * páginas dinâmicas de detalhe (`/projects/[slug]`).
 */
export interface Project {
  /** Identificador único usado na URL (`/projects/[slug]`). */
  slug: string;
  /** Nome de exibição do projeto. */
  title: string;
  /** Categoria curta exibida no card (ex.: "AI Architecture"). */
  category: string;
  /** Resumo curto para o card do Bento. */
  shortDescription: string;
  /** Descrição completa exibida na página de detalhe. */
  longDescription: string;
  /** Lista de tecnologias/stack utilizadas. */
  stack: string[];
  /** Principais funcionalidades/destaques do projeto. */
  highlights: string[];
  /** Ícone (lucide-react) associado ao projeto. */
  icon: LucideIcon;
  /** Cor de acento do tema cyberpunk: cyan ou purple ou green. */
  accent: "cyan" | "purple" | "green";
  /** Ano do projeto. */
  year: string;
  /** Link para o repositório (opcional). */
  repoUrl?: string;
  /** Link para a versão online/demo (opcional). */
  liveUrl?: string;
}

/**
 * Catálogo de projetos do portfólio.
 * Para adicionar um novo projeto, basta inserir um objeto neste array.
 */
export const projects: Project[] = [
  {
    slug: "belz-agent",
    title: "Belz Agent",
    category: "AI Architecture",
    shortDescription:
      "Laboratório de arquitetura para agentes autônomos utilizando raciocínio em cadeia (CoT).",
    longDescription:
      "Desenvolver um sistema capaz de compreender fluxos de trabalho complexos e tomar decisões autônomas. A solução é a implementação de um ecossistema multi-agente utilizando Python e LangChain. O foco está na Engenharia de Prompt avançada para garantir que os modelos de linguagem (LLMs) executem tarefas com previsibilidade, minimizando alucinações através de context injection e planejamento dinâmico.",
    stack: ["Python", "LangChain", "OpenAI / Gemini API", "FastAPI", "Vector DB"],
    highlights: [
      "Orquestração de múltiplos agentes com papéis especializados",
      "Raciocínio em cadeia (chain-of-thought) e planejamento dinâmico",
      "Integração com ferramentas externas via function calling",
      "Memória de longo prazo com banco vetorial",
    ],
    icon: Bot,
    accent: "cyan",
    year: "2026",
    repoUrl: "https://github.com/ldickmann/BelzAgent",
  },
  {
    slug: "belezuura",
    title: "Belezuura",
    category: "Front-end / Headless",
    shortDescription:
      "Interface de e-commerce de alta performance focada em conversão e SEO técnico, consumindo API externa.",
    longDescription:
      "A loja precisava de uma interface front-end extremamente rápida, responsiva e otimizada para SEO. A solução foi o desenvolvimento exclusivo da camada Front-end construída do zero com Next.js (App Router), TypeScript e Tailwind CSS. A aplicação atua como uma interface de alta performance que consome os dados (catálogo, carrinho e checkout) via integração direta com a API do Wix (Wix Headless SDK), resultando em uma experiência de usuário (UX) fluida e desacoplada.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Wix Headless SDK", "SEO"],
    highlights: [
      "Arquitetura headless consumindo a API do Wix",
      "Otimização extrema de Core Web Vitals e SEO",
      "Integração com Meta Pixel e Google Merchant Center",
      "Foco total na experiência de conversão (UX) e responsividade",
    ],
    icon: ShoppingBag,
    accent: "purple",
    year: "2026",
    liveUrl: "https://belezuura.com.br",
  },
  {
    slug: "e-receitasus",
    title: "E-ReceitaSUS",
    category: "Health / Mobile",
    shortDescription: "Aplicativo mobile voltado para a gestão e acesso de receitas médicas do sistema público de saúde.",
    longDescription:
      "O objetivo é modernizar e facilitar o acesso de pacientes e farmacêuticos às prescrições médicas do SUS, eliminando o papel e garantindo a rastreabilidade segura dos medicamentos. O desenvolvimento conta com um aplicativo multiplataforma estruturado com Flutter (foco mobile) e back-end em Node.js com banco de dados relacional para gerenciar o controle de acesso e autenticação dos usuários.",
    stack: ["Flutter", "Dart", "Node.js", "PostgreSQL", "Figma"],
    highlights: [
      "Modernização do acesso a prescrições médicas do SUS",
      "Aplicativo multiplataforma para iOS e Android",
      "Rastreabilidade segura e eliminação de papel",
      "Autenticação de usuários e gestão de prontuários",
    ],
    icon: Activity,
    accent: "green",
    year: "2026",
    repoUrl: "https://github.com/ldickmann/e-receitasus",
  },
];

/**
 * Retorna um projeto pelo seu slug.
 * @param slug Identificador do projeto na URL.
 * @returns O projeto correspondente ou `undefined` se não encontrado.
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}