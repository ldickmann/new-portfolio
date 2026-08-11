# 0004 — Verde-limão da logo como acento primário

- **Status:** Aceito
- **Data:** 2026-08-10

## Contexto

A logo da marca é um monograma **DLK**: o "D" e o "K" em branco, com o "L" em
**verde-limão** no centro. Ela é a origem do prefixo `--dlk-` adotado no
[ADR 0003](./0003-design-tokens-dlk.md) — o nome do sistema de tokens é o nome da marca.

A interface, porém, tinha sido construída antes da logo, num tema cyberpunk de
**ciano** (`#00ffff`) e **roxo** (`#bc13fe`) sobre quase-preto. Aplicar a logo como
estava produziria um choque: um limão isolado no canto superior esquerdo, sem nenhuma
relação com o resto da página.

Pior, havia **um terceiro verde**. O acento do projeto E-ReceitaSUS usava `green-400`
(`#4ade80`, esmeralda), e o hover do botão de WhatsApp também. Com a logo, a página teria
dois verdes diferentes disputando a mesma tela, o que lê como erro, não como escolha.

## Decisão

**O verde-limão da logo é o acento primário da interface.** A marca manda na paleta, não
o contrário.

A paleta resultante:

| Token | Papel |
|---|---|
| `--dlk-color-lime` | **Primário** — CTAs, foco, grid, brilho, o "/" dos títulos de seção |
| `--dlk-color-purple` | Secundário |
| `--dlk-color-cyan` | Terciário, restrito a acento de projeto |
| `--dlk-color-charcoal` | Superfície — vem do fundo da própria logo |
| `--dlk-color-black` | Base da página |

O `green-400` é **retirado**: onde havia esmeralda, passa a haver limão. Isso resolve o
conflito dos dois verdes.

Os acentos dos três projetos são remapeados. Antes eram ciano / roxo / verde; com o limão
absorvendo o verde, sobrariam duas cores para três projetos. A distribuição fica:

- **BelzAgent → limão.** É o carro-chefe e sustenta a oferta comercial de `/servicos`;
  leva a cor da marca.
- **Belezuura → roxo.**
- **E-ReceitaSUS → ciano.**

Assim o ciano deixa de ser a cor do site e passa a ter um papel contido e específico.

## Consequências

- A identidade visual do site passa a ser a identidade da marca. Logo, favicon, OG image
  e interface falam a mesma língua.
- **O visual muda de forma perceptível.** Isto é uma repaginação deliberada, não uma
  refatoração invisível — comparações com capturas de tela antigas não se aplicam.
- O contraste precisa ser **recalculado, não presumido**. O limão sobre quase-preto passa
  em AA com folga, e botões `bg-dlk-lime text-black` ficam excelentes. Já o roxo
  `#bc13fe` como cor de **texto** sobre fundo escuro é provavelmente reprovado em AA — é
  um problema que já existia e que a auditoria de contraste precisa tratar.
- O hex exato do limão deve ser **amostrado do arquivo da logo**, não estimado. Enquanto
  a vetorização não acontece, o valor em uso é uma aproximação.

## Alternativas consideradas

**Manter o ciano e recolorir a logo.** Preservaria o tema atual por inteiro, e seria
trivial de implementar com um SVG usando `currentColor`. Descartado porque subordina a
marca à interface: a logo perderia a única cor que a distingue.

**Manter os dois: ciano na interface, limão só na logo.** Evitaria qualquer retrabalho
visual. Descartado por diluição — com ciano, roxo e limão competindo, a página deixa de
ter um acento e passa a ter três, o que equivale a não ter nenhum.
