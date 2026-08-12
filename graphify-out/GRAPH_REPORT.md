# Graph Report - .  (2026-08-12)

## Corpus Check
- Corpus is ~23,210 words - fits in a single context window. You may not need a graph.

## Summary
- 410 nodes · 547 edges · 29 communities (20 shown, 9 thin omitted)
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 64 edges (avg confidence: 0.86)
- Token cost: 370,055 input · 0 output

## Community Hubs (Navigation)
- Estado do projeto e pendencias
- Dependencias do package.json
- Regras de conteudo e integracoes
- Componentes React e primitivos UI
- Configuracao do TypeScript
- Scripts e devDependencies
- ADRs - decisoes de arquitetura
- Dados de projetos e acentos
- Configuracao do shadcn
- Paginas, secoes e formulario
- Layout raiz e URL canonica
- Fluxo de trabalho e verificacao
- SEO, metadata e variaveis
- Favicon SVG e proveniencia
- Icone PWA 512x512
- Manifest PWA
- Icone PWA 192x192
- Apple touch icon
- Favicon PNG icon1
- Documentacao como entrega
- Servidores MCP configurados
- Skip link e navegacao por teclado
- Movimento e duracao centralizada
- Uso da marca DLK
- Pin do ESLint 9
- Config do ESLint
- Config do Next.js
- Config do PostCSS
- Reorganizacao do CLAUDE.md

## God Nodes (most connected - your core abstractions)
1. `cn()` - 33 edges
2. `compilerOptions` - 16 edges
3. `buttonVariants` - 8 edges
4. `Chat LuksAI sobre Gemini` - 8 edges
5. `Índice da documentação do portfólio` - 8 edges
6. `Processo de ADR do projeto` - 8 edges
7. `include` - 7 edges
8. `tailwind` - 6 edges
9. `aliases` - 6 edges
10. `Badge()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Chat LuksAI — widget flutuante sobre POST /api/chat` --semantically_similar_to--> `Chat LuksAI sobre Gemini`  [INFERRED] [semantically similar]
  README.md → .claude/rules/integracoes.md
- `Lacunas de SEO: sem sitemap.ts, robots.ts e OG image` --semantically_similar_to--> `Estado conhecido — lacunas fáceis de reintroduzir`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `Formulário de contato Zod + React Hook Form via Web3Forms` --semantically_similar_to--> `Formulário de contato via Web3Forms`  [INFERRED] [semantically similar]
  README.md → .claude/rules/integracoes.md
- `Sem tailwind.config.*: configuração vive em globals.css` --conceptually_related_to--> `Tokens --dlk- em duas camadas (primitiva e ponte @theme)`  [INFERRED]
  README.md → .claude/rules/ui-e-design-system.md
- `Catálogo de projetos: bento na home e página de detalhe` --shares_data_with--> `projects.ts como fonte única de conteúdo`  [EXTRACTED]
  README.md → .claude/rules/conteudo-e-dados.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Mesma biografia mantida em projects.ts, metadata do layout e systemPrompt do chat** — _claude_rules_conteudo_e_dados_biografia_em_tres_lugares, _claude_rules_conteudo_e_dados_projects_ts_fonte_unica, _claude_rules_conteudo_e_dados_systemprompt_chat, _claude_rules_conteudo_e_dados_data_de_formatura_dezembro_2026 [EXTRACTED 1.00]
- **Cadeia do design system: primitiva --dlk-, ponte @theme, tokens shadcn e ACCENT_CLASSES** — _claude_rules_ui_e_design_system_tokens_dlk_duas_camadas, _claude_rules_ui_e_design_system_namespaces_theme_tailwind_v4, _claude_rules_ui_e_design_system_tokens_shadcn_apontam_para_dlk, _claude_rules_ui_e_design_system_accent_classes, claude_proibicao_de_valores_literais_em_componente [EXTRACTED 1.00]
- **Garantia de qualidade totalmente manual: sem testes, sem CI, build mais conferência no navegador** — claude_verificacao_minima, claude_ausencia_de_testes_automatizados, readme_ausencia_de_ci, readme_scripts_npm [INFERRED 0.85]
- **Bloqueadores de WCAG 2.1 AA no portfólio** — docs_accessibility_ausencia_prefers_reduced_motion, docs_accessibility_chat_inacessivel_leitor_de_tela, docs_accessibility_contraste_insuficiente, docs_accessibility_ausencia_de_skip_link, docs_accessibility_semantica_de_botao_perdida_em_links [EXTRACTED 1.00]
- **Cadeia da URL canônica: variável de ambiente, vazamento do SO, metadata e validação** — docs_deploy_variaveis_de_ambiente, docs_deploy_vazamento_da_variavel_do_so, docs_seo_url_canonica, docs_changelog_metadatabase_dominio_inexistente, docs_seo_validacao_de_metadata [INFERRED 0.95]
- **Pipeline de conteúdo dos projetos: fonte única, bento por índice, rota SSG e metadata** — docs_content_fonte_unica_de_projetos, docs_content_bento_posiciona_por_indice, docs_content_accent_union_fechado, docs_architecture_fluxo_de_dados_de_projetos, docs_seo_metadata_por_projeto [EXTRACTED 1.00]
- **Resolução da URL canônica: vazamento, validação e troca de domínio** — docs_adr_0001_manter_url_vercel_url_canonica_vercel, docs_adr_0005_validar_a_url_canonica_vinda_do_ambiente_allowlist_de_hosts, docs_adr_0005_validar_a_url_canonica_vinda_do_ambiente_vazamento_next_public_site_url, docs_adr_0007_trocar_para_lucasdickmann_vercel_app_redirect_307, docs_adr_0001_manter_url_vercel_lucasdickmann_dev_nxdomain [INFERRED 0.85]
- **Identidade visual DLK: tokens, ponte Tailwind e acento limão** — docs_adr_0003_design_tokens_dlk_tokens_dlk_duas_camadas, docs_adr_0003_design_tokens_dlk_ponte_theme_inline, docs_adr_0003_design_tokens_dlk_regra_sem_hex_em_componente, docs_adr_0004_limao_como_acento_primario_limao_acento_primario, docs_adr_0004_limao_como_acento_primario_remapeamento_acentos_projetos [EXTRACTED 1.00]
- **Marca do portfólio: monograma DK vazado, fundo quase-preto e acento verde-limão atuando juntos como sistema visual** — public_web_app_manifest_192x192_monograma_dk, public_web_app_manifest_192x192_fundo_escuro, public_web_app_manifest_192x192_acento_verde, public_web_app_manifest_192x192_icon [INFERRED 0.85]
- **Brand Mark Composition: dark surface, monoline DK letterform, lime accent** — public_web_app_manifest_512x512_dark_surface_background, public_web_app_manifest_512x512_dk_monogram, public_web_app_manifest_512x512_lime_accent, public_web_app_manifest_512x512_monoline_geometry [INFERRED 0.85]
- **Icon visual composition: charcoal field + white DLK monogram + lime chevron** — src_app_apple_icon_dark_charcoal_field, src_app_apple_icon_dlk_monogram_mark, src_app_apple_icon_lime_accent_chevron, src_app_apple_icon_apple_touch_icon [EXTRACTED 1.00]
- **Identidade visual do favicon: monograma DLK em bitmap dentro de invólucro SVG** — src_app_icon0_svg, src_app_icon0_bitmap_jpeg_embutido, src_app_icon0_monograma_dlk, src_app_icon0_paleta_grafite_e_lima [EXTRACTED 1.00]
- **Identidade visual do ícone: monograma + paleta grafite/branco + acento verde** — src_app_icon1_icon1_png, src_app_icon1_monograma_dk, src_app_icon1_paleta_grafite_branco, src_app_icon1_acento_verde_lima [INFERRED 0.85]

## Communities (29 total, 9 thin omitted)

### Community 0 - "Estado do projeto e pendencias"
Cohesion: 0.05
Nodes (49): Base semântica existente (landmarks, hierarquia de títulos, aria-label), ChatWidget inacessível a leitor de tela, Contraste insuficiente (cinzas e roxo como texto), Ferramental de acessibilidade ausente (eslint-plugin-jsx-a11y, CI), Meta WCAG 2.1 nível AA, Semântica de botão perdida em links (Base UI nativeButton), App Router com Server Components por padrão, Dependências instaladas e não utilizadas (ai SDK, next-themes) (+41 more)

### Community 1 - "Dependencias do package.json"
Cohesion: 0.05
Nodes (42): ai, @ai-sdk/google, @ai-sdk/react, @base-ui/react, class-variance-authority, clsx, framer-motion, @google/generative-ai (+34 more)

### Community 2 - "Regras de conteudo e integracoes"
Cohesion: 0.06
Nodes (41): Armadilha: ProjectsBento posiciona cards por índice do array, Biografia duplicada em três lugares e divergente, Data de formatura correta: dezembro de 2026, projects.ts como fonte única de conteúdo, Rota estática /projects/<slug> gerada por generateStaticParams, systemPrompt do route handler de chat como conteúdo editorial, ADR 0006 — formulário de contato direto do navegador, Chat LuksAI sobre Gemini (+33 more)

### Community 3 - "Componentes React e primitivos UI"
Cohesion: 0.10
Nodes (31): react, react, AboutSection(), Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount() (+23 more)

### Community 4 - "Configuracao do TypeScript"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 5 - "Scripts e devDependencies"
Cohesion: 0.07
Nodes (27): babel-plugin-react-compiler, eslint, eslint-config-next, devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss (+19 more)

### Community 6 - "ADRs - decisoes de arquitetura"
Cohesion: 0.13
Nodes (24): ADR 0001 — Manter a URL da Vercel como endereço canônico, Domínio lucasdickmann.dev inexistente (NXDOMAIN), URL canônica em new-portfolio-mu-sandy.vercel.app, ADR 0002 — Separar a oferta freelance em uma rota /servicos, BelzAgent (projeto-ponte entre os dois públicos), Dois públicos com intenções incompatíveis (recrutador vs cliente freelance), Rota /servicos separada da home, ADR 0003 — Design tokens --dlk- em duas camadas (+16 more)

### Community 7 - "Dados de projetos e acentos"
Cohesion: 0.18
Nodes (15): generateMetadata(), ProjectDetailPage(), ProjectsBento(), SkillsSection(), Badge(), badgeVariants, Card(), getProjectBySlug() (+7 more)

### Community 8 - "Configuracao do shadcn"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 9 - "Paginas, secoes e formulario"
Cohesion: 0.20
Nodes (11): ADR-0006, ChatWidget(), Message, ContactSection(), HeroComponent(), NAV_LINKS, NavBar(), Button() (+3 more)

### Community 10 - "Layout raiz e URL canonica"
Cohesion: 0.19
Nodes (10): geistMono, geistSans, metadata, personJsonLd, Toaster(), ALLOWED_HOSTS, FALLBACK_SITE_URL, isAllowedHost() (+2 more)

### Community 11 - "Fluxo de trabalho e verificacao"
Cohesion: 0.25
Nodes (9): Ausência de testes automatizados, Conventional Commits, ESLint fixado em ^9 por peer do eslint-plugin-react vendorizado, Fluxo de branches feature/fix → develop → main, Verificação mínima: npm run build mais conferência manual, Ausência de CI — .github/ não existe, Deploy na Vercel com main como branch de produção, Fluxo de contribuição em cinco passos (+1 more)

### Community 12 - "SEO, metadata e variaveis"
Cohesion: 0.28
Nodes (9): metadataBase apontava para domínio inexistente (lucasdickmann.dev), Pendências de variáveis não cadastradas na Vercel, Variáveis de ambiente (GEMINI_API_KEY, WEB3FORMS_ACCESS_KEY, SITE_URL), Vazamento de NEXT_PUBLIC_SITE_URL do ambiente do Windows, JSON-LD do tipo Person (jobTitle, alumniOf UNIVALI, knowsAbout), Metadata do layout (title template, openGraph, twitter), summary_large_image declarado sem imagem OG, URL canônica resolvida por NEXT_PUBLIC_SITE_URL (+1 more)

### Community 13 - "Favicon SVG e proveniencia"
Cohesion: 0.36
Nodes (8): Bitmap JPEG embutido em data URI base64 (1699x1699), Convenção de arquivo especial de ícone do App Router, Monograma DLK, Paleta grafite com acento verde-limão, Proveniência C2PA (Canva AI), RealFaviconGenerator (gerador do conjunto de favicons), icon0.svg (ícone do App Router), SVG usado apenas como invólucro de bitmap

### Community 14 - "Icone PWA 512x512"
Cohesion: 0.38
Nodes (7): Dark Charcoal Surface Background, DK Monogram Logomark, PWA App Icon 512x512, Lime Green Accent Mark, Centered Mark with Padded Safe Area, Monoline Geometric Letterform Construction, PWA Install Identity Asset

### Community 15 - "Manifest PWA"
Cohesion: 0.29
Nodes (6): background_color, display, icons, name, short_name, theme_color

### Community 16 - "Icone PWA 192x192"
Cohesion: 0.53
Nodes (6): Acento verde-limão na marca, Fundo escuro quase-preto do ícone, Ícone PWA 192x192 (web-app-manifest), Identidade visual do portfólio (marca em tema escuro com acento único), Instalação PWA / ícone de app declarado no manifest, Monograma DK (lettermark do portfólio)

### Community 17 - "Apple touch icon"
Cohesion: 0.53
Nodes (6): Next.js App Router Icon File Convention, Apple Touch Icon (apple-icon.png), Portfolio Brand Identity System (dark base + single accent), Dark Charcoal Background Field, DLK Monogram Mark, Lime Green Accent Chevron

### Community 18 - "Favicon PNG icon1"
Cohesion: 0.60
Nodes (5): Acento verde-limão em forma de folha, Convenção de arquivo especial de ícone do App Router, icon1.png — ícone do app (favicon PNG), Monograma DK (iniciais da marca pessoal), Paleta grafite + branco do ícone

### Community 19 - "Documentacao como entrega"
Cohesion: 1.00
Nodes (3): Documentação é parte da entrega, no mesmo commit, Cada documento declara seu estado (✅ 🚧 📋) no topo, Índice de docs/ com estado por documento

## Ambiguous Edges - Review These
- `Monograma DK (lettermark do portfólio)` → `Instalação PWA / ícone de app declarado no manifest`  [AMBIGUOUS]
  public/web-app-manifest-192x192.png · relation: conceptually_related_to
- `Paleta grafite com acento verde-limão` → `Convenção de arquivo especial de ícone do App Router`  [AMBIGUOUS]
  src/app/icon0.svg · relation: conceptually_related_to

## Knowledge Gaps
- **128 isolated node(s):** `graphify`, `vercel`, `$schema`, `style`, `rsc` (+123 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Monograma DK (lettermark do portfólio)` and `Instalação PWA / ícone de app declarado no manifest`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Paleta grafite com acento verde-limão` and `Convenção de arquivo especial de ícone do App Router`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `dependencies` connect `Dependencias do package.json` to `Componentes React e primitivos UI`, `Scripts e devDependencies`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Why does `react` connect `Componentes React e primitivos UI` to `Dependencias do package.json`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `FormItem()` connect `Componentes React e primitivos UI` to `Paginas, secoes e formulario`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **What connects `graphify`, `vercel`, `$schema` to the rest of the system?**
  _128 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Estado do projeto e pendencias` be split into smaller, more focused modules?**
  _Cohesion score 0.050170068027210885 - nodes in this community are weakly interconnected._