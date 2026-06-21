import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().trim().email("Email inválido.").toLowerCase(),
  password: z.string().min(1, "Senha é obrigatória."),
})

export const requestPasswordRecoverySchema = z.object({
  email: z.string().trim().email("Email inválido.").toLowerCase(),
})

export const verifyPasswordRecoverySchema = z.object({
  token: z.string().trim().min(1, "Token é obrigatório."),
})

export const resetPasswordSchema = z
  .object({
    token: z.string().trim().min(1, "Token é obrigatório."),
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres."),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória."),
  })
  .superRefine((input, context) => {
    if (input.password !== input.confirmPassword) {
      context.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Senha e confirmação devem ser iguais.",
      })
    }
  })
