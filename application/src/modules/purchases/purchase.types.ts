import type { Unit } from "@/src/shared/units/units"

export type PurchaseItemType = "ingredient" | "packaging_material"

export type PurchaseItem = {
  itemType: PurchaseItemType
  itemId: string
  nameSnapshot: string
  quantity: number
  unit: Unit
  normalizedQuantity: number
  normalizedUnit: Unit
  totalPriceCents: number
  unitPriceCents: number
}

export type Purchase = {
  id: string
  purchaseDate: Date
  supplierName?: string | null
  items: PurchaseItem[]
  totalAmountCents: number
  notes?: string | null
  createdBy?: string
  createdAt?: Date
}

export type CreatePurchaseInput = {
  purchaseDate: Date
  supplierName?: string | null
  items: Array<{
    itemType: PurchaseItemType
    itemId: string
    quantity: number
    unit: Unit
    totalPriceCents: number
  }>
  notes?: string | null
}

export type ListPurchasesInput = {
  startDate?: Date
  endDate?: Date
  itemType?: PurchaseItemType
  page: number
  limit: number
}
