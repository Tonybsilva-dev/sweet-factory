import { Types } from "mongoose"

import { PurchaseModel } from "./purchase.model"
import type {
  ListPurchasesInput,
  Purchase,
  PurchaseItem,
} from "./purchase.types"

type PurchaseDocumentLike = {
  _id: Types.ObjectId
  purchaseDate: Date
  supplierName?: string | null
  items: Array<
    Omit<PurchaseItem, "itemId"> & {
      itemId: Types.ObjectId
    }
  >
  totalAmountCents: number
  notes?: string | null
  createdBy?: Types.ObjectId
  createdAt?: Date
  toObject?: () => PurchaseDocumentLike
}

export function serializePurchase(document: PurchaseDocumentLike): Purchase {
  const purchase = document.toObject ? document.toObject() : document

  return {
    id: purchase._id.toString(),
    purchaseDate: purchase.purchaseDate,
    supplierName: purchase.supplierName,
    items: purchase.items.map((item) => ({
      ...item,
      itemId: item.itemId.toString(),
    })),
    totalAmountCents: purchase.totalAmountCents,
    notes: purchase.notes,
    createdBy: purchase.createdBy?.toString(),
    createdAt: purchase.createdAt,
  }
}

export async function createPurchase(input: Omit<Purchase, "id" | "createdAt">) {
  const purchase = await PurchaseModel.create(input)

  return serializePurchase(purchase as PurchaseDocumentLike)
}

export async function findPurchases(input: ListPurchasesInput) {
  const query: Record<string, unknown> = {}

  if (input.startDate || input.endDate) {
    query.purchaseDate = {
      ...(input.startDate ? { $gte: input.startDate } : {}),
      ...(input.endDate ? { $lte: input.endDate } : {}),
    }
  }

  if (input.itemType) {
    query["items.itemType"] = input.itemType
  }

  const purchases = await PurchaseModel.find(query)
    .sort({ purchaseDate: -1 })
    .skip((input.page - 1) * input.limit)
    .limit(input.limit)

  return purchases.map((purchase) =>
    serializePurchase(purchase as PurchaseDocumentLike),
  )
}
