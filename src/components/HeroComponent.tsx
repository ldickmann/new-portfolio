"use client";

import { motion } from "framer-motion";
import { Terminal, Github, Linkedin } from "lucide-react";

export default function HeroComponent() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden border-b border-white/5">
      {/* --- BACKGROUND FX --- */}
      {/* Grid definida no globals.css */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Luz ambiente (Glow) - Efeito de 'Cyberpunk' sutil */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyber-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyber-purple/5 blur-[120px] rounded-full pointer-events-none" />

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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-purple neon-glow">
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
            <button className="group relative px-8 py-4 bg-cyber-cyan text-black font-bold font-mono uppercase tracking-wider hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer">
              <Terminal
                size={18}
                className="group-hover:rotate-90 transition-transform"
              />
              Ver Projetos
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 mix-blend-overlay" />
            </button>

            <div className="flex gap-4">
              <a
                href="https://github.com/ldickmann"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-white/10 hover:border-cyber-cyan/50 hover:text-cyber-cyan transition-colors bg-white/5 hover:bg-cyber-cyan/5 flex items-center justify-center">
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/lucasdickmann"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-white/10 hover:border-cyber-cyan/50 hover:text-cyber-cyan transition-colors bg-white/5 hover:bg-cyber-cyan/5 flex items-center justify-center">
                <Linkedin size={20} />
              </a>
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
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyber-cyan to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
