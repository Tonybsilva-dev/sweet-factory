import { z } from "zod"

export const ingredientBaseUnitSchema = z.enum(["g", "ml", "un"], {
  message: "Unidade de medida inválida.",
})

export const createIngredientSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório."),
  baseUnit: ingredientBaseUnitSchema,
  category: z.string().trim().min(1, "Categoria é obrigatória."),
  currentStockQuantity: z.number().nonnegative().default(0),
  averageCostCents: z.number().int().nonnegative().default(0),
})

export const updateIngredientSchema = z
  .object({
    name: z.string().trim().min(1, "Nome é obrigatório.").optional(),
    category: z.string().trim().min(1, "Categoria é obrigatória.").optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "Informe ao menos um campo para atualizar.",
  })

export const listIngredientsSchema = z.object({
  search: z.string().trim().optional(),
  category: z.string().trim().optional(),
  isActive: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),
})
