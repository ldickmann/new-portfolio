# Changelog

Todas as mudanças notáveis deste projeto são documentadas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o projeto
adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não lançado]

### Adicionado

- Favicon completo, gerado via realfavicongenerator.net: `favicon.ico`, `icon0.svg`,
  `icon1.png` e `apple-icon.png` em `src/app/` (convenção de arquivo do App Router) e
  `manifest.json` com os ícones PWA de 192x192/512x512 em `public/` — cores do manifest
  (`theme_color`/`background_color`) ajustadas para `--dlk-color-black` (`#050505`), tema
  fixo do site.
- ADR 0007: trocar a URL canônica para `lucasdickmann.vercel.app`, substituindo a ADR
  0001.

- Estrutura de documentação em `docs/`, com índice, guias por área e registro de decisões
  de arquitetura (ADRs).
- ADR 0001: manter a URL da Vercel como endereço canônico do site.
- ADR 0002: separar a oferta freelance em uma rota `/servicos` própria.
- ADR 0003: sistema de design tokens com prefixo `--dlk-` em duas camadas.
- ADR 0004: verde-limão da logo como acento primário da interface.
- ADR 0005: validar a URL canônica vinda do ambiente.
- ADR 0006: enviar o formulário de contato direto do navegador.
- `src/lib/site-url.ts` — resolve a URL canônica validando o host contra uma lista de
  endereços permitidos, para que nenhuma variável de ambiente de outro projeto consiga
  virar canonical em silêncio.
- Sistema de design tokens `--dlk-` em `globals.css`, em duas camadas: primitivas em
  `:root` e ponte `@theme inline` para o Tailwind gerar as classes utilitárias.
- Tokens de forma, ritmo e movimento que antes não existiam: `--dlk-radius-card`,
  `--dlk-space-section`, `--dlk-duration-*` e `--dlk-ease-out`.
- `src/lib/accent.ts` — mapa `ACCENT_CLASSES` e tipo `Accent` como fonte única.
- Envio do formulário de contato direto do navegador para o Web3Forms — ver
  [ADR 0006](./adr/0006-formulario-de-contato-direto-do-navegador.md). Uma primeira versão
  passava por um route handler `POST /api/contact`, revertida antes de lançar: a
  Cloudflare que protege a API do Web3Forms bloqueia requisições servidor-a-servidor.
- `src/lib/contact-schema.ts` — schema zod usado pelo formulário via `zodResolver`.
- Honeypot anti-spam no formulário, fora da tela e fora da árvore de acessibilidade.
- `.env.example` versionado, documentando as três variáveis de ambiente do projeto.
- `LICENSE` na raiz, com o texto MIT — a licença era afirmada pelo `README.md` desde sempre,
  mas o arquivo nunca existiu.

### Corrigido

- **`README.md` reescrito a partir do código.** A versão anterior afirmava CI via GitHub
  Actions (não há `.github/`), um script `npm run type-check` (não existe), licença MIT com
  link para um arquivo ausente, `NEXT_PUBLIC_SITE_URL=https://lucasdickmann.dev` (domínio
  não comprado), conformidade com o WCAG (ver `ACCESSIBILITY.md`) e as versões erradas de
  Next, TypeScript e Tailwind — além de exibir um badge de build apontando para um workflow
  inexistente. O documento agora só afirma o que está no código e delega o aprofundamento
  para `docs/`.
- A árvore de arquivos do `ARCHITECTURE.md` ainda listava `src/app/api/contact/route.ts`,
  rota revertida antes de lançar pelo ADR 0006.
- **`npm run lint` não rodava.** Falhava ao carregar a configuração, porque o
  `eslint-plugin-react@7.37.5` — vendorizado dentro do `eslint-config-next` e última
  versão publicada — não suporta o ESLint 10. O `eslint` foi fixado em `^9`.
- Os dois erros que o lint revelou assim que voltou a funcionar: um `any` explícito no
  `catch` de `/api/chat`, agora estreitado com `instanceof Error`; e um texto `//` solto
  em JSX no `ContactSection`, que o `react/jsx-no-comment-textnodes` lê como comentário
  mal formado.
- **O `metadataBase` apontava para um domínio inexistente.** O fallback era
  `https://lucasdickmann.dev`, que retorna `NXDOMAIN`, e como a variável de ambiente não
  estava configurada na Vercel, a produção publicava esse endereço em `og:url` — todo
  link compartilhado declarava uma URL canônica morta. Agora o fallback é a URL real da
  Vercel.
- Adicionado `alternates.canonical` na home e em cada página de projeto, que antes não
  declaravam canônica nenhuma. As páginas de projeto também passam a definir
  `openGraph.url`.
- **O formulário de contato não enviava nada.** Era um `setTimeout` de 1,5s seguido de
  `alert("Mensagem transmitida com sucesso!")` — dizia ao visitante que a mensagem tinha
  sido entregue sem que nenhuma requisição saísse do navegador.
- **E-mail de contato era um placeholder** (`seu-email@lucasdickmann.dev`, em um domínio
  que nem existe). Agora é `ldickmann12@gmail.com`.
- **Número de WhatsApp era fictício** (`5547999999999`, marcado com um TODO no código).
  Agora é o número real.
- O formulário passa a ter validação com mensagens por campo, `aria-invalid` e
  `aria-describedby` ligados às mensagens de erro — antes só havia `required` nativo.
- O `<Toaster />` do sonner, montado no layout desde sempre e nunca usado, finalmente
  substitui o `alert()` nativo.

### Alterado

- **URL canônica de produção: de `new-portfolio-mu-sandy.vercel.app` para
  `lucasdickmann.vercel.app`.** O domínio antigo continua ativo, redirecionando (307) para
  o novo — nenhum link já compartilhado quebra. Ver ADR 0007.
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
