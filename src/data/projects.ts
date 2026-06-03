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
  /** Cor de acento do tema cyberpunk: cyan ou purple. */
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
      "Ecossistema de múltiplos agentes autônomos para automação complexa. Utiliza LLMs para raciocínio em cadeia e execução de tarefas.",
    longDescription:
      "O Belz Agent é um ecossistema de múltiplos agentes autônomos projetado para resolver tarefas complexas de forma colaborativa. Cada agente possui uma especialização e se comunica com os demais por meio de um orquestrador central, permitindo raciocínio em cadeia (chain-of-thought), planejamento dinâmico e execução de ferramentas externas. A arquitetura foi pensada para ser escalável e extensível, possibilitando a adição de novos agentes e capacidades sem refatorações profundas.",
    stack: ["Python", "LangChain", "OpenAI API", "FastAPI", "Vector DB"],
    highlights: [
      "Orquestração de múltiplos agentes com papéis especializados",
      "Raciocínio em cadeia (chain-of-thought) e planejamento dinâmico",
      "Integração com ferramentas externas via function calling",
      "Memória de longo prazo com banco vetorial",
    ],
    icon: Bot,
    accent: "cyan",
    year: "2025",
    repoUrl: "https://github.com/ldickmann",
  },
  {
    slug: "belezuura",
    title: "Belezuura",
    category: "Headless Commerce",
    shortDescription:
      "Plataforma de e-commerce de alta performance com Next.js e otimização de conversão.",
    longDescription:
      "Belezuura é uma storefront de e-commerce headless construída com Next.js (App Router) e integrada ao Wix Headless SDK. O projeto prioriza performance (Core Web Vitals), SEO e uma experiência de compra fluida, com otimização contínua de conversão. A arquitetura desacoplada permite escalar o catálogo e o checkout de forma independente do backend de gestão.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Wix Headless"],
    highlights: [
      "Arquitetura headless desacoplada do backend de gestão",
      "Checkout integrado com Stripe",
      "Otimização de Core Web Vitals e SEO",
      "Catálogo dinâmico via Wix Headless SDK",
    ],
    icon: ShoppingBag,
    accent: "purple",
    year: "2025",
  },
  {
    slug: "e-receitasus",
    title: "E-ReceitaSUS",
    category: "Health / Mobile",
    shortDescription: "App mobile para gestão de saúde pública.",
    longDescription:
      "O E-ReceitaSUS é uma aplicação voltada à gestão de saúde pública, facilitando o acesso a receitas e o acompanhamento de pacientes no contexto do SUS. O foco do projeto está na acessibilidade, na confiabilidade dos dados e em uma interface simples para usuários de diferentes perfis.",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    highlights: [
      "Gestão de receitas e acompanhamento de pacientes",
      "Interface acessível para diferentes perfis de usuário",
      "Integração com fluxos do SUS",
    ],
    icon: Activity,
    accent: "green",
    year: "2024",
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
