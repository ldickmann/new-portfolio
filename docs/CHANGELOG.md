# Changelog

Todas as mudanças notáveis deste projeto são documentadas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o projeto
adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não lançado]

### Adicionado

- Estrutura de documentação em `docs/`, com índice, guias por área e registro de decisões
  de arquitetura (ADRs).
- ADR 0001: manter a URL da Vercel como endereço canônico do site.
- ADR 0002: separar a oferta freelance em uma rota `/servicos` própria.
- ADR 0003: sistema de design tokens com prefixo `--dlk-` em duas camadas.
- ADR 0004: verde-limão da logo como acento primário da interface.
- Sistema de design tokens `--dlk-` em `globals.css`, em duas camadas: primitivas em
  `:root` e ponte `@theme inline` para o Tailwind gerar as classes utilitárias.
- Tokens de forma, ritmo e movimento que antes não existiam: `--dlk-radius-card`,
  `--dlk-space-section`, `--dlk-duration-*` e `--dlk-ease-out`.
- `src/lib/accent.ts` — mapa `ACCENT_CLASSES` e tipo `Accent` como fonte única.

### Alterado

- **Acento primário da interface: de ciano para o verde-limão da marca.** Mudança visual
  deliberada, não refatoração invisível.
- Tokens do shadcn deixam de guardar hex e passam a apontar para `var(--dlk-*)`.
- Acentos dos projetos remapeados: Belz Agent para limão (carro-chefe, leva a cor da
  marca), Belezuura mantém roxo, E-ReceitaSUS passa a ciano.
- Acentos das categorias de skills: Frontend e IA & LLMs passam a limão.
- Os utilitários `bg-grid` e `neon-glow` passam a consumir tokens em vez de `rgba()`
  literal, e `.animate-pulse-slow` usa `--dlk-duration-ambient`.
- O campo `accent` de `Project` e `SkillCategory` agora usa o tipo compartilhado `Accent`.

### Removido

- Tokens `cyber-black`, `cyber-cyan` e `cyber-purple` — 104 ocorrências em 11 arquivos.
- A cor `green-400`, absorvida pelo limão, que criava um segundo verde na página.
- A duplicação integral da paleta shadcn entre `:root` e `.dark`, que mantinha 30 linhas
  de valores idênticos em dois lugares.
- Os mapas `ACCENT_CLASSES` duplicados em `ProjectsBento`, `SkillsSection` e
  `projects/[slug]/page.tsx`, substituídos pelo módulo compartilhado.

---

## Histórico anterior à documentação

O projeto existia antes da criação deste changelog. O histórico completo está no
`git log` e segue Conventional Commits desde o início. Marcos principais:

- **jun/2026** — Migração da UI para shadcn (`style: base-nova` sobre `@base-ui/react`),
  criação das seções About, Projects (bento), Skills e Contact, catálogo tipado de projetos
  em `src/data/projects.ts` e páginas de detalhe SSG em `/projects/[slug]`.
- **jun/2026** — ChatWidget "LuksAI" com Google Gemini via route handler `/api/chat`.
- **jun/2026** — Remoção do workflow de deploy no GitHub Pages; produção passou a ser
  servida pela Vercel.
