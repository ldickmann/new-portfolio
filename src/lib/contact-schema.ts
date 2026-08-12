import { z } from "zod";

/**
 * Schema do formulário de contato, usado pelo `ContactSection` via `zodResolver`.
 *
 * O envio vai direto do navegador para o Web3Forms (ver ADR 0006) — não há
 * route handler revalidando no servidor, então esta validação de cliente é a
 * única linha de defesa antes do honeypot.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe pelo menos 2 caracteres.")
    .max(80, "Máximo de 80 caracteres."),

  email: z.email("E-mail inválido."),

  message: z
    .string()
    .trim()
    .min(10, "Conte um pouco mais — pelo menos 10 caracteres.")
    .max(2000, "Máximo de 2000 caracteres."),

  /**
   * Honeypot anti-spam. Fica fora da tela e escondido de leitores de tela,
   * então só um bot preenche. Precisa chegar vazio.
   */
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
