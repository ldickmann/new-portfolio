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

> 🚨 **Variável de ambiente do sistema operacional vaza entre projetos.** Uma variável
> exportada no ambiente do Windows **vence** o `.env.local` — o dotenv não sobrescreve o
> que já está em `process.env` — e o Next embute `NEXT_PUBLIC_*` no build.
>
> Esta máquina tem `NEXT_PUBLIC_SITE_URL=https://belezuura.com.br` definida no ambiente
> do SO, sobra de outro projeto. Antes da correção, **todo build local do portfólio
> declarava o domínio da Belezuura como canônico de todas as páginas**.
>
> **O projeto agora está protegido:** `src/lib/site-url.ts` valida o host antes de aceitar
> o valor, e um host que não serve este portfólio é ignorado com aviso no build. Ver
> [ADR 0005](./adr/0005-validar-a-url-canonica-vinda-do-ambiente.md).
>
> A variável, porém, **continua existindo na máquina** — a proteção é deste projeto, não
> uma remoção da causa. Enquanto ela estiver lá, todo build imprime o aviso. Para conferir:
>
> ```bash
> node -e "console.log(process.env.NEXT_PUBLIC_SITE_URL ?? '(nao definida)')"
> ```
>
> Para removê-la: Windows → Configurações → Sistema → Sobre → Configurações avançadas do
> sistema → Variáveis de Ambiente. **Antes de remover, confira se o projeto Belezuura não
> depende dela localmente** — pode ter sido posta ali de propósito.
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
npm run lint    # eslint
```

> 📌 **O ESLint está fixado em `^9` de propósito — não atualize para o 10.**
>
> Com `eslint@^10` o lint não roda: falha ao carregar a configuração com
> `TypeError: Error while loading rule 'react/display-name': contextOrFilename.getFilename is not a function`.
>
> Causa: o `eslint-config-next@16.2.6` traz `eslint-plugin-react@7.37.5` vendorizado, e
> esse plugin declara suporte a `eslint: "^3 || ... || ^9.7"` — **o ESLint 10 está fora**.
> Como 7.37.5 é a última versão publicada do plugin, não há upgrade que resolva, e um
> `overrides` no `package.json` não teria para onde apontar.
>
> Note que o `eslint-config-next` declara peer `eslint: ">=9.0.0"`, ou seja, ele *afirma*
> aceitar o 10 — o range declarado está errado. Voltar ao 10 só será seguro quando o
> `eslint-plugin-react` publicar suporte.

## O que ainda não existe 📋

- **CI.** Não há diretório `.github/`. Nenhum workflow roda lint, build ou type-check em
  Pull Requests. O README afirma o contrário e exibe um badge apontando para um workflow
  inexistente — as duas coisas precisam ser corrigidas. O `npm run lint` já está
  funcional, então o pipeline não nasce vermelho por causa dele.
- **`npm run type-check`.** O README documenta esse script, mas ele não está no
  `package.json`. (O `next build` já roda a verificação de tipos, mas um script separado
  é mais rápido no CI.)
- **Testes.** Não há jest, vitest, playwright nem cypress. Hoje a verificação é
  `npm run build` mais conferência manual.
