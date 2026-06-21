import { auditLogService } from "@/src/modules/audit-logs/audit-log.service"
import {
  findIngredientById,
  updateIngredientById,
} from "@/src/modules/ingredients/ingredient.repository"
import {
  findPackagingMaterialById,
  updatePackagingMaterialById,
} from "@/src/modules/packaging-materials/packaging-material.repository"
import { connectToMongoDB } from "@/src/shared/database/mongodb"
import {
  businessRuleError,
  notFoundError,
} from "@/src/shared/errors/api-error"
import {
  convertUnitQuantity,
  type Unit,
  UNIT_CONVERSION_ERROR_MESSAGE,
} from "@/src/shared/units/units"

import { calculateUnitPriceCents, calculateWeightedAverageCostCents } from "./purchase-cost"
import { createPurchase, findPurchases } from "./purchase.repository"
import type {
  CreatePurchaseInput,
  ListPurchasesInput,
  PurchaseItem,
} from "./purchase.types"

function convertQuantityOrThrow(
  quantity: number,
  unit: Unit,
  baseUnit: Unit,
): number {
  try {
    return convertUnitQuantity(quantity, unit, baseUnit)
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === UNIT_CONVERSION_ERROR_MESSAGE
    ) {
      throw businessRuleError("Unidade incompatível.")
    }

    throw error
  }
}

export async function listPurchases(input: ListPurchasesInput) {
  await connectToMongoDB()

  return findPurchases(input)
}

export async function createPurchaseUseCase(
  input: CreatePurchaseInput,
  actor?: { userId?: string },
) {
  await connectToMongoDB()

  const purchaseItems: PurchaseItem[] = []

  for (const item of input.items) {
    if (item.itemType === "ingredient") {
      const ingredient = await findIngredientById(item.itemId)

      if (!ingredient) {
        throw notFoundError("Ingrediente não encontrado.")
      }

      if (!ingredient.isActive) {
        throw businessRuleError("Ingrediente inativo não pode ser comprado.")
      }

      const normalizedQuantity = convertQuantityOrThrow(
        item.quantity,
        item.unit,
        ingredient.baseUnit,
      )
      const unitPriceCents = calculateUnitPriceCents(
        item.totalPriceCents,
        normalizedQuantity,
      )
      const averageCostCents = calculateWeightedAverageCostCents({
        currentStockQuantity: ingredient.currentStockQuantity,
        currentAverageCostCents: ingredient.averageCostCents,
        purchasedQuantity: normalizedQuantity,
        purchaseTotalCents: item.totalPriceCents,
      })
      const updatedIngredient = await updateIngredientById(ingredient.id, {
        currentStockQuantity:
          ingredient.currentStockQuantity + normalizedQuantity,
        averageCostCents,
      })

      await auditLogService.register({
        action: "ingredient.stock_updated",
        entity: "ingredient",
        entityId: ingredient.id,
        before: {
          currentStockQuantity: ingredient.currentStockQuantity,
        },
        after: {
          currentStockQuantity: updatedIngredient?.currentStockQuantity,
        },
        userId: actor?.userId,
      })
      await auditLogService.register({
        action: "ingredient.average_cost_updated",
        entity: "ingredient",
        entityId: ingredient.id,
        before: {
          averageCostCents: ingredient.averageCostCents,
        },
        after: {
          averageCostCents: updatedIngredient?.averageCostCents,
        },
        userId: actor?.userId,
      })

      purchaseItems.push({
        itemType: item.itemType,
        itemId: ingredient.id,
        nameSnapshot: ingredient.name,
        quantity: item.quantity,
        unit: item.unit,
        normalizedQuantity,
        normalizedUnit: ingredient.baseUnit,
        totalPriceCents: item.totalPriceCents,
        unitPriceCents,
      })
    }

    if (item.itemType === "packaging_material") {
      const material = await findPackagingMaterialById(item.itemId)

      if (!material) {
        throw notFoundError("Material não encontrado.")
      }

      if (!material.isActive) {
        throw businessRuleError("Material inativo não pode ser comprado.")
      }

      const normalizedQuantity = convertQuantityOrThrow(
        item.quantity,
        item.unit,
        "un",
      )
      const unitCostCents = calculateUnitPriceCents(
        item.totalPriceCents,
        normalizedQuantity,
      )
      const updatedMaterial = await updatePackagingMaterialById(material.id, {
        currentStockQuantity:
          material.currentStockQuantity + normalizedQuantity,
        unitCostCents,
      })

      await auditLogService.register({
        action: "packaging.stock_updated",
        entity: "packaging_material",
        entityId: material.id,
        before: {
          currentStockQuantity: material.currentStockQuantity,
        },
        after: {
          currentStockQuantity: updatedMaterial?.currentStockQuantity,
        },
        userId: actor?.userId,
      })
      await auditLogService.register({
        action: "packaging.unit_cost_updated",
        entity: "packaging_material",
        entityId: material.id,
        before: {
          unitCostCents: material.unitCostCents,
        },
        after: {
          unitCostCents: updatedMaterial?.unitCostCents,
        },
        userId: actor?.userId,
      })

      purchaseItems.push({
        itemType: item.itemType,
        itemId: material.id,
        nameSnapshot: material.name,
        quantity: item.quantity,
        unit: item.unit,
        normalizedQuantity,
        normalizedUnit: "un",
        totalPriceCents: item.totalPriceCents,
        unitPriceCents: unitCostCents,
      })
    }
  }

  const totalAmountCents = purchaseItems.reduce(
    (total, item) => total + item.totalPriceCents,
    0,
  )
  const purchase = await createPurchase({
    purchaseDate: input.purchaseDate,
    supplierName: input.supplierName,
    items: purchaseItems,
    totalAmountCents,
    notes: input.notes,
  })

  await auditLogService.register({
    action: "purchase.created",
    entity: "purchase",
    entityId: purchase.id,
    before: null,
    after: purchase,
    userId: actor?.userId,
  })

  return purchase
}
