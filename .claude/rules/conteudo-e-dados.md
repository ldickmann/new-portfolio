---
paths:
  - "src/data/**/*.ts"
  - "src/app/layout.tsx"
  - "src/app/api/chat/route.ts"
  - "src/app/projects/**/*.tsx"
  - "src/components/ProjectsBento.tsx"
---

# Conteúdo e dados

## `projects.ts` é a fonte única

`src/data/projects.ts` exporta a interface `Project`, o array `projects` e o helper
`getProjectBySlug()`. É consumido pelo bento da home e pelas páginas de detalhe.

Acrescentar um objeto ao array cria a rota estática `/projects/<slug>` sozinho, via
`generateStaticParams()`. **Nunca edite texto de projeto direto no JSX.**

## Armadilha: o `ProjectsBento` posiciona os cards por índice

`src/components/ProjectsBento.tsx` faz `const [belzAgent, belezuura, eReceitaSus] = projects`.
O layout de cada card está amarrado à **posição no array**. Acrescentar um quarto projeto
exige refatorar o componente antes — não basta editar os dados.

## A biografia mora em três lugares e diverge

O mesmo texto biográfico existe em:

1. `src/data/projects.ts`
2. o `metadata` / JSON-LD de `src/app/layout.tsx`
3. o `systemPrompt` de `src/app/api/chat/route.ts`

O terceiro é conteúdo editorial, não código, e é onde as inconsistências nascem — a data de
formatura, por exemplo, aparece hoje em três redações diferentes. **O valor correto é
dezembro de 2026.**

Ao mudar qualquer fato biográfico, procure o valor antigo em todo o projeto antes.
Ver `docs/CONTENT.md`.
