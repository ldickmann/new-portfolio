"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import { useChat } from "@ai-sdk/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Mensagem inicial de boas-vindas exibida ao abrir o chat.
 * É apenas visual (não faz parte do histórico enviado ao modelo).
 */
const WELCOME_MESSAGE =
  "Olá! Sou a IA do Lucas. Pergunte-me sobre projetos, stack ou contato.";

/**
 * Widget de chat flutuante com IA.
 *
 * Usa o hook `useChat` (Vercel AI SDK) para enviar mensagens ao endpoint
 * `/api/chat`, que responde via streaming com o modelo Gemini Flash.
 * Mantém a identidade visual cyberpunk e a animação de abrir/fechar.
 */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Hook do AI SDK: gerencia o histórico de mensagens e o envio com streaming.
  const { messages, sendMessage, status } = useChat();

  // Indica se o modelo está processando/transmitindo uma resposta.
  const isLoading = status === "submitted" || status === "streaming";

  // Auto-scroll para a última mensagem sempre que o histórico muda.
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  /**
   * Trata o envio do formulário: dispara a mensagem ao endpoint de IA
   * e limpa o campo de entrada.
   */
  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = inputValue.trim();
    if (!text || isLoading) return;

    sendMessage({ text });
    setInputValue("");
  };

  /**
   * Extrai o texto renderizável de uma mensagem do AI SDK.
   * As mensagens são compostas por `parts`; aqui concatenamos as do tipo "text".
   */
  const getMessageText = (message: (typeof messages)[number]): string =>
    message.parts
      .filter((part) => part.type === "text")
      .map((part) => (part as { text: string }).text)
      .join("");

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* --- JANELA DO CHAT --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="pointer-events-auto w-[320px] md:w-95 h-125 bg-cyber-black/95 border border-cyber-cyan/30 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col overflow-hidden mb-4">
            {/* Header */}
            <div className="p-4 bg-cyber-cyan/10 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-sm text-cyber-cyan font-bold">
                  LuksAI v1.0
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Fechar chat">
                <X size={18} />
              </button>
            </div>

            {/* Área de Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyber-cyan/20 scrollbar-track-transparent">
              {/* Mensagem de boas-vindas (estática) */}
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-2xl text-sm bg-white/10 text-gray-200 rounded-tl-none border border-white/5">
                  {WELCOME_MESSAGE}
                </div>
              </div>

              {/* Histórico de conversa */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-cyber-cyan text-black rounded-tr-none font-medium"
                        : "bg-white/10 text-gray-200 rounded-tl-none border border-white/5"
                    }`}>
                    {getMessageText(msg)}
                  </div>
                </div>
              ))}

              {/* Indicador de "digitando..." enquanto o modelo responde */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-2xl bg-white/10 text-gray-400 rounded-tl-none border border-white/5">
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-white/10 bg-black/20 flex gap-2">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Digite sua mensagem..."
                disabled={isLoading}
                className="flex-1 h-10 rounded-xl border-white/10 bg-white/5 text-sm text-white focus-visible:border-cyber-cyan/50"
              />
              <Button
                type="submit"
                size="icon"
                className="size-10 rounded-xl"
                disabled={!inputValue.trim() || isLoading}>
                <Send size={18} />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- BOTÃO FLUTUANTE --- */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto p-4 bg-cyber-cyan text-black rounded-full shadow-lg shadow-cyber-cyan/20 hover:shadow-cyber-cyan/40 transition-shadow relative group">
        <div className="absolute inset-0 rounded-full border border-white/20" />
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}

        {/* Notificação se fechado */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
