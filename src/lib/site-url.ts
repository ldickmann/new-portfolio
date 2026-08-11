/**
 * Resolução da URL canônica do site.
 *
 * Existe por causa de um incidente real: a máquina de desenvolvimento tinha
 * `NEXT_PUBLIC_SITE_URL=https://belezuura.com.br` exportada no ambiente do
 * sistema operacional, sobra de outro projeto. Como o Next embute variáveis
 * `NEXT_PUBLIC_*` no build e o dotenv **não** sobrescreve o que já está em
 * `process.env`, nem o `.env.local` nem o fallback do código venciam — todo
 * build local declarava o domínio de outro site como canônico do portfólio,
 * em silêncio.
 *
 * O nome `NEXT_PUBLIC_SITE_URL` é genérico o bastante para colidir entre
 * projetos, então tratar o valor como confiável é ingênuo. Aqui ele é
 * validado contra os hosts que de fato servem este portfólio; qualquer outra
 * coisa é ignorada com aviso, e o fallback assume.
 *
 * O modo de falha é deliberado: avisar e usar o fallback, em vez de derrubar
 * o build. Um canonical correto com aviso é melhor que um deploy bloqueado —
 * e o que precisava ser impossível era o valor errado passar despercebido.
 *
 * Ver docs/adr/0001-manter-url-vercel.md e docs/DEPLOY.md.
 */

/** Usado quando a variável está ausente ou não passa na validação. */
export const FALLBACK_SITE_URL = "https://new-portfolio-mu-sandy.vercel.app";

/**
 * Hosts que legitimamente servem este portfólio.
 *
 * Ao conectar um domínio próprio, adicione-o aqui — é de propósito que isso
 * seja um ato deliberado: a URL canônica é consequente demais para mudar por
 * acidente de ambiente.
 */
const ALLOWED_HOSTS = new Set([
  "new-portfolio-mu-sandy.vercel.app",
  "lucasdickmann.dev",
  "www.lucasdickmann.dev",
  "localhost",
  "127.0.0.1",
]);

function isAllowedHost(hostname: string): boolean {
  // `*.vercel.app` cobre os deploys de preview, que têm host gerado.
  return ALLOWED_HOSTS.has(hostname) || hostname.endsWith(".vercel.app");
}

/**
 * Valida a URL vinda do ambiente e devolve uma que se pode publicar.
 *
 * @param raw Valor bruto; por padrão, `process.env.NEXT_PUBLIC_SITE_URL`.
 */
export function resolveSiteUrl(
  raw: string | undefined = process.env.NEXT_PUBLIC_SITE_URL
): string {
  if (!raw) return FALLBACK_SITE_URL;

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    console.warn(
      `[site-url] NEXT_PUBLIC_SITE_URL não é uma URL válida (${raw}). ` +
        `Usando ${FALLBACK_SITE_URL}.`
    );
    return FALLBACK_SITE_URL;
  }

  if (!isAllowedHost(parsed.hostname)) {
    console.warn(
      `[site-url] NEXT_PUBLIC_SITE_URL aponta para "${parsed.hostname}", que não ` +
        `serve este portfólio — provavelmente uma variável de ambiente vazando de ` +
        `outro projeto. Ignorando e usando ${FALLBACK_SITE_URL}. Se este host for ` +
        `legítimo, adicione-o a ALLOWED_HOSTS em src/lib/site-url.ts.`
    );
    return FALLBACK_SITE_URL;
  }

  // Normaliza: sem barra final, para não gerar canonical com "//".
  return raw.replace(/\/$/, "");
}

/** URL canônica já validada. É esta que o metadata deve consumir. */
export const siteUrl = resolveSiteUrl();
