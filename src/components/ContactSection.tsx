"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, MapPin, Terminal, Send } from "lucide-react";

// Importamos buttonVariants para estilizar os links de contato
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulação de envio (Aqui conectaremos o Formspree depois)
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Mensagem transmitida com sucesso!");
    }, 1500);
  };

  return (
    <section id="contato" className="py-24 relative z-10 container mx-auto px-6 border-t border-white/5">

      {/* Cabeçalho */}
      <div className="mb-12 flex items-end gap-4 border-b border-white/10 pb-4">
        <h2 className="text-4xl font-bold tracking-tighter text-white">
          <span className="text-cyber-cyan">/</span> INICIAR_CONEXAO
        </h2>
        <span className="text-gray-500 font-mono text-sm mb-1 hidden md:block">
          // Open to work: 2026
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Lado Esquerdo: Info e Links Diretos */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Vamos construir algo incrível.</h3>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Estou sempre aberto a discutir projetos de arquitetura de software, integrações de IA ou novas oportunidades.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-400">
              <MapPin className="text-cyber-cyan" size={20} />
              <span>Navegantes, SC - Brasil</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {/* CORREÇÃO: Usando <a> com buttonVariants em vez de <Button> */}
            <a
              href="mailto:seu-email@lucasdickmann.dev"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "justify-start gap-3 border-white/10 hover:border-cyber-cyan hover:text-cyber-cyan bg-white/5",
              })}
            >
              <Mail size={18} />
              Enviar E-mail
            </a>

            <a
              href="https://wa.me/5547999999999" // TODO: Coloque seu número real aqui
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "justify-start gap-3 border-white/10 hover:border-green-400 hover:text-green-400 bg-white/5",
              })}
            >
              <MessageSquare size={18} />
              WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Lado Direito: Formulário de Contato */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300 font-mono text-xs uppercase">Identificação</Label>
              <Input
                id="name"
                required
                placeholder="Seu nome"
                className="bg-black/50 border-white/10 focus-visible:ring-cyber-cyan text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300 font-mono text-xs uppercase">Ping (E-mail)</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="seu@email.com"
                className="bg-black/50 border-white/10 focus-visible:ring-cyber-cyan text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-300 font-mono text-xs uppercase">Payload (Mensagem)</Label>
              <Textarea
                id="message"
                required
                placeholder="Como posso ajudar no seu projeto?"
                className="bg-black/50 border-white/10 focus-visible:ring-cyber-cyan min-h-[120px] resize-none text-white"
              />
            </div>

            {/* O botão de submit funciona perfeitamente pois gera a tag nativa <button> */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-cyber-cyan text-black hover:bg-white transition-colors font-bold tracking-wider"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Terminal className="animate-spin" size={18} /> Transmitindo...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send size={18} /> Enviar Mensagem
                </span>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
