# 0006 — Enviar o formulário de contato direto do navegador

- **Status:** Aceito
- **Data:** 2026-08-12

## Contexto

A primeira versão do formulário de contato passava por um route handler, `POST
/api/contact`: o navegador enviava JSON para o servidor Next.js, que validava com o
schema zod compartilhado e então repassava ao Web3Forms com a chave de acesso guardada em
`WEB3FORMS_ACCESS_KEY` (sem `NEXT_PUBLIC_`). A decisão original partia da premissa comum —
"a chave de acesso é um segredo, então fica no servidor".

Em teste local, todo envio voltava com **403 e uma página de desafio da Cloudflare**
("Just a moment...", `challenges.cloudflare.com`) em vez da resposta JSON do Web3Forms.
Adicionar `Accept` e `User-Agent` ao `fetch` do route handler não resolveu — a Cloudflare
que protege `api.web3forms.com` está identificando a requisição como tráfego de
servidor/datacenter (por fingerprint de TLS e HTTP, não só por headers), algo que não dá
para contornar de forma confiável a partir de um `fetch` do Node.

O próprio guia oficial do Web3Forms (https://docs.web3forms.com) confirma o padrão
esperado: o exemplo de referência chama `https://api.web3forms.com/submit` **direto do
componente React no navegador**, com `FormData`, sem qualquer proxy de servidor. Isso é
consistente com o modelo de segurança do Web3Forms: a chave de acesso não é um segredo de
API tradicional — é pareada a um domínio/e-mail no painel deles, e o abuso é contido por
rate limiting e filtro de spam do próprio serviço, não pelo sigilo da chave.

## Decisão

`ContactSection` chama `https://api.web3forms.com/submit` diretamente do navegador, com
`FormData`, sem passar pela nossa API. O route handler `src/app/api/contact/route.ts` foi
removido. A chave passa a se chamar `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` e é embutida no
bundle do cliente — isso é o comportamento pretendido, não um vazamento.

A validação com `src/lib/contact-schema.ts` continua rodando no cliente via `zodResolver`,
e o honeypot (`website`) continua sendo checado antes de qualquer chamada de rede — só que
agora só existe essa camada, porque não há mais servidor no meio para revalidar.

## Consequências

- O formulário volta a funcionar em qualquer ambiente, incluindo local — deixa de
  depender de a Cloudflare aceitar a origem da requisição.
- A validação de campo e o honeypot deixam de ter uma segunda camada no servidor. Um
  visitante que desabilite JavaScript ou manipule o `fetch` no console consegue burlar as
  duas — risco aceito, dado que o próprio Web3Forms já filtra spam do lado dele.
- Uma variável de ambiente muda de nome (`WEB3FORMS_ACCESS_KEY` →
  `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`) e precisa ser recriada na Vercel com o novo nome.
- Um visitante pode ler a chave de acesso no bundle JS. Isso é esperado pelo Web3Forms —
  não há como usá-la fora do fluxo de submissão do formulário deles.

## Alternativas consideradas

**Adicionar headers (`Accept`, `User-Agent`) ao `fetch` do servidor.** Foi a primeira
tentativa. Não resolveu — o bloqueio da Cloudflare não depende só de headers.

**Cloudflare Turnstile no formulário, com o servidor validando o token antes de repassar
ao Web3Forms.** Mantém a chave no servidor, mas adiciona uma dependência de terceiro
inteira (Turnstile) só para meio da própria Cloudflare aceitar uma requisição que a
Cloudflare do lado do Web3Forms ia continuar podendo rejeitar por outros motivos (IP,
reputação). Complexidade alta para um problema que o próprio provedor já resolve com o
padrão client-side.

**Trocar de provedor de formulário** (Formspree, Resend). Resolveria o problema, mas era
desproporcional a uma correção de configuração — o Web3Forms já estava configurado e
funcionando, exceto pelo caminho servidor-a-servidor.
