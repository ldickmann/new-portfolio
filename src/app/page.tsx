import HeroComponent from "@/components/HeroComponent";
import ProjectsBento from "@/components/ProjectsBento";

export default function Home() {
  return (
    <main className="min-h-screen bg-cyber-black selection:bg-cyber-cyan selection:text-black">
      <HeroComponent />
      <ProjectsBento />

      {/* Footer minimalista para fechar */}
      <footer className="py-8 text-center text-gray-600 font-mono text-xs border-t border-white/5">
        <p>LUCAS DICKMANN © 2026 • SYSTEM SECURE</p>
      </footer>
    </main>
  );
}
