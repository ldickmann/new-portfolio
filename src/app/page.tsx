import NavBar from "@/components/NavBar";
import HeroComponent from "@/components/HeroComponent";
import AboutSection from "@/components/AboutSection";
import ProjectsBento from "@/components/ProjectsBento";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import ChatWidget from "@/components/ChatWidget";

/**
 * Página inicial (home) do portfólio.
 *
 * Compõe, na ordem de leitura, a navegação fixa e todas as seções:
 * Hero → Sobre → Projetos → Skills → Contato. O `ChatWidget` flutua sobre
 * todo o conteúdo.
 */
export default function Home() {
  return (
    <main
      id="top"
      className="min-h-screen bg-cyber-black selection:bg-cyber-cyan selection:text-black">
      {/* Navegação fixa no topo */}
      <NavBar />

      {/* Seções da página */}
      <HeroComponent />
      <AboutSection />
      <ProjectsBento />
      <SkillsSection />
      <ContactSection />

      {/* Componente Flutuante do Chat */}
      <ChatWidget />

      {/* Footer minimalista para fechar */}
      <footer className="py-8 text-center text-gray-600 font-mono text-xs border-t border-white/5">
        <p>Lucas E. Dickmann © 2026 • Systems</p>
      </footer>
    </main>
  );
}
