"use client";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { skillCategories } from "@/data/skills";

/**
 * Mapa de classes de acento por cor, para texto e fundo dos ícones.
 */
const ACCENT_CLASSES = {
  cyan: {
    text: "text-cyber-cyan",
    iconBg: "bg-cyber-cyan/10 text-cyber-cyan",
  },
  purple: {
    text: "text-cyber-purple",
    iconBg: "bg-cyber-purple/10 text-cyber-purple",
  },
} as const;

/**
 * Seção "Skills".
 *
 * Renderiza uma grade de cards, um por categoria técnica, com as tecnologias
 * exibidas como `Badge`. Os dados vêm de `@/data/skills`.
 */
export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-24 relative z-10 container mx-auto px-6 scroll-mt-20">
      {/* Cabeçalho da seção */}
      <div className="mb-12 border-b border-white/10 pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-cyber-cyan">
          {"// ferramentas que domino"}
        </span>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-white">
          Stack &amp; skills
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => {
          const accent = ACCENT_CLASSES[category.accent];

          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}>
              <Card className="h-full rounded-2xl border-white/10 bg-white/5 p-6 transition-colors hover:border-white/30">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-lg ${accent.iconBg}`}>
                    <category.icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="border-white/10 bg-white/5 font-mono text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
