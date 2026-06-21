export const paymentMethods = ["pix", "cash", "debit", "credit", "other"] as const

export const salesChannels = [
  "counter",
  "delivery",
  "whatsapp",
  "instagram",
  "ifood",
  "other",
] as const

export type PaymentMethod = (typeof paymentMethods)[number]

export type SalesChannel = (typeof salesChannels)[number]

export type SaleItem = {
  productId: string
  nameSnapshot: string
  quantity: number
  unitPriceCents: number
  costSnapshotCents: number
  totalPriceCents: number
  estimatedProfitCents: number
}

export type Sale = {
  id: string
  saleDate: Date
  items: SaleItem[]
  grossTotalCents: number
  discountCents: number
  netTotalCents: number
  estimatedCostCents: number
  estimatedGrossProfitCents: number
  paymentMethod: PaymentMethod
  salesChannel: SalesChannel
  notes?: string | null
  createdBy?: string | null
  createdAt?: Date
  updatedAt?: Date
}

export type CreateSaleItemInput = {
  productId: string
  quantity: number
  unitPriceCents?: number
}

export type CreateSaleInput = {
  saleDate: Date
  items: CreateSaleItemInput[]
  discountCents: number
  paymentMethod: PaymentMethod
  salesChannel: SalesChannel
  notes?: string | null
}

export type ListSalesInput = {
  startDate?: Date
  endDate?: Date
  paymentMethod?: PaymentMethod
  salesChannel?: SalesChannel
  page?: number
  limit?: number
}

