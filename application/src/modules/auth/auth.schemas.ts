import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().trim().email("Email inválido.").toLowerCase(),
  password: z.string().min(1, "Senha é obrigatória."),
})
