import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * URL base do site, usada para resolver URLs absolutas (Open Graph, etc.).
 * Em produção, defina NEXT_PUBLIC_SITE_URL no ambiente.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lucasdickmann.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lucas Dickmann | Software Engineer & AI",
    template: "%s | Lucas Dickmann",
  },
  description:
    "Portfólio de Engenharia de Software e Especialista em IA - Formando UNIVALI 2026",
  keywords: [
    "Lucas Dickmann",
    "desenvolvedor full stack",
    "engenheiro de software",
    "inteligência artificial",
    "Next.js",
    "TypeScript",
    "LangChain",
    "portfólio",
  ],
  authors: [{ name: "Lucas Dickmann" }],
  creator: "Lucas Dickmann",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Lucas Dickmann",
    title: "Lucas Dickmann | Software Engineer & AI",
    description:
      "Portfólio de Engenharia de Software e Especialista em IA - Formando UNIVALI 2026",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas Dickmann | Software Engineer & AI",
    description:
      "Portfólio de Engenharia de Software e Especialista em IA - Formando UNIVALI 2026",
  },
};

/**
 * Dados estruturados (JSON-LD) do tipo Person, para enriquecer o SEO
 * e permitir que buscadores entendam o autor do portfólio.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lucas Dickmann",
  url: siteUrl,
  jobTitle: "Software & AI Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidade do Vale do Itajaí (UNIVALI)",
  },
  knowsAbout: [
    "Next.js",
    "TypeScript",
    "React",
    "Python",
    "Inteligência Artificial",
    "LangChain",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // `dark` fixo: o portfólio usa exclusivamente o tema cyberpunk escuro,
    // garantindo que as CSS variables `.dark` do Shadcn sejam aplicadas.
    <html
      lang="pt-br"
      className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-cyber-black`}>
        {/* Dados estruturados Person (JSON-LD) para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        {/* Container global de notificações (toasts) */}
        <Toaster />
      </body>
    </html>
  );
}
