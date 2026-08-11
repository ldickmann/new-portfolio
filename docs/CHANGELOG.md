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
