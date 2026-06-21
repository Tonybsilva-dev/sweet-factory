import { z } from "zod"

import { packagingMaterialTypes } from "./packaging-material.types"

export const packagingMaterialTypeSchema = z.enum(packagingMaterialTypes, {
  message: "Tipo de material inválido.",
})

export const createPackagingMaterialSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório."),
  type: packagingMaterialTypeSchema,
  currentStockQuantity: z.number().nonnegative().default(0),
  unitCostCents: z.number().int().nonnegative().default(0),
})

export const updatePackagingMaterialSchema = z
  .object({
    name: z.string().trim().min(1, "Nome é obrigatório.").optional(),
    type: packagingMaterialTypeSchema.optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "Informe ao menos um campo para atualizar.",
  })

export const listPackagingMaterialsSchema = z.object({
  search: z.string().trim().optional(),
  type: packagingMaterialTypeSchema.optional(),
  isActive: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),
})
