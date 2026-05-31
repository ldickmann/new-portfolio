"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

import { Button } from "@/components/ui/button";

export default function HeroComponent() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden border-b border-white/5">
      {/* --- BACKGROUND FX --- */}
      {/* Grid definida no globals.css */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Luz ambiente (Glow) - Efeito de 'Cyberpunk' sutil */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-cyber-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-cyber-purple/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl">
          {/* Badge de Status do Sistema */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 text-cyber-cyan font-mono text-xs tracking-widest uppercase mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan"></span>
            </span>
            System Online • v2026.1
          </div>

          {/* Headline Principal */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[0.9]">
            LUCAS <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyber-cyan to-cyber-purple neon-glow">
              DICKMANN
            </span>
          </h1>

          {/* Subtítulo Técnico */}
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10 border-l-2 border-cyber-purple/50 pl-6">
            Desenvolvedor de Software, com foco em desenvolvimento de IA e
            Engenheiro de Prompt. <br />
            Transformo problemas complexos em{" "}
            <strong className="text-white">Agentes Inteligentes</strong> e
            arquiteturas escaláveis.
            <span className="block mt-2 text-sm font-mono text-gray-500">
              {/* Stack: Next.js 15 • Python • Tailwind • LLMs  */}
            </span>
          </p>

          {/* Botões de Ação (CTAs) */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* CTA principal: usa o Button do Shadcn (variante default = cyan)
                e aponta para a âncora da seção de projetos. No estilo base-nova
                a composição com outro elemento é feita via prop `render`. */}
            <Button
              size="lg"
              className="group h-14 px-8 text-base font-bold font-mono uppercase tracking-wider rounded-none"
              render={<a href="#projetos" />}>
              <Terminal
                className="group-hover:rotate-90 transition-transform"
                size={18}
              />
              Ver Projetos
            </Button>

            <div className="flex gap-4">
              <Button
                variant="outline"
                size="icon"
                className="size-14 rounded-none border-white/10 hover:border-cyber-cyan/50 hover:text-cyber-cyan"
                render={
                  <a
                    href="https://github.com/ldickmann"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  />
                }>
                <SiGithub size={20} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-14 rounded-none border-white/10 hover:border-cyber-cyan/50 hover:text-cyber-cyan"
                render={
                  <a
                    href="https://linkedin.com/in/lucasdickmann"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  />
                }>
                {/* SVG inline — LinkedIn removeu o ícone do Simple Icons */}
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-xs font-mono uppercase tracking-widest">
        <span>Scroll para explorar</span>
        <div className="w-px h-12 bg-linear-to-b from-cyber-cyan to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
