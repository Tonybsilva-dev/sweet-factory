import { Types } from "mongoose"

import { DailyMenuModel } from "./daily-menu.model"
import type { DailyMenu, DailyMenuProduct } from "./daily-menu.types"

type DailyMenuProductDocumentLike = Omit<DailyMenuProduct, "productId"> & {
  productId: Types.ObjectId | string
}

type DailyMenuDocumentLike = {
  _id: Types.ObjectId
  date: string
  status: DailyMenu["status"]
  products: DailyMenuProductDocumentLike[]
  notes?: string | null
  createdBy?: Types.ObjectId | string | null
  createdAt?: Date
  updatedAt?: Date
  toObject?: () => DailyMenuDocumentLike
}

export type PersistDailyMenuInput = Omit<
  DailyMenu,
  "id" | "createdAt" | "updatedAt"
>

function serializeDailyMenuProduct(
  product: DailyMenuProductDocumentLike,
): DailyMenuProduct {
  return {
    productId: product.productId.toString(),
    nameSnapshot: product.nameSnapshot,
    enabled: product.enabled,
    salePriceCents: product.salePriceCents,
    costSnapshotCents: product.costSnapshotCents,
  }
}

export function serializeDailyMenu(document: DailyMenuDocumentLike): DailyMenu {
  const dailyMenu = document.toObject ? document.toObject() : document

  return {
    id: dailyMenu._id.toString(),
    date: dailyMenu.date,
    status: dailyMenu.status,
    products: dailyMenu.products.map(serializeDailyMenuProduct),
    notes: dailyMenu.notes,
    createdBy: dailyMenu.createdBy?.toString() ?? null,
    createdAt: dailyMenu.createdAt,
    updatedAt: dailyMenu.updatedAt,
  }
}

export async function createDailyMenu(input: PersistDailyMenuInput) {
  const dailyMenu = await DailyMenuModel.create(input)

  return serializeDailyMenu(dailyMenu as DailyMenuDocumentLike)
}

export async function findDailyMenuByDate(date: string) {
  const dailyMenu = await DailyMenuModel.findOne({ date })

  return dailyMenu ? serializeDailyMenu(dailyMenu as DailyMenuDocumentLike) : null
}

export async function findDailyMenuById(id: string) {
  const dailyMenu = await DailyMenuModel.findById(id)

  return dailyMenu ? serializeDailyMenu(dailyMenu as DailyMenuDocumentLike) : null
}

export async function updateDailyMenuById(
  id: string,
  input: Partial<PersistDailyMenuInput>,
) {
  const dailyMenu = await DailyMenuModel.findByIdAndUpdate(id, input, {
    new: true,
  })

  return dailyMenu ? serializeDailyMenu(dailyMenu as DailyMenuDocumentLike) : null
}

