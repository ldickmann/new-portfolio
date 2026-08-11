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
 * URL base do site, usada para resolver URLs absolutas (Open Graph, canonical,
 * JSON-LD). Em produção, defina NEXT_PUBLIC_SITE_URL no ambiente.
 *
 * O fallback precisa ser um endereço que realmente responda: enquanto ele
 * apontou para um domínio não registrado, a produção publicou um `og:url`
 * quebrado para todo link compartilhado.
 *
 * Trocar de domínio no futuro é trocar só a variável de ambiente.
 * Ver docs/adr/0001-manter-url-vercel.md.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://new-portfolio-mu-sandy.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lucas Elias Dickmann | Software Engineer & AI",
    template: "%s | Lucas Elias Dickmann",
  },
  description:
    "Portfólio de Engenharia de Software e Especialista em IA - Formando UNIVALI 2026",
  keywords: [
    "Lucas Elias Dickmann",
    "desenvolvedor full stack",
    "engenheiro de software",
    "inteligência artificial",
    "Next.js",
    "TypeScript",
    "LangChain",
    "portfólio",
  ],
  authors: [{ name: "Lucas Elias Dickmann" }],
  creator: "Lucas Elias Dickmann",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Lucas Elias Dickmann",
    title: "Lucas Elias Dickmann | Software Engineer & AI",
    description:
      "Portfólio de Engenharia de Software e Especialista em IA - Formando UNIVALI 2026",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas Elias Dickmann | Software Engineer & AI",
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
  name: "Lucas Elias Dickmann",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dlk-black`}>
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
