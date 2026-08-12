# Portfólio — Lucas Elias Dickmann

> Desenvolvedor de Software especializado em IA e Engenharia de Prompt

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

**Produção:** <https://lucasdickmann.vercel.app>

## Sobre

Portfólio pessoal em Next.js (App Router), com tema escuro fixo e identidade visual própria
construída sobre design tokens `--dlk-`. Reúne a apresentação profissional, um catálogo de
projetos com página de detalhe por projeto, um formulário de contato e o **LuksAI**, um
chat com IA que responde perguntas sobre o meu trabalho.

## Stack

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework | Next.js (App Router) | `^16.2.6` |
| UI | React | `19.2.6` |
| Linguagem | TypeScript (`strict: true`) | `^6` |
| Estilo | Tailwind CSS | `^4` |
| Componentes | shadcn (`style: base-nova`) sobre `@base-ui/react` | `^4.8.3` |
| Animação | Framer Motion | `^12.40.0` |
| Formulários | React Hook Form + Zod | `^7.76.1` / `^4.4.3` |
| IA do chat | `@google/generative-ai` (Gemini) | `^0.24.1` |
| Hospedagem | Vercel | — |

Não existe `tailwind.config.*`: no Tailwind v4 toda a configuração vive em
`src/app/globals.css`. Detalhes em [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) e
[docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md).

## Começando

**Pré-requisitos:** Node.js 20.9 ou superior (exigência do Next.js 16 — o repositório não
fixa a versão via `engines` ou `.nvmrc`) e npm. O lockfile versionado é o
`package-lock.json`.

```bash
git clone https://github.com/ldickmann/new-portfolio.git
cd new-portfolio
npm install
cp .env.example .env.local   # preencha as chaves
npm run dev
```

O site sobe em <http://localhost:3000>.

### Variáveis de ambiente

Todas estão documentadas em [`.env.example`](.env.example). O site sobe sem nenhuma delas —
o que falha são as funcionalidades correspondentes.

| Variável | Necessária para | Observação |
|---|---|---|
| `GEMINI_API_KEY` | chat LuksAI | Só no servidor (`src/app/api/chat/route.ts`). Sem ela, o chat responde com erro. |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | formulário de contato | Pública por design do Web3Forms. Sem ela, o formulário avisa o visitante e sugere o e-mail direto. |
| `NEXT_PUBLIC_SITE_URL` | canonical, Open Graph e JSON-LD | Opcional. Validada contra uma allowlist em `src/lib/site-url.ts`; um host desconhecido cai no padrão com um aviso, sem quebrar o build. |

## Scripts

```bash
npm run dev     # desenvolvimento em localhost:3000
npm run build   # build de produção — roda a verificação de tipos
npm run start   # servir o build local
npm run lint    # eslint
```

São esses quatro — não há `type-check` (o `build` já executa o TypeScript) e **não há
testes automatizados**. A verificação mínima antes de qualquer merge é `npm run build` mais
conferência manual no navegador.

## Estrutura

```text
.
├── src/
│   ├── app/
│   │   ├── layout.tsx                # metadata, fontes, JSON-LD, <html lang="pt-br" class="dark">
│   │   ├── page.tsx                  # home — monta todas as seções em ordem
│   │   ├── globals.css               # TODO o estilo global e os design tokens
│   │   ├── manifest.json             # manifest PWA
│   │   ├── api/chat/route.ts         # POST — handler do chat LuksAI
│   │   └── projects/[slug]/page.tsx  # detalhe de projeto (SSG + generateMetadata)
│   ├── components/                   # 7 seções da página + ui/ (primitivos shadcn)
│   ├── data/                         # projects.ts e skills.ts — fonte única do conteúdo
│   └── lib/                          # accent.ts, contact-schema.ts, site-url.ts, utils.ts
├── docs/                             # documentação do projeto, incluindo adr/
├── public/                           # apenas os dois ícones PWA referenciados pelo manifest
└── .env.example
```

O favicon (`favicon.ico`, `icon0.svg`, `icon1.png`, `apple-icon.png`) fica em `src/app/`,
pela convenção de arquivo especial do App Router.

## Rotas

| Rota | Arquivo | Tipo |
|---|---|---|
| `/` | `src/app/page.tsx` | Server Component |
| `/projects/[slug]` | `src/app/projects/[slug]/page.tsx` | Estática, via `generateStaticParams()` |
| `POST /api/chat` | `src/app/api/chat/route.ts` | Route handler |

As páginas de projeto são geradas a partir de [`src/data/projects.ts`](src/data/projects.ts) —
hoje `belz-agent`, `belezuura` e `e-receitasus`. Acrescentar um objeto ao array cria a rota
sozinho; nunca edite texto de projeto direto no JSX.

## Funcionalidades

**Chat LuksAI.** Widget flutuante que chama `POST /api/chat`; o route handler conversa com
o Gemini usando um `systemInstruction` definido no servidor. Duas limitações conscientes:
só a última mensagem é enviada — **não há histórico de conversa** — e a rota é pública, sem
rate limiting.

**Formulário de contato.** Validado com Zod via React Hook Form, com honeypot anti-spam, e
enviado **direto do navegador** para o Web3Forms — sem route handler, porque a Cloudflare
que protege a API bloqueia requisições servidor-a-servidor. Ver
[ADR 0006](docs/adr/0006-formulario-de-contato-direto-do-navegador.md).

**Catálogo de projetos.** Bento grid na home e uma página de detalhe por projeto, ambos
alimentados pelo mesmo arquivo de dados.

**Tema.** Sempre escuro (`<html class="dark">`), sem alternância.

## Documentação

`docs/` é a memória do projeto e se mantém junto com o código, no mesmo commit. Cada
documento declara seu estado no topo — ✅ implementado, 🚧 parcial ou 📋 planejado.

| Documento | O que responde | Estado |
|---|---|---|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Como o projeto é organizado e de onde vêm os dados | ✅ |
| [DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) | Os tokens `--dlk-`, a paleta e quando usar cada um | ✅ |
| [CONTENT.md](docs/CONTENT.md) | Onde editar cada texto do site | ✅ |
| [ACCESSIBILITY.md](docs/ACCESSIBILITY.md) | O que já está acessível, o que falta e como testar | 🚧 |
| [SEO.md](docs/SEO.md) | Metadata, Open Graph, sitemap, canonical | 🚧 |
| [DEPLOY.md](docs/DEPLOY.md) | Vercel, variáveis de ambiente, fluxo de branches | 🚧 |
| [BRAND.md](docs/BRAND.md) | A logo DLK: variações, área de respiro, usos proibidos | 📋 |
| [CHANGELOG.md](docs/CHANGELOG.md) | O que mudou, em ordem cronológica | — |
| [adr/](docs/adr/) | As 7 decisões de arquitetura registradas e o porquê de cada uma | — |

## Deploy

Hospedado na Vercel, com `main` como branch de produção: todo merge em `main` dispara o
deploy. Não há CI: o diretório `.github/` não existe, então nenhuma verificação roda
automaticamente em Pull Requests.

As variáveis de ambiente ainda **não estão cadastradas no painel da Vercel**; ver
[docs/DEPLOY.md](docs/DEPLOY.md) para o passo a passo.

## Estado conhecido

O que ainda não existe, dito de forma explícita para que ninguém confie no contrário:

- **Sem testes automatizados** e **sem CI**.
- **Acessibilidade abaixo do WCAG AA**: falta skip link, falta `prefers-reduced-motion` e o
  `ChatWidget` não é utilizável por leitor de tela. Inventário em
  [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md).
- **Sem `sitemap.ts` e sem `robots.ts`**; o `twitter:card` é `summary_large_image` mas ainda
  não há OG image. Ver [docs/SEO.md](docs/SEO.md).
- `next.config.ts` mantém `images: { unoptimized: true }`, resquício do deploy antigo em
  GitHub Pages — remover ao adicionar imagens reais.
- Instalados e sem uso: `ai`, `@ai-sdk/react`, `@ai-sdk/google` (o chat usa
  `@google/generative-ai` direto) e `next-themes` (o tema é fixo).
- O ESLint está fixado em `^9` **de propósito**: o `eslint-plugin-react` que vem
  vendorizado no `eslint-config-next` declara peer `eslint: "^3 || … || ^9.7"`, e com o
  ESLint 10 o lint nem carrega a configuração.

## Contribuição

O fluxo é `feature/fix → develop → main`. Trabalho novo sai em uma branch por etapa,
encadeada na anterior quando houver dependência.

1. Crie a branch a partir de `develop` (`git checkout -b feature/minha-mudanca`)
2. Faça os commits seguindo [Conventional Commits](https://www.conventionalcommits.org/pt-br/)
3. Atualize `docs/` no **mesmo commit** — changelog sempre; ADR quando a decisão não for
   óbvia pelo código
4. Rode `npm run lint` e `npm run build`
5. Abra o Pull Request para `develop`

## Licença

MIT — veja [LICENSE](LICENSE).

## Contato

**Lucas Elias Dickmann**

- E-mail: [ldickmann12@gmail.com](mailto:ldickmann12@gmail.com)
- LinkedIn: [lucasdickmann](https://linkedin.com/in/lucasdickmann)
- GitHub: [ldickmann](https://github.com/ldickmann)
- Site: [lucasdickmann.vercel.app](https://lucasdickmann.vercel.app)
