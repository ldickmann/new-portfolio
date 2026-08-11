# 0001 — Manter a URL da Vercel como endereço canônico

- **Status:** Aceito
- **Data:** 2026-08-10

## Contexto

O código assumia um domínio próprio que **não existe**. Em `src/app/layout.tsx`, o
`metadataBase` era resolvido assim:

```ts
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lucasdickmann.dev";
```

Uma consulta de DNS a `lucasdickmann.dev` retorna `NXDOMAIN` — sem registro A, sem NS,
sem SOA. O domínio nunca foi registrado. Como a variável `NEXT_PUBLIC_SITE_URL` também
não estava configurada na Vercel, o fallback vencia e a produção publicava:

```html
<meta property="og:url" content="https://lucasdickmann.dev"/>
```

Ou seja: todo link compartilhado no LinkedIn ou no WhatsApp declarava como URL canônica
um endereço que não resolve. O README agravava o problema — a linha `🌐 Website:` estava
vazia, mas um badge apontava para o mesmo domínio inexistente.

## Decisão

O endereço canônico do site é **`https://new-portfolio-mu-sandy.vercel.app`**, a URL de
produção que já existe. Nenhum domínio será comprado nesta etapa, e o projeto na Vercel
**não** será renomeado.

O valor vive em **um único lugar** — a variável de ambiente `NEXT_PUBLIC_SITE_URL` — e o
fallback no código aponta para o mesmo endereço.

## Consequências

- A URL canônica, o `og:url`, o `metadataBase` e o `url` do JSON-LD passam a apontar para
  um endereço que responde.
- Migrar para um domínio próprio no futuro custa **uma variável de ambiente**. Nenhum
  código precisa mudar.
- O custo é de percepção: `new-portfolio-mu-sandy.vercel.app` em um currículo parece um
  endereço de teste. É uma dívida consciente, não um descuido.
- O README precisa ser corrigido em três pontos (campo `Website`, exemplo de
  `NEXT_PUBLIC_SITE_URL` e badge de deploy), que ainda citam o domínio inexistente.

## Alternativas consideradas

**Renomear o projeto na Vercel para `lucasdickmann.vercel.app`.** Grátis e imediato,
resolveria a percepção de "URL de teste". Descartado porque a URL atual já pode ter sido
compartilhada em candidaturas, e renomear a quebraria sem aviso.

**Registrar `lucasdickmann.dev`.** Custa cerca de US$ 12–15/ano em um registrador a preço
de custo. É a solução definitiva, mas envolve uma compra que fica para depois. A decisão
acima foi desenhada para que essa migração seja trivial quando acontecer.
