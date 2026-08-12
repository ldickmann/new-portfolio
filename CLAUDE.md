# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

O projeto é escrito em português (código, comentários, documentação e conteúdo). Mantenha
essa convenção.

## Comandos

Os scripts estão no `package.json` — são quatro, todos com a invocação padrão. O que o
`package.json` não conta:

**Não há testes automatizados** — sem jest, vitest, playwright ou cypress. A verificação
mínima antes de qualquer merge é `npm run build` (ele roda o TypeScript) mais conferência
manual no navegador.

## Armadilhas que já custaram tempo

Três coisas neste repositório quebram de forma silenciosa. Leia antes de mexer.

### 1. `NEXT_PUBLIC_SITE_URL` vaza do ambiente do sistema operacional

A máquina de desenvolvimento tem `NEXT_PUBLIC_SITE_URL=https://belezuura.com.br`
exportada no ambiente do **Windows**, sobra de outro projeto. Como o dotenv não
sobrescreve o que já está em `process.env`, **colocar o valor certo no `.env.local` não
resolve** — a variável do sistema vence e o Next a embute no build.

Por isso a URL canônica passa por `src/lib/site-url.ts`, que valida o host contra uma
allowlist antes de aceitá-lo. Nunca leia `process.env.NEXT_PUBLIC_SITE_URL` direto;
importe `siteUrl` desse módulo. Ao conectar um domínio novo, adicione-o a
`ALLOWED_HOSTS`. Ver `docs/adr/0005-*`.

Todo build imprime um aviso enquanto a variável existir na máquina. É esperado.

### 2. ESLint está fixado em `^9` de propósito — não atualize para o 10

O `eslint-config-next` traz `eslint-plugin-react@7.37.5` vendorizado, e esse plugin
declara peer `eslint: "^3 || … || ^9.7"`. Com ESLint 10 o lint nem carrega a config.
7.37.5 é a última versão publicada do plugin, então não há upgrade nem `overrides` que
resolva. Note que o `eslint-config-next` declara peer `>=9.0.0` — o range dele está
errado, e foi assim que o `^10` entrou sem aviso.

### 3. O `ProjectsBento` posiciona os cards por índice

`src/components/ProjectsBento.tsx` faz `const [belzAgent, belezuura, eReceitaSus] = projects`.
O layout de cada card está amarrado à **posição no array**. Acrescentar um quarto projeto
exige refatorar o componente antes — não basta editar os dados.

## Design system: tokens `--dlk-` em duas camadas

Todo estilo vive em `src/app/globals.css`. **Componente não contém hex, `rgba()` nem
duração literal.** Se um valor não existe como token, crie o token.

A arquitetura de duas camadas não é estética, é obrigatória:

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

Acento primário é o **verde-limão da marca** (`--dlk-color-lime`); roxo é secundário e
ciano é terciário, restrito a acento de projeto. `src/lib/accent.ts` é a fonte única do
mapa `ACCENT_CLASSES` — as strings precisam ser literais completas para o Tailwind
detectá-las na varredura.

Ver `docs/DESIGN-SYSTEM.md` e ADRs `0003`/`0004`.

## Arquitetura

Não existe `tailwind.config.*` — o Tailwind v4 é configurado inteiramente dentro do
`globals.css`.

Os componentes de UI são **shadcn no estilo `base-nova`, sobre `@base-ui/react`** — não
Radix. Consequências práticas: `ui/form.tsx` injeta os atributos ARIA via
`React.cloneElement` em vez de `Slot`, e usar `<Button render={<a/>}>` sem
`nativeButton={false}` gera erro de semântica no console.

### Fluxo de dados

`src/data/projects.ts` é a **fonte única** do conteúdo de projeto, consumida pelo bento da
home e pelas páginas de detalhe. Adicionar um objeto ao array cria a rota estática
`/projects/<slug>` automaticamente via `generateStaticParams()`. Nunca edite texto de
projeto direto no JSX.

O `ChatWidget` é client-side com `useState`; faz `POST /api/chat`, e o route handler chama
o Gemini com o `systemInstruction` definido no servidor. **Só a última mensagem é enviada
— não há histórico de conversa**, e a rota é pública sem rate limiting.

O `ContactSection` valida com o schema zod de `src/lib/contact-schema.ts` e envia **direto
do navegador** para o Web3Forms, sem passar por um route handler — a Cloudflare que
protege `api.web3forms.com` bloqueia requisições servidor-a-servidor, e a chave do
Web3Forms é pública por design do serviço. Por isso a chave usa o prefixo
`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. Sem ela, o formulário avisa o visitante e sugere o
e-mail direto. Ver `docs/adr/0006-formulario-de-contato-direto-do-navegador.md`.

### Conteúdo mora em três lugares e diverge

A biografia existe em `src/data/projects.ts`, no `metadata`/JSON-LD de `layout.tsx` **e no
`systemPrompt` de `api/chat/route.ts`**. Esse último é conteúdo editorial, não código, e é
onde as inconsistências nascem — a data de formatura, por exemplo, aparece hoje em três
redações diferentes (o valor correto é dezembro de 2026).

Ao mudar qualquer fato biográfico, procure o valor antigo em todo o projeto antes.
Ver `docs/CONTENT.md`.

## Documentação é parte da entrega

`docs/` é a memória do projeto e se mantém junto com o código, **no mesmo commit**:

- Toda mudança entregue vira uma linha em `docs/CHANGELOG.md` (Keep a Changelog).
- Toda decisão cuja resposta a "por que está assim?" não esteja no código vira um ADR em
  `docs/adr/`, seguindo o template em `docs/adr/README.md`.
- Cada documento declara seu estado no topo: ✅ implementado, 🚧 parcial ou 📋 planejado.
  Nunca documente algo como pronto sem estar no código.

O `README.md` é a porta de entrada e aponta para `docs/`; `docs/` é onde a resposta mora.
Nunca documente algo como pronto sem estar no código — foi por documentar o que ainda não
existia que o README precisou ser reescrito do zero uma vez.

## Git

Commits seguem [Conventional Commits](https://www.conventionalcommits.org/pt-br/). O fluxo
é `feature/fix → develop → main`, com `main` sendo a branch de produção na Vercel.

Trabalho novo sai em **uma branch por etapa**, encadeada na etapa anterior quando houver
dependência entre elas.

## Estado conhecido

Coisas que estão faltando e são fáceis de reintroduzir por engano:

- `public/` existe apenas para os ícones PWA (`web-app-manifest-192x192.png` e
  `-512x512.png`, referenciados pelo `src/app/manifest.json`). O favicon propriamente dito
  (`favicon.ico`, `icon0.svg`, `icon1.png`, `apple-icon.png`) vive em `src/app/`, via
  convenção de arquivo especial do App Router — o Next gera as tags `<link>` sozinho, sem
  precisar tocar no `layout.tsx`. Ainda não há OG image; o `twitter:card` continua
  declarado como `summary_large_image` **sem imagem**.
- Não existem `sitemap.ts` nem `robots.ts`.
- Não existe `.github/` — nenhum CI roda em Pull Requests.
- `next.config.ts` tem `images: { unoptimized: true }`, resquício do deploy antigo em
  GitHub Pages. Remova ao adicionar imagens reais.
- Instalados e sem uso: `ai`, `@ai-sdk/react`, `@ai-sdk/google` (o chat usa
  `@google/generative-ai` direto) e `next-themes` (o tema é fixo).
- Acessibilidade está longe do AA que o README promete — sem skip link, sem
  `prefers-reduced-motion` (com Framer Motion em 6 componentes) e com o `ChatWidget`
  inacessível a leitor de tela. Inventário completo em `docs/ACCESSIBILITY.md`.
