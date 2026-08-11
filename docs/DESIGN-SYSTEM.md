# Design System — tokens `--dlk-`

> **Status:** 📋 planejado — este documento é a especificação alvo. A implementação
> acontece na Etapa 2 (branch `feat/design-tokens-dlk`). Enquanto ela não for mesclada,
> o `globals.css` ainda usa os tokens `cyber-*` antigos.

Todo estilo vive em `src/app/globals.css`. Componente **não** contém hex, `rgba()` nem
duração literal.

## A regra dos namespaces (leia antes de criar um token)

No Tailwind v4, o bloco `@theme` só gera classes utilitárias a partir de namespaces que o
Tailwind reconhece: `--color-*`, `--radius-*`, `--font-*`, `--spacing-*` e alguns outros.

Isso significa que **`--dlk-lime` não geraria `text-dlk-lime`** — `dlk` não é um namespace
do Tailwind. Por isso o sistema tem duas camadas. Ignorar isso é o erro mais provável de
quem mexer aqui pela primeira vez.

```css
/* CAMADA 1 — primitiva. A fonte da verdade. Fica em :root. */
:root {
  --dlk-color-lime: #b5e83a;
}

/* CAMADA 2 — ponte. Só existe para o Tailwind gerar a classe. */
@theme inline {
  --color-dlk-lime: var(--dlk-color-lime);   /* → text-dlk-lime, bg-dlk-lime, border-dlk-lime */
}
```

Use `@theme inline` (não `@theme`) para que o Tailwind resolva a referência no ponto de
uso, sem indireção extra. É o mesmo mecanismo que o shadcn já usa neste arquivo.

**Nem todo token precisa de ponte.** Duração, easing e tamanho de grid não têm namespace
no Tailwind — ficam só na Camada 1 e são consumidos via `var()` direto no CSS.

## Paleta

Ver [ADR 0004](./adr/0004-limao-como-acento-primario.md) para o porquê.

| Token | Valor | Papel |
|---|---|---|
| `--dlk-color-lime` | `#b5e83a` | **Acento primário.** CTAs, anel de foco, grid, brilho, o "/" dos títulos |
| `--dlk-color-purple` | `#bc13fe` | Secundário |
| `--dlk-color-cyan` | `#00ffff` | Terciário — **só** como acento de projeto |
| `--dlk-color-charcoal` | `#212121` | Superfície elevada. Vem do fundo da logo |
| `--dlk-color-black` | `#050505` | Base da página |
| `--dlk-color-white` | `#ffffff` | Texto principal |
| `--dlk-color-danger` | `#ff3b5c` | Erro, destrutivo |

> ⚠️ O hex do limão precisa ser **amostrado do arquivo da logo** na Etapa 3. O valor acima
> é uma aproximação visual e deve ser corrigido quando o SVG existir.

**Retirado:** `green-400` (`#4ade80`). Onde havia esmeralda, agora há limão.

### Semânticas

Prefira estas às primitivas — elas descrevem *função*, não cor, e sobrevivem a uma troca
de paleta.

| Token | Aponta para |
|---|---|
| `--dlk-accent` | `var(--dlk-color-lime)` |
| `--dlk-bg-base` | `var(--dlk-color-black)` |
| `--dlk-bg-surface` | `rgb(255 255 255 / 0.05)` |
| `--dlk-border-subtle` | `rgb(181 232 58 / 0.12)` |
| `--dlk-text-primary` | `var(--dlk-color-white)` |
| `--dlk-text-muted` | `#8a8a99` |

## Efeito, forma e movimento

| Token | Valor | Uso |
|---|---|---|
| `--dlk-glow-accent` | `0 0 10px …, 0 0 20px …` | Utilitário `neon-glow` |
| `--dlk-grid-size` | `40px` | Utilitário `bg-grid` |
| `--dlk-grid-line` | `rgb(181 232 58 / 0.05)` | Utilitário `bg-grid` |
| `--dlk-radius-card` | `1.5rem` | Cards do bento |
| `--dlk-space-section` | `6rem` | Respiro vertical entre seções |
| `--dlk-duration-base` | `500ms` | Transições e animações |
| `--dlk-ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Curva padrão |

Centralizar a duração tem um efeito colateral valioso: `prefers-reduced-motion` vira uma
regra só, em vez de uma caçada componente por componente. Ver
[ACCESSIBILITY.md](./ACCESSIBILITY.md).

## Relação com os tokens do shadcn

Os tokens do shadcn (`--background`, `--primary`, `--ring`, `--border`…) **não guardam
hex**. Eles apontam para `var(--dlk-*)`:

```css
:root {
  --primary: var(--dlk-color-lime);
  --ring:    var(--dlk-color-lime);
  --border:  var(--dlk-border-subtle);
}
```

Isso mantém os primitivos do shadcn funcionando sem criar uma segunda fonte de verdade —
e elimina a duplicação `:root` / `.dark` que existia antes.

## Do / Don't

✅ **Faça**

```tsx
<div className="bg-dlk-black text-dlk-lime border-dlk-lime/20" />
```
```css
.algo { transition-duration: var(--dlk-duration-base); }
```

❌ **Não faça**

```tsx
<div className="bg-[#050505] text-[#b5e83a]" />        {/* hex solto */}
<div style={{ boxShadow: "0 0 10px #b5e83a" }} />       {/* efeito solto */}
<div className="transition-all duration-500" />          {/* duração fora do sistema */}
```

Se um valor não existe como token e você precisa dele, **crie o token** — não improvise no
componente.
