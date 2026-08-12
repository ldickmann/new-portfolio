# SEO

> **Status:** 🚧 parcial — a base existe, mas há um erro ativo em produção e várias
> ausências. O que falta está marcado abaixo.

## URL canônica

`https://lucasdickmann.vercel.app` — ver
[ADR 0007](./adr/0007-trocar-para-lucasdickmann-vercel-app.md) para o porquê de não haver
domínio próprio ainda, e [ADR 0001](./adr/0001-manter-url-vercel.md) (substituído) para o
histórico da URL anterior.

O valor vive em `NEXT_PUBLIC_SITE_URL` e é resolvido em `src/app/layout.tsx`:

```ts
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "<fallback>";
```

Esse `siteUrl` alimenta `metadataBase`, `openGraph.url` e o `url` do JSON-LD. Trocar de
domínio é trocar essa variável — nada mais.

O fallback aponta para a mesma URL, de modo que o site nunca declara um endereço que não
responde — mesmo que a variável falte no ambiente.

> ⚠️ **A variável ainda não está configurada na Vercel.** Hoje a produção funciona pelo
> fallback do código. Cadastrá-la continua sendo o certo, e é obrigatório antes de
> qualquer troca de domínio. Ver o alerta sobre variáveis do sistema operacional em
> [DEPLOY.md](./DEPLOY.md) — há uma armadilha real ali.

## O que já existe ✅

Em `src/app/layout.tsx`:

- `title` com `default` e `template` (`"%s | Lucas Elias Dickmann"`)
- `description`, `keywords` (8 termos), `authors`, `creator`
- `openGraph`: `type`, `locale: "pt_BR"`, `url`, `siteName`, `title`, `description`
- `twitter`: `card: "summary_large_image"`, `title`, `description`
- **JSON-LD** do tipo `Person`, com `jobTitle`, `alumniOf` (UNIVALI) e `knowsAbout`
- `<html lang="pt-br">`

Favicon completo (`favicon.ico`, `icon0.svg`, `icon1.png`, `apple-icon.png`) e
`manifest.json` com ícones PWA, via convenção de arquivo do App Router em `src/app/` —
não requer código no `layout.tsx`.

Em `src/app/projects/[slug]/page.tsx`:

- `generateStaticParams()` — as rotas de projeto são pré-renderizadas
- `generateMetadata()` — `title` e `description` por projeto, com `openGraph.type: "article"`

## O que falta 📋

| Item | Impacto | Etapa |
|---|---|---|
| **`openGraph.images` / `twitter.images`** | O card declara `summary_large_image` **sem imagem**. Compartilhamento no LinkedIn sai sem preview | 5 |
| **`sitemap.ts`** | Não existe. Serão 5 URLs: `/`, `/servicos` e 3 projetos | — |
| **`robots.ts`** | Não existe, e não há campo `robots` no metadata | — |
| **Imagem por projeto** | O `generateMetadata` do detalhe não define `images` | 5 |

Canonical já está resolvido: `alternates.canonical` existe na home (`/`) e em cada página
de projeto (`/projects/<slug>`).

## Como validar

Depois de qualquer mudança em metadata, com o deploy no ar:

```bash
curl -s https://lucasdickmann.vercel.app | grep -E 'og:url|og:image|twitter:image|canonical'
```

Nenhum resultado pode conter `lucasdickmann.dev`.

Para o preview social, usar o [LinkedIn Post
Inspector](https://www.linkedin.com/post-inspector/) — ele também limpa o cache do
LinkedIn, necessário quando a OG image muda — e o [OpenGraph.xyz](https://www.opengraph.xyz/).

Para sitemap e robots, abrir `/sitemap.xml` e `/robots.txt` e conferir se as 5 URLs
aparecem.
