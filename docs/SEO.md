# SEO

> **Status:** 🚧 parcial — a base existe, mas há um erro ativo em produção e várias
> ausências. O que falta está marcado abaixo.

## URL canônica

`https://new-portfolio-mu-sandy.vercel.app` — ver
[ADR 0001](./adr/0001-manter-url-vercel.md) para o porquê de não haver domínio próprio.

O valor vive em `NEXT_PUBLIC_SITE_URL` e é resolvido em `src/app/layout.tsx`:

```ts
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "<fallback>";
```

Esse `siteUrl` alimenta `metadataBase`, `openGraph.url` e o `url` do JSON-LD. Trocar de
domínio é trocar essa variável — nada mais.

> ⚠️ **Erro ativo em produção.** O fallback ainda aponta para `https://lucasdickmann.dev`,
> um domínio que retorna `NXDOMAIN`, e a variável não está configurada na Vercel. Logo, a
> produção publica hoje `<meta property="og:url" content="https://lucasdickmann.dev"/>`.
> Correção prevista na Etapa 5.

## O que já existe ✅

Em `src/app/layout.tsx`:

- `title` com `default` e `template` (`"%s | Lucas Elias Dickmann"`)
- `description`, `keywords` (8 termos), `authors`, `creator`
- `openGraph`: `type`, `locale: "pt_BR"`, `url`, `siteName`, `title`, `description`
- `twitter`: `card: "summary_large_image"`, `title`, `description`
- **JSON-LD** do tipo `Person`, com `jobTitle`, `alumniOf` (UNIVALI) e `knowsAbout`
- `<html lang="pt-br">`

Em `src/app/projects/[slug]/page.tsx`:

- `generateStaticParams()` — as rotas de projeto são pré-renderizadas
- `generateMetadata()` — `title` e `description` por projeto, com `openGraph.type: "article"`

## O que falta 📋

| Item | Impacto | Etapa |
|---|---|---|
| **`openGraph.images` / `twitter.images`** | O card declara `summary_large_image` **sem imagem**. Compartilhamento no LinkedIn sai sem preview | 5 |
| **`alternates.canonical`** | Sem canonical explícito em nenhuma rota | 5 |
| **`icons` / favicon** | Não existe `public/`, nem `icon.tsx` | 3 e 5 |
| **`sitemap.ts`** | Não existe. Serão 5 URLs: `/`, `/servicos` e 3 projetos | — |
| **`robots.ts`** | Não existe, e não há campo `robots` no metadata | — |
| **Imagem por projeto** | O `generateMetadata` do detalhe não define `images` | 5 |

## Como validar

Depois de qualquer mudança em metadata, com o deploy no ar:

```bash
curl -s https://new-portfolio-mu-sandy.vercel.app | grep -E 'og:url|og:image|twitter:image|canonical'
```

Nenhum resultado pode conter `lucasdickmann.dev`.

Para o preview social, usar o [LinkedIn Post
Inspector](https://www.linkedin.com/post-inspector/) — ele também limpa o cache do
LinkedIn, necessário quando a OG image muda — e o [OpenGraph.xyz](https://www.opengraph.xyz/).

Para sitemap e robots, abrir `/sitemap.xml` e `/robots.txt` e conferir se as 5 URLs
aparecem.
