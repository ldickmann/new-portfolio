"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, MessageSquare, MapPin, Terminal, Send } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";

/** Contatos diretos. Alterar aqui reflete nos dois botões. */
const EMAIL = "ldickmann12@gmail.com";
const WHATSAPP_URL = "https://wa.me/5547988420692";

export default function ContactSection() {
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", website: "" },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: ContactInput) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data: { error?: string } = await response.json().catch(() => ({}));

      if (!response.ok) {
        toast.error(
          data.error ?? "Não consegui enviar sua mensagem. Tente novamente."
        );
        return;
      }

      toast.success("Mensagem transmitida. Respondo em breve!");
      form.reset();
    } catch {
      toast.error(
        `Falha de conexão. Se persistir, me chame em ${EMAIL} ou no WhatsApp.`
      );
    }
  };

  return (
    <section
      id="contato"
      className="py-24 relative z-10 container mx-auto px-6 border-t border-white/5">
      {/* Cabeçalho */}
      <div className="mb-12 flex items-end gap-4 border-b border-white/10 pb-4">
        <h2 className="text-4xl font-bold tracking-tighter text-white">
          <span className="text-dlk-lime">/</span> INICIAR_CONEXAO
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
          className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Vamos construir algo incrível.
            </h3>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Estou sempre aberto a discutir projetos de arquitetura de
              software, integrações de IA ou novas oportunidades.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-400">
              <MapPin
                className="text-dlk-lime"
                size={20}
              />
              <span>Navegantes, SC - Brasil</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {/* <a> com buttonVariants em vez de <Button>: preserva a semântica de link */}
            <a
              href={`mailto:${EMAIL}`}
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "justify-start gap-3 border-white/10 hover:border-dlk-lime hover:text-dlk-lime bg-white/5",
              })}>
              <Mail size={18} />
              Enviar E-mail
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "justify-start gap-3 border-white/10 hover:border-dlk-lime hover:text-dlk-lime bg-white/5",
              })}>
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
          className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
              className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 font-mono text-xs uppercase">
                      Identificação
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Seu nome"
                        autoComplete="name"
                        className="bg-black/50 border-white/10 focus-visible:ring-dlk-lime text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 font-mono text-xs uppercase">
                      Ping (E-mail)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="seu@email.com"
                        autoComplete="email"
                        className="bg-black/50 border-white/10 focus-visible:ring-dlk-lime text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300 font-mono text-xs uppercase">
                      Payload (Mensagem)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Como posso ajudar no seu projeto?"
                        className="bg-black/50 border-white/10 focus-visible:ring-dlk-lime min-h-[120px] resize-none text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*
                Honeypot anti-spam. Fora da tela e fora da ordem de tabulação,
                com aria-hidden para que leitores de tela também o ignorem —
                usar `sr-only` aqui seria pior, pois exporia o campo a quem
                navega por leitor de tela.
              */}
              <div
                aria-hidden="true"
                className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
                <input
                  {...form.register("website")}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-dlk-lime text-black hover:bg-white transition-colors font-bold tracking-wider">
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Terminal
                      className="animate-spin"
                      size={18}
                    />{" "}
                    Transmitindo...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send size={18} /> Enviar Mensagem
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}
