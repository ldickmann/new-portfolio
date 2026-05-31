"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Mail, Loader2 } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

/**
 * Schema de validação do formulário de contato (zod).
 * Define regras e mensagens de erro em PT-BR.
 */
const contactSchema = z.object({
  name: z.string().min(2, "Informe seu nome (mín. 2 caracteres)."),
  email: z.string().email("Informe um e-mail válido."),
  message: z.string().min(10, "A mensagem deve ter ao menos 10 caracteres."),
});

/** Tipagem inferida do schema, usada pelo react-hook-form. */
type ContactFormValues = z.infer<typeof contactSchema>;

/** E-mail de destino para o fallback via mailto. */
const CONTACT_EMAIL = "contato@lucasdickmann.dev";

/**
 * Seção "Contato".
 *
 * Formulário validado com react-hook-form + zod. No submit, abre o cliente
 * de e-mail do usuário (mailto) com os dados preenchidos e exibe um toast de
 * confirmação. Inclui também links diretos para redes sociais.
 */
export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  /**
   * Trata o envio do formulário.
   * Monta um link mailto com assunto/corpo e dispara a abertura do cliente
   * de e-mail, dando feedback visual via toast.
   */
  function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);

    const subject = encodeURIComponent(
      `Contato pelo portfólio — ${values.name}`,
    );
    const body = encodeURIComponent(
      `Nome: ${values.name}\nE-mail: ${values.email}\n\n${values.message}`,
    );

    // window.open abre o cliente de e-mail sem reatribuir window.location
    window.open(
      `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`,
      "_self",
    );

    toast.success("Tudo certo!", {
      description: "Seu cliente de e-mail foi aberto para envio da mensagem.",
    });

    form.reset();
    setIsSubmitting(false);
  }

  return (
    <section
      id="contato"
      className="py-24 relative z-10 container mx-auto px-6 scroll-mt-20">
      {/* Cabeçalho da seção */}
      <div className="mb-12 border-b border-white/10 pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-cyber-cyan">
          {"// vamos construir algo juntos"}
        </span>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-white">
          Vamos conversar
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Texto e redes sociais */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 space-y-6">
          <p className="text-gray-300 text-lg leading-relaxed">
            Tem um projeto, uma ideia ou uma oportunidade? Ficarei feliz em
            conversar. Preencha o formulário ou me encontre nas redes.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              nativeButton={false}
              className="justify-start gap-3 border-white/10"
              render={
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  aria-label="Enviar e-mail"
                />
              }>
              <Mail
                size={18}
                className="text-cyber-cyan"
              />
              {CONTACT_EMAIL}
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              className="justify-start gap-3 border-white/10"
              render={
                <a
                  href="https://github.com/lucasdickmann"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                />
              }>
              <SiGithub
                size={18}
                className="text-cyber-cyan"
              />
              GitHub
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              className="justify-start gap-3 border-white/10"
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
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="text-cyber-cyan">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </Button>
          </div>
        </motion.div>

        {/* Formulário */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="lg:col-span-3">
          <Card className="rounded-2xl border-white/10 bg-white/5 p-6 md:p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Nome</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Seu nome"
                          className="border-white/10 bg-white/5 text-white"
                          {...field}
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
                      <FormLabel className="text-gray-300">E-mail</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="voce@email.com"
                          className="border-white/10 bg-white/5 text-white"
                          {...field}
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
                      <FormLabel className="text-gray-300">Mensagem</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Conte sobre seu projeto ou ideia..."
                          rows={5}
                          className="border-white/10 bg-white/5 text-white resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2"
                  disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                  ) : (
                    <Send size={18} />
                  )}
                  Enviar mensagem
                </Button>
              </form>
            </Form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
