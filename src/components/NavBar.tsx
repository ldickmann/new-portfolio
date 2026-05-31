"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Itens de navegação por âncora.
 * Cada `href` aponta para o `id` de uma seção da home.
 */
const NAV_LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  { label: "Skills", href: "#skills" },
  { label: "Contato", href: "#contato" },
] as const;

/**
 * Barra de navegação fixa no topo.
 *
 * Fica transparente no topo da página e ganha fundo desfocado ao rolar.
 * Em telas pequenas, exibe um menu sanfona (mobile). Usa âncoras para
 * navegar entre as seções da home.
 */
export default function NavBar() {
  // Controla o efeito de fundo ao rolar a página.
  const [scrolled, setScrolled] = useState(false);
  // Controla a abertura do menu mobile.
  const [mobileOpen, setMobileOpen] = useState(false);
  // Guarda o id da seção atualmente visível, para destacar o link ativo.
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Observa as seções da home e marca como ativa aquela que estiver
   * mais visível na viewport, permitindo destacar o link correspondente.
   */
  useEffect(() => {
    const ids = NAV_LINKS.map((link) => link.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Usa a entrada mais visível como seção ativa.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-cyber-black/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}>
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / marca */}
        <Link
          href="#top"
          className="flex items-center gap-2 font-mono font-bold text-white">
          <Terminal className="text-cyber-cyan" size={20} />
          <span>
            lucas<span className="text-cyber-cyan">.dev</span>
          </span>
        </Link>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <Button
                key={link.href}
                variant="ghost"
                size="sm"
                nativeButton={false}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "text-cyber-cyan"
                    : "text-gray-300 hover:text-cyber-cyan"
                }
                render={<Link href={link.href} />}>
                {link.label}
              </Button>
            );
          })}
        </div>

        {/* Botão do menu mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white"
          aria-label="Abrir menu"
          onClick={() => setMobileOpen((prev) => !prev)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </Button>
      </nav>

      {/* Menu mobile expandido */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-white/10 bg-cyber-black/95 backdrop-blur-md">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`py-2 transition-colors font-mono text-sm ${
                    isActive
                      ? "text-cyber-cyan"
                      : "text-gray-300 hover:text-cyber-cyan"
                  }`}>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
