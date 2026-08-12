---
paths:
  - "src/app/globals.css"
  - "src/components/**/*.tsx"
  - "src/lib/accent.ts"
---

# UI e design system

## Tokens `--dlk-` em duas camadas

Todo estilo vive em `src/app/globals.css`. A arquitetura de duas camadas não é estética,
é obrigatória:

```css
:root { --dlk-color-lime: #b5e83a; }                        /* Camada 1: primitiva */
@theme inline { --color-dlk-lime: var(--dlk-color-lime); }  /* Camada 2: ponte */
```

No Tailwind v4, `@theme` só gera utilitários a partir de namespaces que ele reconhece
(`--color-*`, `--radius-*`, `--font-*`, `--spacing-*`). Uma variável `--dlk-lime` **não**
geraria `text-dlk-lime`. Tokens sem namespace correspondente (duração, easing, tamanho de
grid) ficam só na Camada 1 e são consumidos via `var()`.

Os tokens do shadcn (`--background`, `--primary`, `--ring`…) não guardam hex: apontam para
`var(--dlk-*)`. Há um único bloco `:root` — a duplicação `:root`/`.dark` foi removida, já
que o site é sempre escuro (`<html class="dark">` fixo, sem alternância).

## Acento

Primário é o **verde-limão da marca** (`--dlk-color-lime`); roxo é secundário e ciano é
terciário, restrito a acento de projeto.

`src/lib/accent.ts` é a fonte única do mapa `ACCENT_CLASSES` — as strings precisam ser
literais completas para o Tailwind detectá-las na varredura. Concatenar classe em tempo de
execução some da build.

Ver `docs/DESIGN-SYSTEM.md` e ADRs `0003`/`0004`.

## Componentes shadcn sobre `@base-ui/react`

Os primitivos em `src/components/ui/` são shadcn no estilo `base-nova`, sobre
`@base-ui/react` — **não Radix**. Duas consequências práticas:

- `ui/form.tsx` injeta os atributos ARIA via `React.cloneElement`, não via `Slot`.
- `<Button render={<a/>}>` sem `nativeButton={false}` gera erro de semântica no console.
