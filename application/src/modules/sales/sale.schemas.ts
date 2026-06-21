import { z } from "zod"

import { objectIdSchema } from "@/src/shared/validation/object-id"

import { paymentMethods, salesChannels } from "./sale.types"

export const paymentMethodSchema = z.enum(paymentMethods, {
  message: "Forma de pagamento inválida.",
})

export const salesChannelSchema = z.enum(salesChannels, {
  message: "Canal de venda inválido.",
})

const createSaleItemSchema = z.object({
  productId: objectIdSchema,
  quantity: z.number().positive("Quantidade deve ser maior que zero."),
  unitPriceCents: z.number().int().nonnegative().optional(),
})

export const createSaleSchema = z.object({
  saleDate: z.coerce.date(),
  items: z
    .array(createSaleItemSchema)
    .min(1, "Venda precisa ter pelo menos um item."),
  discountCents: z.number().int().nonnegative().default(0),
  paymentMethod: paymentMethodSchema,
  salesChannel: salesChannelSchema,
  notes: z.string().trim().nullable().optional(),
})

export const listSalesSchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  paymentMethod: paymentMethodSchema.optional(),
  salesChannel: salesChannelSchema.optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(50),
})

