# Acessibilidade

> **Status:** 🚧 parcial. O `README.md` da raiz afirma "Acessível — seguindo padrões
> WCAG". **Isso não se sustenta hoje.** Existe uma base semântica decente, mas faltam
> itens obrigatórios de WCAG 2.1 AA. Este documento registra a diferença de forma honesta,
> em vez de repetir a afirmação.

Meta declarada: **WCAG 2.1 nível AA**.

## O que já existe ✅

**Semântica e estrutura**
- `<html lang="pt-br">` em `src/app/layout.tsx`
- Landmarks reais: `<header>`, `<nav>`, `<main>`, `<section>` com `id`, `<footer>`
- Hierarquia de títulos correta: um `h1` no Hero, `h2` por seção, `h3` nos cards

**Formulário** (`ContactSection.tsx`)
- `<Label htmlFor>` associado corretamente aos três campos
- `focus-visible:ring-*` nos inputs

**Links e rótulos**
- `rel="noopener noreferrer"` em todos os links externos
- `aria-label` em 6 pontos: GitHub e LinkedIn no Hero, botão do menu mobile, e os três
  links de card no bento (`Ver detalhes de ${title}`)
- `aria-hidden="true"` no SVG decorativo do LinkedIn

**Foco**
- Os primitivos shadcn (`button`, `badge`, `input`, `textarea`) trazem
  `focus-visible:ring-3 focus-visible:ring-ring/50`

## O que falta 📋

Ordenado por gravidade.

### Bloqueadores de AA

| Item | Onde | Critério |
|---|---|---|
| **Sem `prefers-reduced-motion`** | Framer Motion anima em 6 componentes; zero ocorrências de `useReducedMotion` ou da media query no projeto | 2.3.3 |
| **Chat inacessível a leitor de tela** | `ChatWidget.tsx` — a lista de mensagens não tem `role="log"` nem `aria-live`, então **a resposta do bot nunca é anunciada** | 4.1.3 |
| **Botões do chat sem nome acessível** | `ChatWidget.tsx:131` (abrir), `:83` (fechar), `:119` (enviar) — nenhum tem `aria-label`; são só ícones | 4.1.2 |
| **Input do chat sem rótulo** | `ChatWidget.tsx` — só `placeholder`, que não é rótulo | 3.3.2 |
| **Foco removido sem substituto** | `ChatWidget.tsx:117` usa `focus:outline-none` e troca só a cor da borda | 2.4.7 |
| **Contraste insuficiente** | `text-gray-500` / `text-gray-600` sobre `#050505`: rodapé (`page.tsx:35`), `ProjectsBento.tsx:167`, `ContactSection.tsx:35`. E o roxo `#bc13fe` como cor de **texto** | 1.4.3 |

### Importantes

| Item | Onde | Critério |
|---|---|---|
| **Sem skip link** | Nenhuma ocorrência de "pular para o conteúdo" no projeto | 2.4.1 |
| **Estado do menu mobile não é exposto** | `NavBar.tsx:82` — falta `aria-expanded` / `aria-controls`, e o `aria-label` continua "Abrir menu" mesmo com o menu aberto | 4.1.2 |
| **Sem fechar com `Esc`** | Painel do chat e menu mobile | 2.1.2 |
| **Sem gestão de foco** | Ao abrir o chat o foco não vai para dentro; ao fechar não volta ao gatilho | 2.4.3 |
| **Semântica de botão perdida em links** | `projects/[slug]/page.tsx` — três `<Button render={<Link/>}>` / `<Button render={<a/>}>` sem `nativeButton={false}`. O Base UI registra o erro no console: *"Rendering a non-`<button>` removes native button semantics, which can impact forms and accessibility"* | 4.1.2 |

### Ferramental

- **`eslint-plugin-jsx-a11y` não está instalado.** Só existe o subconjunto embutido no
  `core-web-vitals` do Next, que é bem mais raso.
- Nenhuma verificação automatizada de acessibilidade no CI — que também não existe.

## Nota sobre o design system

A centralização de `--dlk-duration-base` (ver [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md))
resolve `prefers-reduced-motion` de forma econômica: zerar a duração numa media query
atinge todas as transições CSS de uma vez. Os componentes que usam Framer Motion ainda
precisam do hook `useReducedMotion` — a variável não alcança animações em JavaScript.

## Como testar

**Teclado — o teste que mais encontra problema.** Navegue o site inteiro só com `Tab`:
o skip link deve ser o primeiro foco, todo elemento interativo deve ser alcançável, o
foco nunca pode sumir, e `Esc` deve fechar chat e menu mobile.

**Movimento reduzido.** Ligue "reduzir movimento" no sistema operacional
(Windows: Configurações → Acessibilidade → Efeitos visuais) e recarregue. As animações
devem parar.

**Automatizado.** Lighthouse (aba Accessibility) no Chrome DevTools e a extensão
axe DevTools. Nenhum dos dois pega problema de foco ou de ordem de leitura — daí o teste
de teclado continuar sendo obrigatório.

**Contraste.** Não presuma: meça. Qualquer verificador de razão de contraste serve; o
alvo é 4.5:1 para texto normal e 3:1 para texto grande.
