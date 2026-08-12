# CLAUDE.md

Guia para o Claude Code (claude.ai/code) trabalhar neste repositório.

O projeto é escrito em português (código, comentários, documentação e conteúdo). Mantenha
essa convenção.

## Verificação mínima

Os scripts estão no `package.json` — são quatro, todos com a invocação padrão.

**Não há testes automatizados** — sem jest, vitest, playwright ou cypress. Antes de
qualquer merge: `npm run build` (ele roda o TypeScript) mais conferência manual no
navegador.

## Regras que valem sempre

- **Componente não contém hex, `rgba()` nem duração literal.** Se o valor não existe como
  token `--dlk-`, crie o token em `src/app/globals.css`.
- **Nunca edite texto de projeto direto no JSX.** `src/data/projects.ts` é a fonte única.
- **Nunca leia `process.env.NEXT_PUBLIC_SITE_URL` direto.** Importe `siteUrl` de
  `src/lib/site-url.ts`, que valida o host contra uma allowlist antes de aceitá-lo. Ao
  conectar um domínio novo, adicione-o a `ALLOWED_HOSTS`. Ver `docs/adr/0005-*`.
- **Não atualize o ESLint para o 10.** Está fixado em `^9` de propósito: o
  `eslint-config-next` traz `eslint-plugin-react@7.37.5` vendorizado, e esse plugin declara
  peer `eslint: "^3 || … || ^9.7"`. Com o ESLint 10 o lint nem carrega a config. 7.37.5 é a
  última versão publicada do plugin, então não há upgrade nem `overrides` que resolva. O
  peer `>=9.0.0` declarado pelo `eslint-config-next` está errado — foi assim que o `^10`
  entrou sem aviso.

## Documentação é parte da entrega

`docs/` é a memória do projeto e se mantém junto com o código, **no mesmo commit**:

- Toda mudança entregue vira uma linha em `docs/CHANGELOG.md` (Keep a Changelog).
- Toda decisão cuja resposta a "por que está assim?" não esteja no código vira um ADR em
  `docs/adr/`, seguindo o template em `docs/adr/README.md`.
- Cada documento declara seu estado no topo: ✅ implementado, 🚧 parcial ou 📋 planejado.

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
- Acessibilidade está longe do AA — sem skip link, sem `prefers-reduced-motion` (com Framer
  Motion em 6 componentes) e com o `ChatWidget` inacessível a leitor de tela. Inventário
  completo em `docs/ACCESSIBILITY.md`.

## Onde está o resto

O detalhamento por área vive em `.claude/rules/` e é carregado só quando você abre os
arquivos correspondentes:

| Regra | Cobre | Carrega ao tocar em |
|---|---|---|
| `ui-e-design-system.md` | tokens `--dlk-` em duas camadas, acento, shadcn sobre `@base-ui` | `globals.css`, `src/components/**`, `accent.ts` |
| `conteudo-e-dados.md` | fonte única de projetos, bento por índice, bio em três lugares | `src/data/**`, `layout.tsx`, `projects/[slug]`, `ProjectsBento.tsx` |
| `integracoes.md` | chat Gemini e formulário Web3Forms | `ChatWidget.tsx`, `ContactSection.tsx`, `api/chat/route.ts`, `contact-schema.ts` |
