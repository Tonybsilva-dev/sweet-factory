import { beforeEach, describe, expect, it, vi } from "vitest"

import { auditLogService } from "@/src/modules/audit-logs/audit-log.service"
import { findIngredientById } from "@/src/modules/ingredients/ingredient.repository"
import { findPackagingMaterialById } from "@/src/modules/packaging-materials/packaging-material.repository"

import { createProduct } from "./product.repository"
import { createProductUseCase } from "./product.service"

vi.mock("@/src/shared/database/mongodb", () => ({
  connectToMongoDB: vi.fn(),
}))

vi.mock("@/src/modules/audit-logs/audit-log.service", () => ({
  auditLogService: {
    register: vi.fn(),
  },
}))

vi.mock("@/src/modules/ingredients/ingredient.repository", () => ({
  findIngredientById: vi.fn(),
}))

vi.mock("@/src/modules/packaging-materials/packaging-material.repository", () => ({
  findPackagingMaterialById: vi.fn(),
}))

vi.mock("./product.repository", () => ({
  createProduct: vi.fn(async (input) => ({
    id: "product-id",
    ...input,
  })),
  findProductById: vi.fn(),
  findProducts: vi.fn(),
  updateProductById: vi.fn(),
}))

describe("product service", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("creates product with current cost snapshots and audit log", async () => {
    vi.mocked(findIngredientById).mockResolvedValue({
      id: "ingredient-id",
      name: "Chocolate",
      baseUnit: "g",
      category: "Doces",
      currentStockQuantity: 1000,
      averageCostCents: 3,
      isActive: true,
    })
    vi.mocked(findPackagingMaterialById).mockResolvedValue({
      id: "material-id",
      name: "Pote 250ml",
      type: "packaging",
      currentStockQuantity: 100,
      unitCostCents: 80,
      isActive: true,
    })

    const product = await createProductUseCase(
      {
        name: "Mousse de Chocolate",
        description: "Pote 250ml",
        category: "Mousses",
        imageUrl: null,
        ingredients: [
          {
            ingredientId: "ingredient-id",
            quantity: 150,
            unit: "g",
          },
        ],
        materials: [
          {
            materialId: "material-id",
            quantity: 1,
          },
        ],
        recipeYield: 2,
        lossPercentage: 0,
        desiredMarginPercentage: 50,
        salePriceCents: 900,
      },
      { userId: "user-id" },
    )

    expect(createProduct).toHaveBeenCalledWith(
      expect.objectContaining({
        calculatedCostCents: 265,
        suggestedPriceCents: 530,
        salePriceCents: 900,
        ingredients: [
          expect.objectContaining({
            ingredientId: "ingredient-id",
            nameSnapshot: "Chocolate",
            normalizedQuantity: 150,
            normalizedUnit: "g",
            costSnapshotCents: 3,
          }),
        ],
        materials: [
          expect.objectContaining({
            materialId: "material-id",
            nameSnapshot: "Pote 250ml",
            unitCostSnapshotCents: 80,
          }),
        ],
      }),
    )
    expect(auditLogService.register).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "product.created",
        entity: "product",
        entityId: "product-id",
        userId: "user-id",
      }),
    )
    expect(product.id).toBe("product-id")
  })
})

