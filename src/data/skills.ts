import {
  Code2,
  Server,
  Brain,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import type { Accent } from "@/lib/accent";

/**
 * Representa uma categoria de habilidades técnicas com suas tecnologias.
 */
export interface SkillCategory {
  /** Nome da categoria (ex.: "Frontend"). */
  title: string;
  /** Ícone (lucide-react) representativo da categoria. */
  icon: LucideIcon;
  /** Cor de acento da marca. Ver `src/lib/accent.ts`. */
  accent: Accent;
  /** Lista de tecnologias/ferramentas da categoria. */
  skills: string[];
}

/**
 * Matriz de habilidades técnicas agrupadas por categoria.
 * Consumida pela `SkillsSection` para renderizar a grade visual de stack.
 */
export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: Code2,
    accent: "lime",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    icon: Server,
    accent: "purple",
    skills: ["Node.js", "Python", "FastAPI", "PostgreSQL", "REST APIs"],
  },
  {
    title: "IA & LLMs",
    icon: Brain,
    accent: "lime",
    skills: [
      "LangChain",
      "OpenAI API",
      "Prompt Engineering",
      "Agentes Autônomos",
      "RAG",
    ],
  },
  {
    title: "Ferramentas & DevOps",
    icon: Wrench,
    accent: "purple",
    skills: ["Git", "Docker", "Vercel", "Azure DevOps", "CI/CD"],
  },
];
