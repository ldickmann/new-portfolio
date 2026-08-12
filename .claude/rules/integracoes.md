---
paths:
  - "src/components/ChatWidget.tsx"
  - "src/components/ContactSection.tsx"
  - "src/app/api/chat/route.ts"
  - "src/lib/contact-schema.ts"
---

# Integrações externas

## Chat LuksAI — Gemini

O `ChatWidget` é client-side com `useState` e faz `POST /api/chat`. O route handler chama o
Gemini com o `systemInstruction` definido no servidor, usando `@google/generative-ai`
direto — não o AI SDK.

Duas limitações conscientes, não bugs:

- **Só a última mensagem é enviada** — não há histórico de conversa.
- A rota é **pública, sem rate limiting**.

A chave `GEMINI_API_KEY` fica só no servidor, sem o prefixo `NEXT_PUBLIC_`.

## Formulário de contato — Web3Forms

O `ContactSection` valida com o schema zod de `src/lib/contact-schema.ts`, via
`zodResolver` + React Hook Form, e tem honeypot anti-spam.

O envio vai **direto do navegador** para o Web3Forms, sem passar por um route handler: a
Cloudflare que protege `api.web3forms.com` bloqueia requisições servidor-a-servidor. Uma
primeira versão com `POST /api/contact` foi revertida antes de lançar por isso.

A chave do Web3Forms é pública por design do serviço — daí o prefixo
`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. Sem ela o formulário não quebra: avisa o visitante e
sugere o e-mail direto.

Ver `docs/adr/0006-formulario-de-contato-direto-do-navegador.md`.
