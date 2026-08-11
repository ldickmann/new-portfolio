# Deploy

> **Status:** 🚧 parcial — a hospedagem funciona, mas não há CI e falta uma variável de
> ambiente em produção.

## Onde o site vive

| Item | Valor |
|---|---|
| Produção | https://new-portfolio-mu-sandy.vercel.app |
| Plataforma | Vercel |
| Branch de produção | `main` |
| Domínio próprio | **não há** — ver [ADR 0001](./adr/0001-manter-url-vercel.md) |

## Variáveis de ambiente

| Variável | Onde | Para quê |
|---|---|---|
| `GEMINI_API_KEY` | servidor | Chave do Google Gemini usada por `/api/chat`. **Nunca** prefixar com `NEXT_PUBLIC_` |
| `WEB3FORMS_ACCESS_KEY` | servidor | Chave do [Web3Forms](https://web3forms.com) usada por `/api/contact`. Gratuita; ao criar, informe o e-mail que deve receber as mensagens. Sem ela o formulário responde 503 e orienta o visitante a usar o e-mail direto |
| `NEXT_PUBLIC_SITE_URL` | build | URL canônica. Alimenta `metadataBase`, `openGraph.url` e o JSON-LD |

Localmente ficam em `.env.local` (ignorado pelo git via `.env*`). O template está
versionado em [`.env.example`](../.env.example) — a única exceção ao ignore.

> 🚨 **Cuidado com variável de ambiente do sistema operacional.** Uma variável exportada
> no ambiente do Windows **vence** o `.env.local` e o fallback do código, e o Next a
> embute no build sem avisar.
>
> Esta máquina tem `NEXT_PUBLIC_SITE_URL=https://belezuura.com.br` definida no ambiente
> do SO, provavelmente sobra de outro projeto. Com ela ativa, **todo build local do
> portfólio declara o domínio da Belezuura como canônico** — o que, se publicado, diria
> ao Google que as páginas do portfólio são duplicatas de outro site.
>
> Conferir antes de qualquer build que vá para produção:
>
> ```bash
> node -e "console.log(process.env.NEXT_PUBLIC_SITE_URL ?? '(nao definida)')"
> ```
>
> Deve imprimir `(nao definida)` ou a URL do portfólio. Se imprimir outra coisa, remova a
> variável do ambiente do sistema (Windows: Configurações → Sistema → Sobre → Configurações
> avançadas do sistema → Variáveis de Ambiente).
>
> Para um build pontual ignorando a variável: `env -u NEXT_PUBLIC_SITE_URL npm run build`.

> ⚠️ **Pendências na Vercel.** Duas variáveis precisam ser cadastradas lá:
>
> - `NEXT_PUBLIC_SITE_URL` — sem ela o código cai no fallback, que hoje aponta para um
>   domínio inexistente. Ver [SEO.md](./SEO.md). Correção prevista na Etapa 5.
> - `WEB3FORMS_ACCESS_KEY` — sem ela o formulário de contato não envia. O código já está
>   pronto e degrada com elegância, mas continua sem entregar mensagem nenhuma até a
>   chave existir.

## Fluxo de branches

```
feature/fix  ──PR──>  develop  ──PR──>  main  ──deploy──>  produção
```

- Trabalho novo sai de `develop`, **uma branch por etapa**.
- Prefixos seguem Conventional Commits: `feat/`, `fix/`, `docs/`, `refactor/`, `chore/`.
- `develop` chega em `main` por Pull Request.
- Commits seguem [Conventional Commits](https://www.conventionalcommits.org/pt-br/).

## Comandos

```bash
npm run dev     # desenvolvimento
npm run build   # build de produção — a verificação mínima antes de qualquer merge
npm run start   # servir o build local
npm run lint    # eslint — QUEBRADO, ver abaixo
```

> ⚠️ **`npm run lint` não roda.** O erro é
> `TypeError: Error while loading rule 'react/display-name': contextOrFilename.getFilename is not a function`,
> e acontece já ao carregar a configuração — não é código do projeto.
>
> Causa: o `eslint-config-next@16.2.6` traz `eslint-plugin-react@7.37.5` vendorizado, e
> essa versão usa uma API de contexto que o **ESLint 10** removeu. O `package.json`
> declara `eslint: ^10`.
>
> É uma falha **pré-existente** (reproduzida no commit `6f24bc9`), não uma regressão.
> Precisa ser resolvida antes de criar o CI, senão o pipeline nasce vermelho. Saídas
> possíveis: fixar `eslint` em `^9` até o `eslint-config-next` atualizar o plugin, ou
> substituir o preset.

## O que ainda não existe 📋

- **CI.** Não há diretório `.github/`. Nenhum workflow roda lint, build ou type-check em
  Pull Requests. O README afirma o contrário e exibe um badge apontando para um workflow
  inexistente — as duas coisas precisam ser corrigidas.
- **`npm run type-check`.** O README documenta esse script, mas ele não está no
  `package.json`.
- **Testes.** Não há jest, vitest, playwright nem cypress. Hoje a verificação é
  `npm run build` mais conferência manual.
