import { auditLogService } from "@/src/modules/audit-logs/audit-log.service"
import { findProductById } from "@/src/modules/products/product.repository"
import { connectToMongoDB } from "@/src/shared/database/mongodb"
import {
  businessRuleError,
  conflictError,
  notFoundError,
} from "@/src/shared/errors/api-error"

import {
  createDailyMenu,
  findDailyMenuByDate,
  findDailyMenuById,
  updateDailyMenuById,
} from "./daily-menu.repository"
import type {
  CreateDailyMenuInput,
  DailyMenuProduct,
  UpdateDailyMenuProductInput,
} from "./daily-menu.types"

type Actor = {
  userId?: string
}

async function buildDailyMenuProduct(
  input: CreateDailyMenuInput["products"][number],
): Promise<DailyMenuProduct> {
  const product = await findProductById(input.productId)

  if (!product) {
    throw notFoundError("Produto não encontrado.")
  }

  if (!product.isActive) {
    throw businessRuleError("Produto inativo não pode ser adicionado ao cardápio.")
  }

  return {
    productId: product.id,
    nameSnapshot: product.name,
    enabled: input.enabled ?? true,
    salePriceCents: input.salePriceCents ?? product.salePriceCents,
    costSnapshotCents: product.calculatedCostCents,
  }
}

async function buildDailyMenuProducts(
  input: CreateDailyMenuInput["products"],
): Promise<DailyMenuProduct[]> {
  const products: DailyMenuProduct[] = []

  for (const product of input) {
    products.push(await buildDailyMenuProduct(product))
  }

  return products
}

function updateMenuProduct(
  products: DailyMenuProduct[],
  productId: string,
  input: UpdateDailyMenuProductInput,
): DailyMenuProduct[] {
  let found = false

  const updatedProducts = products.map((product) => {
    if (product.productId !== productId) {
      return product
    }

    found = true

    return {
      ...product,
      enabled: input.enabled ?? product.enabled,
      salePriceCents: input.salePriceCents ?? product.salePriceCents,
    }
  })

  if (!found) {
    throw notFoundError("Produto não encontrado no cardápio.")
  }

  return updatedProducts
}

export async function getDailyMenuByDate(date: string) {
  await connectToMongoDB()

  const dailyMenu = await findDailyMenuByDate(date)

  if (!dailyMenu) {
    throw notFoundError("Cardápio não encontrado.")
  }

  return dailyMenu
}

export async function getDailyMenu(id: string) {
  await connectToMongoDB()

  const dailyMenu = await findDailyMenuById(id)

  if (!dailyMenu) {
    throw notFoundError("Cardápio não encontrado.")
  }

  return dailyMenu
}

export async function createDailyMenuUseCase(
  input: CreateDailyMenuInput,
  actor?: Actor,
) {
  await connectToMongoDB()

  const existingDailyMenu = await findDailyMenuByDate(input.date)

  if (existingDailyMenu) {
    throw conflictError("Já existe cardápio para esta data.")
  }

  const dailyMenu = await createDailyMenu({
    date: input.date,
    status: "draft",
    products: await buildDailyMenuProducts(input.products),
    notes: input.notes ?? null,
    createdBy: actor?.userId ?? null,
  })

  await auditLogService.register({
    action: "daily_menu.created",
    entity: "daily_menu",
    entityId: dailyMenu.id,
    before: null,
    after: dailyMenu,
    userId: actor?.userId,
  })

  return dailyMenu
}

export async function updateDailyMenuProductUseCase(
  id: string,
  productId: string,
  input: UpdateDailyMenuProductInput,
  actor?: Actor,
) {
  await connectToMongoDB()

  const before = await findDailyMenuById(id)

  if (!before) {
    throw notFoundError("Cardápio não encontrado.")
  }

  const products = updateMenuProduct(before.products, productId, input)
  const after = await updateDailyMenuById(id, { products })
  const updatedProduct = products.find((product) => product.productId === productId)

  await auditLogService.register({
    action: updatedProduct?.enabled
      ? "daily_menu.product_enabled"
      : "daily_menu.product_disabled",
    entity: "daily_menu",
    entityId: id,
    before,
    after,
    userId: actor?.userId,
  })

  return after
}

export async function publishDailyMenuUseCase(id: string, actor?: Actor) {
  await connectToMongoDB()

  const before = await findDailyMenuById(id)

  if (!before) {
    throw notFoundError("Cardápio não encontrado.")
  }

  const after = await updateDailyMenuById(id, { status: "published" })

  await auditLogService.register({
    action: "daily_menu.published",
    entity: "daily_menu",
    entityId: id,
    before,
    after,
    userId: actor?.userId,
  })

  return after
}

export async function closeDailyMenuUseCase(id: string, actor?: Actor) {
  await connectToMongoDB()

  const before = await findDailyMenuById(id)

  if (!before) {
    throw notFoundError("Cardápio não encontrado.")
  }

  const after = await updateDailyMenuById(id, { status: "closed" })

  await auditLogService.register({
    action: "daily_menu.closed",
    entity: "daily_menu",
    entityId: id,
    before,
    after,
    userId: actor?.userId,
  })

  return after
}
