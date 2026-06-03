"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Cpu } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { projects } from "@/data/projects";

/**
 * Mapa de classes de acento por cor do tema cyberpunk.
 * Centraliza as variações de cor para texto e borda usadas nos cards.
 */
const ACCENT_CLASSES = {
  cyan: {
    text: "text-cyber-cyan",
    hoverBorder: "hover:border-cyber-cyan/50",
  },
  purple: {
    text: "text-cyber-purple",
    hoverBorder: "hover:border-cyber-purple/50",
  },
  green: {
    text: "text-green-400",
    hoverBorder: "hover:border-green-400/50",
  },
} as const;

export default function ProjectsBento() {
  // Desestrutura os três projetos principais para posicioná-los no grid.
  const [belzAgent, belezuura, eReceitaSus] = projects;

  return (
    <section
      id="projetos"
      className="py-24 relative z-10 container mx-auto px-6 scroll-mt-20">
      {/* Cabeçalho da Seção */}
      <div className="mb-12 flex items-end gap-4 border-b border-white/10 pb-4">
        <h2 className="text-4xl font-bold tracking-tighter text-white">
          <span className="text-cyber-cyan">/</span> PROJETOS_SELECIONADOS
        </h2>
      </div>

      {/* O BENTO GRID (Layout Mágico) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]">
        {/* --- CARD 1: O PROJETO PRINCIPAL (Belz Agent) --- */}
        {/* Ocupa 2 colunas e 2 linhas (Grande destaque) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 md:col-span-2 row-span-2">
          <Card
            className={`group relative h-full w-full overflow-hidden rounded-2xl border-white/10 bg-white/5 p-0 transition-colors ${ACCENT_CLASSES[belzAgent.accent].hoverBorder}`}>
            <Link
              href={`/projects/${belzAgent.slug}`}
              className="absolute inset-0 z-30"
              aria-label={`Ver detalhes de ${belzAgent.title}`}
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/90 z-10" />

            {/* Conteúdo */}
            <div className="absolute bottom-0 left-0 p-8 z-20">
              <div
                className={`flex items-center gap-2 mb-2 ${ACCENT_CLASSES[belzAgent.accent].text}`}>
                <belzAgent.icon size={20} />
                <span className="font-mono text-xs uppercase tracking-wider">
                  {belzAgent.category}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {belzAgent.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 max-w-sm">
                {belzAgent.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2">
                {belzAgent.stack.slice(0, 3).map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="border-white/10 bg-white/10 font-mono">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Efeito Visual de Fundo (Abstrato) */}
            <div className="absolute inset-0 bg-cyber-cyan/5 group-hover:bg-cyber-cyan/10 transition-colors duration-500" />
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="text-white" />
            </div>
          </Card>
        </motion.div>

        {/* --- CARD 2: BELEZUURA (E-commerce) --- */}
        {/* Ocupa 1 coluna e 2 linhas (Vertical) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="col-span-1 row-span-2">
          <Card
            className={`group relative h-full w-full overflow-hidden rounded-2xl border-white/10 bg-white/5 p-0 transition-colors ${ACCENT_CLASSES[belezuura.accent].hoverBorder}`}>
            <Link
              href={`/projects/${belezuura.slug}`}
              className="absolute inset-0 z-30"
              aria-label={`Ver detalhes de ${belezuura.title}`}
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/90 z-10" />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <div
                className={`flex items-center gap-2 mb-2 ${ACCENT_CLASSES[belezuura.accent].text}`}>
                <belezuura.icon size={18} />
                <span className="font-mono text-xs uppercase tracking-wider">
                  {belezuura.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {belezuura.title}
              </h3>
              <p className="text-gray-400 text-xs mb-4">
                {belezuura.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2">
                {belezuura.stack.slice(0, 2).map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="border-white/10 bg-white/10 font-mono text-[10px]">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* --- CARD 3: E-RECEITASUS (Mobile/Saúde) --- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="col-span-1">
          <Card className="group relative h-full w-full flex flex-col justify-between rounded-2xl border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10">
            <Link
              href={`/projects/${eReceitaSus.slug}`}
              className="absolute inset-0 z-10"
              aria-label={`Ver detalhes de ${eReceitaSus.title}`}
            />
            <div className="flex justify-between items-start">
              <eReceitaSus.icon
                className={ACCENT_CLASSES[eReceitaSus.accent].text}
                size={24}
              />
              <ArrowUpRight
                className="text-gray-600 group-hover:text-white transition-colors"
                size={16}
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mt-2">
                {eReceitaSus.title}
              </h3>
              <p className="text-gray-500 text-xs mt-1">
                {eReceitaSus.shortDescription}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* --- CARD 4: EXPERIÊNCIA (Visualização de Dados) --- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="col-span-1">
          <Card className="h-full w-full flex flex-col justify-center items-center text-center relative overflow-hidden rounded-2xl border-cyber-cyan/20 bg-cyber-cyan/5 p-6">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <Cpu
              className="text-cyber-cyan mb-2 relative z-10"
              size={32}
            />
            <h3 className="text-2xl font-bold text-white relative z-10">
              1+ Ano
            </h3>
            <p className="text-cyber-cyan text-xs font-mono uppercase relative z-10">
              Full Stack Exp.
            </p>
          </Card>
        </motion.div>

        {/* --- CARD 5: EDUCAÇÃO --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="col-span-1 md:col-span-2">
          <Card className="h-full w-full flex items-center justify-between rounded-2xl border-white/10 bg-white/5 p-6 transition-colors hover:border-white/30">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-cyber-purple/10 rounded-lg text-cyber-purple">
                <Cpu size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold">
                  Univali | Universidade do Vale do Itajaí
                </h3>
                <p className="text-gray-500 text-sm">
                  Graduação em Análise e Desenvolvimento de Sistemas (2026)
                </p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="hidden md:inline-flex border-white/10 text-gray-400">
              Em andamento
            </Badge>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
