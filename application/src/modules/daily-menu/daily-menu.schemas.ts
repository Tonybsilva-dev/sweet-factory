import { z } from "zod"

import { objectIdSchema } from "@/src/shared/validation/object-id"

export const dailyMenuDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve usar formato YYYY-MM-DD.")

const dailyMenuProductSchema = z.object({
  productId: objectIdSchema,
  enabled: z.boolean().default(true),
  salePriceCents: z.number().int().nonnegative().optional(),
})

export const createDailyMenuSchema = z.object({
  date: dailyMenuDateSchema,
  products: z
    .array(dailyMenuProductSchema)
    .min(1, "Cardápio precisa ter pelo menos um produto."),
  notes: z.string().trim().nullable().optional(),
})

export const updateDailyMenuProductSchema = z
  .object({
    enabled: z.boolean().optional(),
    salePriceCents: z.number().int().nonnegative().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "Informe ao menos um campo para atualizar.",
  })

export const dailyMenuActionSchema = z.object({})

