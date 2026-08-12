# Documentação — Portfólio Lucas Elias Dickmann

Esta pasta é a memória do projeto. Toda mudança relevante no código tem um reflexo aqui,
no mesmo commit — não depois.

## Índice

| Documento | O que responde |
|---|---|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Como o projeto é organizado, de onde vêm os dados, por que App Router |
| [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) | Os tokens `--dlk-`, a paleta e quando usar cada um |
| [BRAND.md](./BRAND.md) | A logo DLK: variações, área de respiro, usos proibidos |
| [CONTENT.md](./CONTENT.md) | Onde editar cada texto do site |
| [ACCESSIBILITY.md](./ACCESSIBILITY.md) | O que já está acessível, o que falta e como testar |
| [SEO.md](./SEO.md) | Metadata, Open Graph, sitemap, canonical |
| [DEPLOY.md](./DEPLOY.md) | Vercel, variáveis de ambiente, fluxo de branches |
| [CHANGELOG.md](./CHANGELOG.md) | O que mudou, em ordem cronológica |
| [adr/](./adr/) | Registro das decisões de arquitetura e o porquê de cada uma |

## Convenções

**Status.** Todo documento começa com um marcador de estado, para que ninguém confie em
documentação de algo que ainda não existe:

- `✅ implementado` — está no código, hoje
- `🚧 parcial` — existe em parte; o documento diz o que falta
- `📋 planejado` — ainda não existe; o documento descreve o alvo

**Commits.** O projeto usa [Conventional Commits](https://www.conventionalcommits.org/pt-br/)
(`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`).

**Changelog.** Segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/). Cada card
entregue vira uma linha no `CHANGELOG.md`, no mesmo commit da mudança.

**Decisões.** Toda escolha de arquitetura que seria difícil de reconstituir depois
("por que não compraram o domínio?", "por que o acento é limão?") vira um ADR em
[`adr/`](./adr/). Ver o [template](./adr/README.md).
