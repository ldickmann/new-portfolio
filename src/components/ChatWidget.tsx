"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

// --- TIPO DAS MENSAGENS ---
type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
};

// --- CÉREBRO SIMPLES DO BOT (Base de Conhecimento) ---
const simpleResponseLogic = (input: string): string => {
  const lowerInput = input.toLowerCase();

  if (
    lowerInput.includes("contato") ||
    lowerInput.includes("email") ||
    lowerInput.includes("falar")
  )
    return "Você pode me contatar pelo email: ldickmann12@gmail.com ou pelo LinkedIn!";

  if (lowerInput.includes("projetos") || lowerInput.includes("trabalhos"))
    return "Tenho destaque para o 'Belz Agent' (IA) e o 'Belezuura' (E-commerce). Role a página para ver os detalhes!";

  if (
    lowerInput.includes("stack") ||
    lowerInput.includes("tecnologias") ||
    lowerInput.includes("python")
  )
    return "Minha stack principal é Next.js, Python, Tailwind e LangChain. Foco em arquiteturas escaláveis.";

  if (
    lowerInput.includes("ola") ||
    lowerInput.includes("oi") ||
    lowerInput.includes("tarde")
  )
    return "Olá! Sou o assistente virtual do Lucas. Como posso ajudar você hoje?";

  if (lowerInput.includes("contratar") || lowerInput.includes("vaga"))
    return "Estou aberto a novas oportunidades para 2026! Vamos conversar?";

  return "Interessante... Posso te dar mais detalhes sobre meus 'projetos', 'stack' ou 'contato'. O que prefere?";
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Sou a IA do Lucas. Pergunte-me sobre projetos ou contato.",
      sender: "bot",
    },
  ]);

  // Auto-scroll para a última mensagem
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    // 1. Adiciona mensagem do usuário
    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
    };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");

    // 2. Simula "digitando..." e responde
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: simpleResponseLogic(newUserMsg.text),
        sender: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* --- JANELA DO CHAT --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="pointer-events-auto w-[320px] md:w-[380px] h-[500px] bg-cyber-black/95 border border-cyber-cyan/30 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col overflow-hidden mb-4">
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
                className="text-gray-400 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Área de Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyber-cyan/20 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.sender === "user"
                        ? "bg-cyber-cyan text-black rounded-tr-none font-medium"
                        : "bg-white/10 text-gray-200 rounded-tl-none border border-white/5"
                    }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-white/10 bg-black/20 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyber-cyan/50 transition-colors"
              />
              <button
                type="submit"
                className="p-2 bg-cyber-cyan text-black rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!inputValue.trim()}>
                <Send size={18} />
              </button>
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
