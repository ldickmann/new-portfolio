import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { projects, getProjectBySlug } from "@/data/projects";

/**
 * Mapa de classes de acento por cor do tema cyberpunk.
 */
const ACCENT_CLASSES = {
  cyan: { text: "text-cyber-cyan", iconBg: "bg-cyber-cyan/10 text-cyber-cyan" },
  purple: {
    text: "text-cyber-purple",
    iconBg: "bg-cyber-purple/10 text-cyber-purple",
  },
  green: { text: "text-green-400", iconBg: "bg-green-400/10 text-green-400" },
} as const;

/**
 * Gera estaticamente (SSG) uma rota para cada projeto do catálogo.
 * Executado em build time.
 */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/**
 * Gera os metadados (SEO) dinâmicos de cada página de projeto.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Projeto não encontrado" };
  }

  return {
    title: `${project.title} — Lucas Elias Dickmann`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — Lucas Elias Dickmann`,
      description: project.shortDescription,
      type: "article",
    },
  };
}

/**
 * Página de detalhe de um projeto.
 *
 * Renderiza a descrição completa, stack, destaques e links externos.
 * É gerada estaticamente (SSG) via `generateStaticParams`.
 */
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  // Se o slug não corresponder a nenhum projeto, exibe a página 404.
  if (!project) {
    notFound();
  }

  const accent = ACCENT_CLASSES[project.accent];

  return (
    <main className="min-h-screen bg-cyber-black text-white relative">
      {/* Fundo em grade decorativo */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 py-16 relative z-10 max-w-4xl">
        {/* Voltar para a home */}
        <Button
          variant="ghost"
          className="mb-10 gap-2 text-gray-400 hover:text-white"
          render={<Link href="/#projetos" />}>
          <ArrowLeft size={18} />
          Voltar aos projetos
        </Button>

        {/* Cabeçalho */}
        <header className="mb-10">
          <div className={`flex items-center gap-3 mb-4 ${accent.text}`}>
            <div className={`p-2.5 rounded-lg ${accent.iconBg}`}>
              <project.icon size={24} />
            </div>
            <span className="font-mono text-xs uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-gray-600 font-mono text-xs">
              / {project.year}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl">
            {project.shortDescription}
          </p>
        </header>

        {/* Links externos */}
        {(project.repoUrl || project.liveUrl) && (
          <div className="flex flex-wrap gap-3 mb-10">
            {project.repoUrl && (
              <Button
                variant="outline"
                className="gap-2 border-white/10"
                render={
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }>
                <SiGithub size={18} />
                Repositório
              </Button>
            )}
            {project.liveUrl && (
              <Button
                className="gap-2"
                render={
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }>
                <ArrowUpRight size={18} />
                Ver online
              </Button>
            )}
          </div>
        )}

        <Separator className="bg-white/10 mb-10" />

        {/* Descrição completa */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            <span className={accent.text}>/</span> Sobre o projeto
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {project.longDescription}
          </p>
        </section>

        {/* Destaques */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            <span className={accent.text}>/</span> Destaques
          </h2>
          <ul className="space-y-3">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 text-gray-300">
                <CheckCircle2
                  className={`${accent.text} shrink-0 mt-0.5`}
                  size={18}
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Stack */}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            <span className={accent.text}>/</span> Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="border-white/10 bg-white/5 font-mono">
                {tech}
              </Badge>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
