# Conteúdo — onde editar cada texto

> **Status:** ✅ implementado — mapeia o código como ele é hoje.

## Mapa rápido

| O que você quer mudar | Onde |
|---|---|
| Projetos (título, descrição, stack, destaques, links) | `src/data/projects.ts` |
| Skills (categorias e tecnologias) | `src/data/skills.ts` |
| O que o chat LuksAI sabe sobre você | `src/app/api/chat/route.ts` → const `systemPrompt` |
| Título e descrição do site (SEO) | `src/app/layout.tsx` → `metadata` |
| Dados estruturados (Google) | `src/app/layout.tsx` → `personJsonLd` |
| Bio do "Sobre" | `src/components/AboutSection.tsx` (texto no JSX) |
| Títulos de seção, CTAs, rodapé | nos respectivos componentes em `src/components/` |
| Dados de contato | `src/components/ContactSection.tsx` |

## Projetos — a fonte única de verdade

`src/data/projects.ts` alimenta **os dois lugares** onde um projeto aparece: o bento da
home e a página de detalhe. Nunca edite o texto de um projeto direto no JSX.

Para adicionar um projeto, basta acrescentar um objeto ao array `projects`. A rota
`/projects/<slug>` é criada automaticamente pelo `generateStaticParams()`.

```ts
{
  slug: "meu-projeto",        // vira a URL
  title: "Meu Projeto",
  category: "Front-end",      // rótulo curto no card
  shortDescription: "...",    // card do bento + description do SEO
  longDescription: "...",     // página de detalhe
  stack: ["Next.js", "..."],
  highlights: ["...", "..."],
  icon: Bot,                  // um ícone do lucide-react
  accent: "cyan",             // ver observação abaixo
  year: "2026",
  repoUrl: "...",             // opcional
  liveUrl: "...",             // opcional
}
```

⚠️ **Duas limitações conhecidas:**

1. **O bento posiciona por índice.** `ProjectsBento.tsx` faz
   `const [belzAgent, belezuura, eReceitaSus] = projects` — o layout de cada card está
   amarrado à posição no array. Acrescentar um quarto projeto exige refatorar o
   componente antes.
2. **O campo `accent` é um union fechado.** Hoje `"cyan" | "purple" | "green"` em
   `projects.ts` e `"cyan" | "purple"` em `skills.ts`. Uma cor nova exige alterar o tipo
   e o mapa `ACCENT_CLASSES` — que está **duplicado** em `ProjectsBento.tsx` e em
   `projects/[slug]/page.tsx`.

## O system prompt é conteúdo, não código

O `systemPrompt` em `src/app/api/chat/route.ts` contém a biografia completa: formação,
experiência, projetos e dados de contato. É o que o LuksAI responde a um visitante.

Trate-o como conteúdo editorial. **Ele é uma fonte de verdade paralela ao resto do site,
e é onde as inconsistências nascem.**

### ⚠️ Inconsistência ativa: data de formatura

O mesmo fato aparece de três formas diferentes no repositório:

| Local | O que diz |
|---|---|
| `src/app/layout.tsx` (`description`) | "Formando UNIVALI 2026" |
| `src/app/api/chat/route.ts` (`systemPrompt`) | "meados de 2026 (Julho/Agosto)" |
| `src/components/ProjectsBento.tsx` (card de educação) | "(2026)" |

**O valor correto é dezembro de 2026.** Um recrutador cruza essas informações. Correção
prevista no backlog.

Há também um dado de experiência que só existe no system prompt e nunca aparece na tela:
os 9 anos como Despachante Imobiliário, com 500+ processos e 40% de redução de tempo
operacional.

## Regra ao editar conteúdo

Um mesmo fato não pode ter duas redações no repositório. Antes de mudar biografia, data
ou número, procure o valor antigo em todo o projeto:

```bash
rg "2026" src/
```

E registre a mudança no [CHANGELOG.md](./CHANGELOG.md).
