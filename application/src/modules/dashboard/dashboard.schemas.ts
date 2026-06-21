import { z } from "zod"

export const monthlyDashboardQuerySchema = z.object({
  month: z.coerce
    .number()
    .int("Mês deve ser um número inteiro.")
    .min(1, "Mês deve ser entre 1 e 12.")
    .max(12, "Mês deve ser entre 1 e 12."),
  year: z.coerce
    .number()
    .int("Ano deve ser um número inteiro.")
    .min(1000, "Ano deve ter 4 dígitos.")
    .max(9999, "Ano deve ter 4 dígitos."),
})

