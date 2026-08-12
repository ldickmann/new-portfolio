# Arquitetura

> **Status:** ✅ implementado — descreve o código como ele é hoje.

## Stack

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework | Next.js (App Router) | `^16.2.6` |
| UI | React | `19.2.6` |
| Linguagem | TypeScript (`strict: true`) | `^6` |
| Estilo | Tailwind CSS | `^4` |
| Componentes | shadcn (`style: base-nova`) sobre `@base-ui/react` | `^4.8.3` |
| Animação | Framer Motion | `^12.40.0` |
| IA do chat | `@google/generative-ai` (Gemini) | `^0.24.1` |
| Hospedagem | Vercel | — |

Não há `tailwind.config.*`: o Tailwind v4 é configurado inteiramente dentro de
`src/app/globals.css`, via `@theme`, `@utility` e `@custom-variant`.

## Estrutura

```
src/
├── app/
│   ├── layout.tsx              # metadata, fontes, JSON-LD, <html lang="pt-br" class="dark">
│   ├── page.tsx                # home: monta todas as seções em ordem
│   ├── globals.css             # TODO o estilo global e os design tokens
│   ├── api/chat/route.ts       # POST — handler do chat LuksAI (Gemini)
│   ├── api/contact/route.ts    # POST — formulário de contato (Web3Forms)
│   └── projects/[slug]/page.tsx # detalhe de projeto (SSG + generateMetadata)
├── components/
│   ├── NavBar.tsx              # header fixo, links âncora, menu mobile
│   ├── HeroComponent.tsx       # primeira dobra
│   ├── AboutSection.tsx        # #sobre
│   ├── ProjectsBento.tsx       # #projetos — bento grid
│   ├── SkillsSection.tsx       # #skills
│   ├── ContactSection.tsx      # #contato
│   ├── ChatWidget.tsx          # widget flutuante do LuksAI
│   └── ui/                     # primitivos shadcn (não editar à mão)
├── data/
│   ├── projects.ts             # catálogo de projetos — fonte única de verdade
│   └── skills.ts               # categorias de skills
└── lib/
    ├── accent.ts               # ACCENT_CLASSES — mapa de acento da marca
    ├── contact-schema.ts       # schema zod do contato (cliente + servidor)
    ├── site-url.ts             # URL canônica validada contra hosts permitidos
    └── utils.ts                # cn() — clsx + tailwind-merge
```

## Fluxo de dados

**Conteúdo dos projetos.** `src/data/projects.ts` exporta a interface `Project`, o array
`projects` e o helper `getProjectBySlug()`. É consumido por dois lugares:

```
src/data/projects.ts
   ├──> ProjectsBento.tsx        (cards da home)
   └──> projects/[slug]/page.tsx (detalhe + generateStaticParams + generateMetadata)
```

Adicionar um projeto ao array cria a rota estática correspondente automaticamente, via
`generateStaticParams()`. Ver [CONTENT.md](./CONTENT.md).

**Chat.** O `ChatWidget` é um client component com estado local (`useState`). Ele faz
`POST /api/chat` com `{ message }`, e o route handler chama o Gemini com um
`systemInstruction` definido no servidor.

```
ChatWidget.tsx  --POST { message }-->  api/chat/route.ts  -->  Google Gemini
```

O system prompt vive **apenas no servidor** — não é exposto ao cliente. Em compensação,
só a última mensagem é enviada: **não há histórico de conversa**.

## Decisões que valem conhecer

**App Router com Server Components por padrão.** Só o que precisa de interatividade é
marcado `"use client"` — hoje isso inclui todas as seções da home, porque usam Framer
Motion. A página de detalhe de projeto é Server Component puro e gerada estaticamente.

**Tema escuro fixo.** O `<html>` recebe `className="dark"` sem alternância. Não há
seletor de tema, e a paleta de `:root` e `.dark` é idêntica de propósito. A dependência
`next-themes` está instalada mas não é usada.

**Sem testes automatizados.** Não há jest, vitest, playwright ou cypress no projeto. A
verificação hoje é `npm run build` e conferência manual.

## Dependências instaladas e não utilizadas

Vale saber que existem antes de instalar algo equivalente:

| Pacote | Situação |
|---|---|
| `ai`, `@ai-sdk/react`, `@ai-sdk/google` | Instalados; o chat usa `@google/generative-ai` direto |
| `next-themes` | Instalado; o tema é fixo |
