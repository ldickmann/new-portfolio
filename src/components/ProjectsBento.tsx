"use client";

import { motion } from "framer-motion";
import {
  Bot,
  ShoppingBag,
  Activity,
  Database,
  ArrowUpRight,
  Cpu,
} from "lucide-react";

export default function ProjectsBento() {
  return (
    <section className="py-24 relative z-10 container mx-auto px-6">
      {/* Cabeçalho da Seção */}
      <div className="mb-12 flex items-end gap-4 border-b border-white/10 pb-4">
        <h2 className="text-4xl font-bold tracking-tighter text-white">
          <span className="text-cyber-cyan">/</span> PROJETOS_SELECIONADOS
        </h2>
        <span className="text-gray-500 font-mono text-sm mb-1 hidden md:block">
          {/* // Compilando portfólio de inovação... */}
        </span>
      </div>

      {/* O BENTO GRID (Layout Mágico) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[180px]">
        {/* --- CARD 1: O PROJETO PRINCIPAL (Belz Agent) --- */}
        {/* Ocupa 2 colunas e 2 linhas (Grande destaque) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="group relative col-span-1 md:col-span-2 row-span-2 rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-cyber-cyan/50 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />

          {/* Conteúdo */}
          <div className="absolute bottom-0 left-0 p-8 z-20">
            <div className="flex items-center gap-2 text-cyber-cyan mb-2">
              <Bot size={20} />
              <span className="font-mono text-xs uppercase tracking-wider">
                AI Architecture
              </span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">Belz Agent</h3>
            <p className="text-gray-400 text-sm mb-4 max-w-sm">
              Ecossistema de múltiplos agentes autônomos para automação
              complexa. Utiliza LLMs para raciocínio em cadeia e execução de
              tarefas.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono">
                Python
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono">
                LangChain
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono">
                OpenAI API
              </span>
            </div>
          </div>

          {/* Efeito Visual de Fundo (Abstrato) */}
          <div className="absolute inset-0 bg-cyber-cyan/5 group-hover:bg-cyber-cyan/10 transition-colors duration-500" />
          <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="text-white" />
          </div>
        </motion.div>

        {/* --- CARD 2: BELEZUURA (E-commerce) --- */}
        {/* Ocupa 1 coluna e 2 linhas (Vertical) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="group relative col-span-1 row-span-2 rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-cyber-purple/50 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
          <div className="absolute bottom-0 left-0 p-6 z-20">
            <div className="flex items-center gap-2 text-cyber-purple mb-2">
              <ShoppingBag size={18} />
              <span className="font-mono text-xs uppercase tracking-wider">
                Headless Commerce
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Belezuura</h3>
            <p className="text-gray-400 text-xs mb-4">
              Plataforma de e-commerce de alta performance com Next.js e
              otimização de conversão.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-white/10 rounded-full text-[10px] font-mono">
                Next.js
              </span>
              <span className="px-2 py-1 bg-white/10 rounded-full text-[10px] font-mono">
                Stripe
              </span>
            </div>
          </div>
        </motion.div>

        {/* --- CARD 3: E-RECEITASUS (Mobile/Saúde) --- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="group relative col-span-1 rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-colors flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <Activity
              className="text-green-400"
              size={24}
            />
            <ArrowUpRight
              className="text-gray-600 group-hover:text-white transition-colors"
              size={16}
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mt-2">E-ReceitaSUS</h3>
            <p className="text-gray-500 text-xs mt-1">
              App mobile para gestão de saúde pública.
            </p>
          </div>
        </motion.div>

        {/* --- CARD 4: TECH STACK (Visualização de Dados) --- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="col-span-1 rounded-2xl bg-cyber-cyan/5 border border-cyber-cyan/20 p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <Database
            className="text-cyber-cyan mb-2 relative z-10"
            size={32}
          />
          <h3 className="text-2xl font-bold text-white relative z-10">
            1+- Ano
          </h3>
          <p className="text-cyber-cyan text-xs font-mono uppercase relative z-10">
            Full Stack Exp.
          </p>
        </motion.div>

        {/* --- CARD 5: CURSOS/EDUCAÇÃO (Opcional, mas bom para contexto) --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="col-span-1 md:col-span-2 rounded-2xl bg-white/5 border border-white/10 p-6 flex items-center justify-between hover:border-white/30 transition-colors">
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
          <span className="hidden md:inline-flex px-3 py-1 border border-white/10 rounded-full text-xs text-gray-400">
            Em andamento
          </span>
        </motion.div>
      </div>
    </section>
  );
}
