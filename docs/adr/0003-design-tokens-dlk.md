# 0003 — Design tokens `--dlk-` em duas camadas

- **Status:** Aceito
- **Data:** 2026-08-10

## Contexto

O `globals.css` misturava três sistemas de cor que não conversavam entre si:

1. **Tokens `cyber-*`** em `@theme` (`--color-cyber-black`, `--color-cyber-cyan`,
   `--color-cyber-purple`), consumidos como classes Tailwind nos componentes.
2. **A paleta do shadcn** (`--background`, `--primary`, `--ring`…) escrita com **hex cru**
   e **duplicada integralmente** em `:root` e `.dark`, com valores idênticos nos dois
   blocos — 30 linhas repetidas que precisavam ser alteradas em dois lugares.
3. **Valores hardcoded dentro dos utilitários** — `rgba(0, 255, 255, 0.05)` aparecia
   literal em `@utility bg-grid` e `rgba(0, 255, 255, 0.8)` em `@utility neon-glow`.

Mudar o ciano exigia editar pelo menos cinco lugares diferentes. Não havia tokens para
raio, espaçamento de seção, duração de animação ou curva de easing — esses valores viviam
soltos em cada componente.

## Decisão

Um sistema de tokens com prefixo **`--dlk-`** (o monograma da logo), organizado em
**duas camadas**:

**Camada 1 — primitivas**, em `:root`. A fonte única de verdade. Cor, superfície, borda,
texto, brilho, raio, ritmo e movimento. Divide-se em primitivas cruas
(`--dlk-color-lime`) e semânticas que apontam para elas (`--dlk-accent`).

**Camada 2 — ponte**, em `@theme inline`. Expõe as primitivas ao Tailwind para que ele
gere as classes utilitárias.

A separação **não é estética, é obrigatória**. No Tailwind v4, o `@theme` só gera
utilitários a partir de namespaces que ele reconhece — `--color-*`, `--radius-*`,
`--font-*`, `--spacing-*`. Uma variável chamada `--dlk-lime` **não** produziria
`text-dlk-lime`, porque `dlk` não é um namespace do Tailwind. A ponte resolve isso:

```css
:root { --dlk-color-lime: #b5e83a; }              /* primitiva */
@theme inline { --color-dlk-lime: var(--dlk-color-lime); }  /* ponte → text-dlk-lime */
```

O `@theme inline` (em vez de `@theme`) faz o Tailwind resolver a referência no ponto de
uso, sem uma camada extra de indireção — é o mesmo mecanismo que o shadcn já usava no
arquivo.

Como consequência da decisão, os tokens do shadcn deixam de guardar hex e passam a
apontar para `var(--dlk-*)`, o que elimina a duplicação `:root` / `.dark`.

## Consequências

- Trocar uma cor de marca passa a ser a edição de **uma linha**.
- Nenhum componente pode conter hex, `rgba()` ou valor de duração literal. Isso vira
  regra de revisão.
- `prefers-reduced-motion` fica trivial: basta zerar `--dlk-duration-base` numa media
  query, em vez de caçar animação componente por componente.
- Há um custo de migração único: renomear as classes `cyber-*` nos componentes que já
  existem.
- Quem não conhecer a regra dos namespaces do Tailwind v4 pode tentar criar
  `--dlk-algo` dentro de `@theme` e não entender por que a classe não é gerada. Por isso
  a regra está documentada em [DESIGN-SYSTEM.md](../DESIGN-SYSTEM.md).

## Alternativas consideradas

**Renomear `cyber-*` para `dlk-*` direto dentro de `@theme`, sem duas camadas.** Mais
simples de escrever, e funcionaria para cor — desde que todo token fosse nomeado
`--color-dlk-*`. Descartado porque quebra para tudo que não é cor: duração, easing e
tamanho de grid não têm namespace no Tailwind, e ficariam sem lugar no sistema.

**Adotar uma biblioteca de tokens (Style Dictionary, Tokens Studio).** Resolve o problema
de forma industrial e exporta para várias plataformas. Descartado por excesso: é um
portfólio de uma página e meia, com uma única plataforma de saída. A complexidade não se
paga.
