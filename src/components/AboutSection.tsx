"use client";

import { motion } from "framer-motion";
import { Terminal, MapPin, GraduationCap } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

/**
 * Seção "Sobre Mim".
 *
 * Apresenta uma bio resumida, avatar com iniciais (placeholder até existir
 * uma foto), localização e formação. Mantém a identidade cyberpunk com
 * acentos neon e tipografia mono.
 */
export default function AboutSection() {
  return (
    <section
      id="sobre"
      className="py-24 relative z-10 container mx-auto px-6 scroll-mt-20">
      {/* Cabeçalho da seção */}
      <div className="mb-12 border-b border-white/10 pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-cyber-cyan">
          {"// quem sou eu"}
        </span>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-white">
          Sobre mim
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Coluna do avatar e dados rápidos */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1">
          <Card className="rounded-2xl border-white/10 bg-white/5 p-8 flex flex-col items-center text-center gap-4">
            <Avatar className="size-28 border-2 border-cyber-cyan/40">
              <AvatarFallback className="bg-cyber-cyan/10 text-cyber-cyan text-3xl font-bold">
                LD
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold text-white">Lucas Dickmann</h3>
              <p className="text-cyber-cyan text-sm font-mono">
                Software & AI Engineer
              </p>
            </div>

            <Separator className="bg-white/10" />

            <div className="w-full space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-3">
                <MapPin
                  className="text-cyber-purple shrink-0"
                  size={16}
                />
                <span>Santa Catarina, Brasil</span>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap
                  className="text-cyber-purple shrink-0"
                  size={16}
                />
                <span>UNIVALI — ADS (2026)</span>
              </div>
              <div className="flex items-center gap-3">
                <Terminal
                  className="text-cyber-purple shrink-0"
                  size={16}
                />
                <span>1+ ano de experiência Full Stack</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Coluna da bio textual */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="lg:col-span-2 space-y-5 text-gray-300 leading-relaxed">
          <p className="text-lg">
            Sou desenvolvedor de software com foco em{" "}
            <strong className="text-white">Inteligência Artificial</strong> e
            engenharia de prompts. Gosto de transformar problemas complexos em
            soluções elegantes — sejam{" "}
            <strong className="text-cyber-cyan">agentes autônomos</strong>,
            arquiteturas escaláveis ou interfaces de alto impacto.
          </p>
          <p className="text-gray-300">
            Minha jornada combina desenvolvimento full stack moderno (Next.js,
            TypeScript, Node.js) com a construção de sistemas baseados em LLMs.
            Tenho experiência prática em projetos reais de e-commerce headless,
            ecossistemas de agentes de IA e aplicações voltadas à saúde pública.
          </p>
          <p className="text-gray-300">
            Estou sempre em busca de novos desafios técnicos e oportunidades de
            colaborar em produtos que unam{" "}
            <strong className="text-cyber-purple">
              boa engenharia e inovação
            </strong>
            .
          </p>

          {/* Métricas rápidas para reforçar credibilidade */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { value: "3+", label: "Projetos reais" },
              { value: "1+", label: "Ano full stack" },
              { value: "∞", label: "Vontade de aprender" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <div className="text-2xl font-bold text-cyber-cyan font-display">
                  {item.value}
                </div>
                <div className="mt-1 text-xs text-gray-400 font-mono">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
