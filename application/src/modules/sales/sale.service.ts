import { auditLogService } from "@/src/modules/audit-logs/audit-log.service"
import { findProductById } from "@/src/modules/products/product.repository"
import { connectToMongoDB } from "@/src/shared/database/mongodb"
import {
  businessRuleError,
  notFoundError,
} from "@/src/shared/errors/api-error"

import { calculateSaleTotals } from "./sale-calculation"
import { createSale, findSales } from "./sale.repository"
import type {
  CreateSaleInput,
  ListSalesInput,
  SaleItem,
} from "./sale.types"

type Actor = {
  userId?: string
}

async function buildSaleItems(
  input: CreateSaleInput["items"],
): Promise<SaleItem[]> {
  const saleItems: SaleItem[] = []

  for (const item of input) {
    const product = await findProductById(item.productId)

    if (!product) {
      throw notFoundError("Produto não encontrado.")
    }

    if (!product.isActive) {
      throw businessRuleError("Produto inativo não pode ser vendido.")
    }

    const unitPriceCents = item.unitPriceCents ?? product.salePriceCents
    const costSnapshotCents = product.calculatedCostCents
    const [calculatedItem] = calculateSaleTotals(
      [
        {
          quantity: item.quantity,
          unitPriceCents,
          costSnapshotCents,
        },
      ],
      0,
    ).items

    saleItems.push({
      productId: product.id,
      nameSnapshot: product.name,
      quantity: item.quantity,
      unitPriceCents,
      costSnapshotCents,
      totalPriceCents: calculatedItem.totalPriceCents,
      estimatedProfitCents: calculatedItem.estimatedProfitCents,
    })
  }

  return saleItems
}

export async function listSales(input: ListSalesInput) {
  await connectToMongoDB()

  return findSales(input)
}

export async function createSaleUseCase(
  input: CreateSaleInput,
  actor?: Actor,
) {
  await connectToMongoDB()

  const items = await buildSaleItems(input.items)
  const totals = calculateSaleTotals(
    items.map((item) => ({
      quantity: item.quantity,
      unitPriceCents: item.unitPriceCents,
      costSnapshotCents: item.costSnapshotCents,
    })),
    input.discountCents,
  )
  const sale = await createSale({
    saleDate: input.saleDate,
    items,
    grossTotalCents: totals.grossTotalCents,
    discountCents: totals.discountCents,
    netTotalCents: totals.netTotalCents,
    estimatedCostCents: totals.estimatedCostCents,
    estimatedGrossProfitCents: totals.estimatedGrossProfitCents,
    paymentMethod: input.paymentMethod,
    salesChannel: input.salesChannel,
    notes: input.notes ?? null,
    createdBy: actor?.userId ?? null,
  })

  await auditLogService.register({
    action: "sale.created",
    entity: "sale",
    entityId: sale.id,
    before: null,
    after: sale,
    userId: actor?.userId,
  })

  return sale
}

