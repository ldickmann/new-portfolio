# 0002 — Separar a oferta freelance em uma rota `/servicos`

- **Status:** Aceito
- **Data:** 2026-08-10

## Contexto

O portfólio atende **dois públicos com intenções diferentes**:

1. **Recrutadores**, avaliando o candidato para vagas júnior/pleno de front-end ou
   full-stack (remoto ou híbrido em SC). Querem saber o que ele sabe fazer e se aguenta
   um time.
2. **Clientes freelance**, procurando quem construa automações e chatbots com IA. Querem
   saber qual problema ele resolve e quanto custa.

Os dois leem o mesmo texto de formas incompatíveis. "Laboratório de arquitetura para
agentes autônomos" impressiona um recrutador técnico e não diz nada para quem quer um
chatbot no site da loja. Já "faço seu atendimento automático" soa raso para quem avalia
competência de engenharia.

Até aqui o site tinha uma home única, escrita em linguagem de engenharia, sem nenhuma
chamada comercial.

## Decisão

Duas rotas, cada uma com público e SEO próprios:

- **`/`** — a home, focada em recrutador: quem é, o que construiu, com qual stack.
- **`/servicos`** — a oferta freelance: qual dor resolve, como é o processo, o que o
  cliente recebe, e um CTA direto.

Os três projetos aparecem nos dois contextos, mas com leituras diferentes. O **BelzAgent**
faz a ponte: é engenharia de IA de verdade para o recrutador e, ao mesmo tempo, a prova
prática da oferta de `/servicos`.

## Consequências

- Existe uma URL específica para mandar a um cliente, sem que ele precise atravessar
  seções de currículo.
- Cada rota pode ser otimizada para intenções de busca distintas — `/servicos` mira
  termos comerciais ("chatbot para site", "automação com IA"), a home mira o nome próprio
  e a stack.
- São duas páginas para manter em vez de uma. Mudanças de posicionamento precisam ser
  aplicadas nos dois lugares.
- O conteúdo dos projetos continua vindo de `src/data/projects.ts`, então a duplicação de
  manutenção fica restrita ao texto de enquadramento, não aos dados.

## Alternativas consideradas

**Home única com uma faixa de serviços.** Menos trabalho, uma URL só, sem risco de
conteúdo duplicado. Descartado porque diluiria as duas mensagens numa página só e não
daria um link limpo para enviar a clientes.

**Home única, sem seção comercial.** A oferta freelance viveria apenas nos cards de
projeto e no chat LuksAI. É o caminho mais rápido, mas deixa a oferta implícita — quem
chega procurando um serviço não encontraria uma chamada para ação.
