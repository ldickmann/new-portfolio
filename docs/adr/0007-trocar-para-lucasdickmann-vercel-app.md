# 0007 — Trocar a URL canônica para `lucasdickmann.vercel.app`

- **Status:** Aceito
- **Data:** 2026-08-12

## Contexto

A [ADR 0001](./0001-manter-url-vercel.md) tinha decidido manter
`new-portfolio-mu-sandy.vercel.app` como endereço canônico e **não** renomear o projeto,
justamente para não quebrar links que já pudessem ter sido compartilhados em candidaturas.

Essa decisão foi revisitada porque o Vercel oferece, na aba Domains do projeto, uma opção
que a ADR 0001 não tinha em conta: adicionar um segundo domínio `*.vercel.app` e configurar
o antigo para **redirecionar (307)** para o novo, em vez de apenas removê-lo. Isso elimina
o risco que motivou a decisão original — nenhum link antigo quebra — sem abrir mão de uma
URL mais curta e legível (`lucasdickmann.vercel.app` em vez de
`new-portfolio-mu-sandy.vercel.app`, sufixo gerado automaticamente pelo Vercel por colisão
de nome).

## Decisão

O endereço canônico passa a ser **`https://lucasdickmann.vercel.app`**. Na Vercel:

- `lucasdickmann.vercel.app` foi adicionado como domínio de Produção.
- `new-portfolio-mu-sandy.vercel.app` permanece cadastrado no projeto, mas configurado
  para redirecionar (307) para o novo domínio, em vez de removido.

No código, `FALLBACK_SITE_URL` em `src/lib/site-url.ts` passa a apontar para o novo
domínio. `ALLOWED_HOSTS` não precisou de entrada nova — `isAllowedHost` já aceita qualquer
host `*.vercel.app`.

Continua sem domínio próprio comprado; ver ADR 0001 para o raciocínio original sobre isso
(ainda válido — nada mudou quanto a comprar `lucasdickmann.dev`).

## Consequências

- A URL que aparece em candidaturas novas, no `og:url`, no `metadataBase` e no JSON-LD é
  mais curta e sem sufixo aleatório.
- Nenhum link com a URL antiga quebra — o redirect 307 é permanente enquanto o domínio
  antigo continuar cadastrado no projeto.
- A variável `NEXT_PUBLIC_SITE_URL` na Vercel precisa ser atualizada manualmente para o
  novo valor, e o projeto precisa de um redeploy — ela é embutida no build, não lida em
  runtime.
- Migrar para um domínio próprio no futuro continua custando **uma variável de ambiente**,
  como já prevía a ADR 0001.

## Alternativas consideradas

**Manter a decisão da ADR 0001.** Descartada porque a premissa que a sustentava — "trocar
quebra links compartilhados" — deixou de ser verdadeira assim que se usa o redirect nativo
da Vercel em vez de simplesmente remover o domínio antigo.

**Remover o domínio antigo em vez de redirecionar.** Era a opção mais "limpa", mas
reintroduzia exatamente o risco que a ADR 0001 queria evitar, sem benefício adicional sobre
o redirect.
