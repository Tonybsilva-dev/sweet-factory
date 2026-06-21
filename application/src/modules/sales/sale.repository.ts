import { Types } from "mongoose"

import { SaleModel } from "./sale.model"
import type { ListSalesInput, Sale, SaleItem } from "./sale.types"

type SaleItemDocumentLike = Omit<SaleItem, "productId"> & {
  productId: Types.ObjectId | string
}

type SaleDocumentLike = {
  _id: Types.ObjectId
  saleDate: Date
  items: SaleItemDocumentLike[]
  grossTotalCents: number
  discountCents: number
  netTotalCents: number
  estimatedCostCents: number
  estimatedGrossProfitCents: number
  paymentMethod: Sale["paymentMethod"]
  salesChannel: Sale["salesChannel"]
  notes?: string | null
  createdBy?: Types.ObjectId | string | null
  createdAt?: Date
  updatedAt?: Date
  toObject?: () => SaleDocumentLike
}

export type PersistSaleInput = Omit<Sale, "id" | "createdAt" | "updatedAt">

function serializeSaleItem(item: SaleItemDocumentLike): SaleItem {
  return {
    productId: item.productId.toString(),
    nameSnapshot: item.nameSnapshot,
    quantity: item.quantity,
    unitPriceCents: item.unitPriceCents,
    costSnapshotCents: item.costSnapshotCents,
    totalPriceCents: item.totalPriceCents,
    estimatedProfitCents: item.estimatedProfitCents,
  }
}

export function serializeSale(document: SaleDocumentLike): Sale {
  const sale = document.toObject ? document.toObject() : document

  return {
    id: sale._id.toString(),
    saleDate: sale.saleDate,
    items: sale.items.map(serializeSaleItem),
    grossTotalCents: sale.grossTotalCents,
    discountCents: sale.discountCents,
    netTotalCents: sale.netTotalCents,
    estimatedCostCents: sale.estimatedCostCents,
    estimatedGrossProfitCents: sale.estimatedGrossProfitCents,
    paymentMethod: sale.paymentMethod,
    salesChannel: sale.salesChannel,
    notes: sale.notes,
    createdBy: sale.createdBy?.toString() ?? null,
    createdAt: sale.createdAt,
    updatedAt: sale.updatedAt,
  }
}

export async function createSale(input: PersistSaleInput) {
  const sale = await SaleModel.create(input)

  return serializeSale(sale as SaleDocumentLike)
}

export async function findSales(filters: ListSalesInput) {
  const query: Record<string, unknown> = {}

  if (filters.startDate || filters.endDate) {
    query.saleDate = {
      ...(filters.startDate ? { $gte: filters.startDate } : {}),
      ...(filters.endDate ? { $lte: filters.endDate } : {}),
    }
  }

  if (filters.paymentMethod) {
    query.paymentMethod = filters.paymentMethod
  }

  if (filters.salesChannel) {
    query.salesChannel = filters.salesChannel
  }

  const page = filters.page ?? 1
  const limit = filters.limit ?? 50
  const sales = await SaleModel.find(query)
    .sort({ saleDate: -1, createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)

  return sales.map((sale) => serializeSale(sale as SaleDocumentLike))
}

