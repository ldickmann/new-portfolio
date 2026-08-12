# Architecture Decision Records

Um ADR registra **uma** decisão: o contexto que a forçou, o que foi decidido, e o que
isso custa. O objetivo não é documentar o óbvio — é evitar que daqui a seis meses alguém
(inclusive você) desfaça uma decisão sem saber por que ela foi tomada.

## Quando escrever um ADR

Escreva quando a resposta a "por que está assim?" **não estiver no código**. Exemplos:

- Escolher entre duas bibliotecas ou dois padrões
- Aceitar conscientemente uma limitação ("por enquanto fica assim porque…")
- Mudar uma convenção que já estava estabelecida

Não escreva para: correção de bug, ajuste de texto, mudança de estilo pontual. Isso é
`CHANGELOG.md`.

## Índice

| # | Decisão | Status |
|---|---|---|
| [0001](./0001-manter-url-vercel.md) | Manter a URL da Vercel como endereço canônico | Substituído por [0007](./0007-trocar-para-lucasdickmann-vercel-app.md) |
| [0002](./0002-rota-servicos-separada.md) | Separar a oferta freelance em `/servicos` | Aceito |
| [0003](./0003-design-tokens-dlk.md) | Design tokens `--dlk-` em duas camadas | Aceito |
| [0004](./0004-limao-como-acento-primario.md) | Verde-limão da logo como acento primário | Aceito |
| [0005](./0005-validar-a-url-canonica-vinda-do-ambiente.md) | Validar a URL canônica vinda do ambiente | Aceito |
| [0006](./0006-formulario-de-contato-direto-do-navegador.md) | Enviar o formulário de contato direto do navegador | Aceito |
| [0007](./0007-trocar-para-lucasdickmann-vercel-app.md) | Trocar a URL canônica para `lucasdickmann.vercel.app` | Aceito |

## Template

```markdown
# NNNN — Título curto no imperativo

- **Status:** Proposto | Aceito | Substituído por [NNNN](./NNNN-...) | Revogado
- **Data:** AAAA-MM-DD

## Contexto

O que estava acontecendo que exigiu uma decisão. Fatos, não opiniões.

## Decisão

O que foi decidido, em uma ou duas frases diretas.

## Consequências

O que melhora, o que piora, e o que passa a ser obrigatório por causa disso.

## Alternativas consideradas

O que foi descartado e por quê. Esta seção é a mais valiosa do documento.
```
