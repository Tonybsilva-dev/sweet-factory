import { z } from "zod"

import { objectIdSchema } from "@/src/shared/validation/object-id"
import { acceptedUnits } from "@/src/shared/units/units"

export const purchaseItemTypeSchema = z.enum([
  "ingredient",
  "packaging_material",
])

export const createPurchaseSchema = z.object({
  purchaseDate: z.coerce.date(),
  supplierName: z.string().trim().optional().nullable(),
  items: z
    .array(
      z.object({
        itemType: purchaseItemTypeSchema,
        itemId: objectIdSchema,
        quantity: z.number().positive("Quantidade deve ser maior que zero."),
        unit: z.enum(acceptedUnits, {
          message: "Unidade de medida inválida.",
        }),
        totalPriceCents: z
          .number()
          .int()
          .positive("Valor total deve ser maior que zero."),
      }),
    )
    .min(1, "Compra precisa ter ao menos um item."),
  notes: z.string().trim().optional().nullable(),
})

export const listPurchasesSchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  itemType: purchaseItemTypeSchema.optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
})
