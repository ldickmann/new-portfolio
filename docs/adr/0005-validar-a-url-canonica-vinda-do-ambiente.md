# 0005 — Validar a URL canônica vinda do ambiente

- **Status:** Aceito
- **Data:** 2026-08-10

## Contexto

A máquina de desenvolvimento tinha `NEXT_PUBLIC_SITE_URL=https://belezuura.com.br`
exportada no **ambiente do sistema operacional** — não em `.env.local`, não em nenhum
arquivo do repositório. Sobra de outro projeto do mesmo desenvolvedor.

Três propriedades se combinaram para tornar isso perigoso:

1. O Next **embute** variáveis `NEXT_PUBLIC_*` no bundle em tempo de build.
2. O dotenv **não sobrescreve** o que já está em `process.env`. Ou seja, colocar o valor
   certo no `.env.local` não teria adiantado — a variável do sistema vence.
3. O código confiava no valor sem verificar nada:
   `process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK`.

Resultado: **todo build local do portfólio declarava `belezuura.com.br` como a URL
canônica de todas as páginas, inclusive da home** — e sem nenhum sinal. Publicar assim
diria ao Google que as páginas do portfólio são duplicatas de outro site, o que
transferiria a autoridade de indexação para lá.

O problema de fundo é o nome: `NEXT_PUBLIC_SITE_URL` é genérico o bastante para colidir
entre projetos na mesma máquina. Tratar seu conteúdo como confiável é ingênuo.

## Decisão

A resolução da URL canônica passa por `src/lib/site-url.ts`, que **valida o host** contra
uma lista dos endereços que de fato servem este portfólio antes de aceitá-lo. Host fora
da lista é ignorado, com aviso explícito no build, e o fallback assume.

A lista inclui a URL de produção, `*.vercel.app` (deploys de preview têm host gerado),
`localhost` e `lucasdickmann.dev`, previsto para quando o domínio for registrado.

**Modo de falha: avisar e usar o fallback, não derrubar o build.** Um canonical correto
com aviso é melhor que um deploy bloqueado. O que precisava se tornar impossível era o
valor errado passar despercebido — e isso está resolvido.

## Consequências

- Nenhuma variável de ambiente estranha consegue mais virar canonical, seja este
  vazamento ou o próximo.
- Conectar um domínio novo exige adicioná-lo a `ALLOWED_HOSTS`. Isso é intencional: a URL
  canônica é consequente demais para mudar por acidente de ambiente. É uma linha de
  código, num arquivo documentado.
- O aviso aparece uma vez por página renderizada no build, o que polui um pouco a saída
  enquanto a variável do SO existir. É desconforto proposital.
- **A variável do sistema continua lá.** Esta decisão protege este projeto; ela não
  remove a causa. Removê-la é alteração de configuração do sistema operacional, e cabe ao
  desenvolvedor — inclusive porque o projeto Belezuura pode depender dela localmente.
  Ver [DEPLOY.md](../DEPLOY.md).

## Alternativas consideradas

**Colocar o valor certo no `.env.local`.** Foi a primeira ideia e **não funciona**: o
dotenv não sobrescreve variáveis já presentes em `process.env`, então a do sistema
continuaria vencendo.

**Renomear para uma variável específica do projeto** (`PORTFOLIO_SITE_URL`). Elimina a
colisão de nomes na raiz. Descartado por perder a convenção que a Vercel e a comunidade
Next reconhecem, e por só empurrar o problema: qualquer nome pode colidir, e a validação
protege contra todos os casos, não só contra este.

**Derrubar o build quando o host não estiver na lista.** Mais rigoroso. Descartado porque
transformaria um erro de ambiente local em deploy quebrado, inclusive em previews — custo
alto para um risco que o aviso mais o fallback já neutralizam.
