/**
 * Mapa de classes de acento da marca.
 *
 * Fonte única consumida pelo bento da home (`ProjectsBento`), pelas páginas
 * de detalhe (`/projects/[slug]`) e pela seção de skills. Antes deste módulo
 * o mapa estava duplicado em três lugares, com variações entre eles.
 *
 * As strings precisam ser literais completas para que o Tailwind as detecte
 * na varredura — não montar nome de classe por concatenação.
 *
 * Ver docs/DESIGN-SYSTEM.md e docs/adr/0004-limao-como-acento-primario.md.
 */

/**
 * Acentos disponíveis, em ordem de prioridade na marca.
 *
 * - `lime`: cor da marca. Reservada ao que representa o carro-chefe.
 * - `purple`: secundário.
 * - `cyan`: terciário. Não usar como acento global — só para diferenciar
 *   um item dentro de um conjunto.
 */
export type Accent = "lime" | "purple" | "cyan";

export interface AccentClasses {
  /** Cor de texto e de ícone. */
  text: string;
  /** Fundo tênue + cor de ícone, para o "selo" circular/quadrado. */
  iconBg: string;
  /** Borda revelada no hover de um card. */
  hoverBorder: string;
}

export const ACCENT_CLASSES: Record<Accent, AccentClasses> = {
  lime: {
    text: "text-dlk-lime",
    iconBg: "bg-dlk-lime/10 text-dlk-lime",
    hoverBorder: "hover:border-dlk-lime/50",
  },
  purple: {
    text: "text-dlk-purple",
    iconBg: "bg-dlk-purple/10 text-dlk-purple",
    hoverBorder: "hover:border-dlk-purple/50",
  },
  cyan: {
    text: "text-dlk-cyan",
    iconBg: "bg-dlk-cyan/10 text-dlk-cyan",
    hoverBorder: "hover:border-dlk-cyan/50",
  },
};
