# Marca — DLK

> **Status:** 📋 planejado — a logo existe apenas como PNG com fundo sólido. A vetorização
> e a aplicação acontecem na Etapa 3 (branch `feat/logo-dlk`).

## A marca

Um monograma **DLK**, das iniciais de **D**ickmann **L**ucas... e o **K** que fecha o
traço. A construção é geométrica: retas puras, sem curvas, com o "D" e o "K" em branco
entrelaçados e o **"L" em verde-limão** ancorado no centro inferior.

O limão não é decoração — é a única cor da marca, e por isso virou o acento primário de
toda a interface. Ver [ADR 0004](./adr/0004-limao-como-acento-primario.md).

O prefixo `--dlk-` dos design tokens vem daqui. O sistema de design leva o nome da marca
de propósito. Ver [ADR 0003](./adr/0003-design-tokens-dlk.md).

## Arquivos

| Arquivo | Uso | Situação |
|---|---|---|
| `.assets/logo-dlk.png` | Original recebido — fundo sólido `#212121`, **não** usar direto | pendente de salvar |
| `public/logo-dlk.svg` | Uso geral, fundo transparente | a criar (Etapa 3) |
| `src/components/ui/logo.tsx` | SVG inline como componente React | a criar (Etapa 3) |
| `src/app/icon.tsx` | Favicon | a criar (Etapa 3) |

**O PNG original não serve para o site.** O fundo é sólido, não transparente — sobrepor a
logo em qualquer superfície que não seja exatamente `#212121` deixa um retângulo visível.

## Regras de uso

**Cor.** No componente React, o "D" e o "K" herdam `currentColor`, então respondem à cor
de texto do contexto. O "L" mantém `var(--dlk-color-lime)` fixo — é a assinatura da marca
e não deve mudar de cor.

**Área de respiro.** Reserve, em volta da marca, no mínimo a altura da barra vertical do
"D". Nada de texto, borda ou ícone dentro dessa margem.

**Tamanho mínimo.** 24px de altura na tela. Abaixo disso o entrelaçamento do "D" com o
"K" empasta e o "L" desaparece.

**Favicon.** Monograma entrelaçado costuma virar borrão a 16px. Se isso acontecer,
produzir uma variante simplificada — apenas o "L" limão sobre o carvão da marca — usada
exclusivamente no ícone. Verificar antes de considerar a Etapa 3 concluída.

## Usos proibidos

- Recolorir o "L" para fora do limão da marca
- Aplicar o PNG de fundo sólido sobre uma superfície de cor diferente
- Distorcer a proporção (sempre escalar mantendo a razão de aspecto)
- Adicionar sombra, contorno ou gradiente à marca
- Usar a marca abaixo do tamanho mínimo em vez da variante de favicon
