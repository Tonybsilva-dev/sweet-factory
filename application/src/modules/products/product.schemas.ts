import { z } from "zod"

import { acceptedUnits } from "@/src/shared/units/units"
import { objectIdSchema } from "@/src/shared/validation/object-id"

export const productUnitSchema = z.enum(acceptedUnits, {
  message: "Unidade de medida inválida.",
})

const productIngredientSchema = z.object({
  ingredientId: objectIdSchema,
  quantity: z.number().positive("Quantidade deve ser maior que zero."),
  unit: productUnitSchema,
})

const productMaterialSchema = z.object({
  materialId: objectIdSchema,
  quantity: z.number().positive("Quantidade deve ser maior que zero."),
})

export const createProductSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório."),
  description: z.string().trim().nullable().optional(),
  category: z.string().trim().nullable().optional(),
  imageUrl: z.string().trim().url("URL de imagem inválida.").nullable().optional(),
  ingredients: z
    .array(productIngredientSchema)
    .min(1, "Produto precisa ter pelo menos um ingrediente."),
  materials: z.array(productMaterialSchema).default([]),
  recipeYield: z.number().positive("Rendimento deve ser maior que zero."),
  lossPercentage: z
    .number()
    .min(0, "Percentual de perda deve ser maior ou igual a zero.")
    .lt(100, "Percentual de perda deve ser menor que 100."),
  desiredMarginPercentage: z
    .number()
    .positive("Margem deve ser maior que 0.")
    .lt(100, "Margem deve ser menor que 100."),
  salePriceCents: z.number().int().nonnegative().optional(),
})

export const updateProductSchema = z
  .object({
    name: z.string().trim().min(1, "Nome é obrigatório.").optional(),
    description: z.string().trim().nullable().optional(),
    category: z.string().trim().nullable().optional(),
    imageUrl: z
      .string()
      .trim()
      .url("URL de imagem inválida.")
      .nullable()
      .optional(),
    ingredients: z
      .array(productIngredientSchema)
      .min(1, "Produto precisa ter pelo menos um ingrediente.")
      .optional(),
    materials: z.array(productMaterialSchema).optional(),
    recipeYield: z
      .number()
      .positive("Rendimento deve ser maior que zero.")
      .optional(),
    lossPercentage: z
      .number()
      .min(0, "Percentual de perda deve ser maior ou igual a zero.")
      .lt(100, "Percentual de perda deve ser menor que 100.")
      .optional(),
    desiredMarginPercentage: z
      .number()
      .positive("Margem deve ser maior que 0.")
      .lt(100, "Margem deve ser menor que 100.")
      .optional(),
    salePriceCents: z.number().int().nonnegative().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "Informe ao menos um campo para atualizar.",
  })

export const listProductsSchema = z.object({
  search: z.string().trim().optional(),
  category: z.string().trim().optional(),
  isActive: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),
})

export const recalculateProductPriceSchema = z.object({})

