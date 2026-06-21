import { beforeEach, describe, expect, it, vi } from "vitest"

import { auditLogService } from "@/src/modules/audit-logs/audit-log.service"
import { findProductById } from "@/src/modules/products/product.repository"

import { createSale } from "./sale.repository"
import { createSaleUseCase } from "./sale.service"

vi.mock("@/src/shared/database/mongodb", () => ({
  connectToMongoDB: vi.fn(),
}))

vi.mock("@/src/modules/audit-logs/audit-log.service", () => ({
  auditLogService: {
    register: vi.fn(),
  },
}))

vi.mock("@/src/modules/products/product.repository", () => ({
  findProductById: vi.fn(),
}))

vi.mock("./sale.repository", () => ({
  createSale: vi.fn(async (input) => ({
    id: "sale-id",
    ...input,
  })),
  findSales: vi.fn(),
}))

describe("sale service", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("creates sale with product snapshots and audit log", async () => {
    vi.mocked(findProductById).mockResolvedValue({
      id: "product-id",
      name: "Mousse de Morango",
      ingredients: [],
      materials: [],
      recipeYield: 6,
      lossPercentage: 5,
      desiredMarginPercentage: 50,
      calculatedCostCents: 420,
      suggestedPriceCents: 840,
      salePriceCents: 900,
      isActive: true,
    })

    const saleDate = new Date("2026-06-21T12:00:00.000Z")
    const sale = await createSaleUseCase(
      {
        saleDate,
        items: [
          {
            productId: "product-id",
            quantity: 2,
            unitPriceCents: 950,
          },
        ],
        discountCents: 100,
        paymentMethod: "pix",
        salesChannel: "whatsapp",
        notes: "Venda teste",
      },
      { userId: "user-id" },
    )

    expect(createSale).toHaveBeenCalledWith(
      expect.objectContaining({
        saleDate,
        grossTotalCents: 1900,
        discountCents: 100,
        netTotalCents: 1800,
        estimatedCostCents: 840,
        estimatedGrossProfitCents: 960,
        createdBy: "user-id",
        items: [
          expect.objectContaining({
            productId: "product-id",
            nameSnapshot: "Mousse de Morango",
            quantity: 2,
            unitPriceCents: 950,
            costSnapshotCents: 420,
            totalPriceCents: 1900,
            estimatedProfitCents: 1060,
          }),
        ],
      }),
    )
    expect(auditLogService.register).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "sale.created",
        entity: "sale",
        entityId: "sale-id",
        userId: "user-id",
      }),
    )
    expect(sale.id).toBe("sale-id")
  })

  it("blocks inactive products", async () => {
    vi.mocked(findProductById).mockResolvedValue({
      id: "product-id",
      name: "Mousse de Morango",
      ingredients: [],
      materials: [],
      recipeYield: 6,
      lossPercentage: 5,
      desiredMarginPercentage: 50,
      calculatedCostCents: 420,
      suggestedPriceCents: 840,
      salePriceCents: 900,
      isActive: false,
    })

    await expect(
      createSaleUseCase({
        saleDate: new Date("2026-06-21T12:00:00.000Z"),
        items: [
          {
            productId: "product-id",
            quantity: 1,
          },
        ],
        discountCents: 0,
        paymentMethod: "pix",
        salesChannel: "whatsapp",
      }),
    ).rejects.toThrow("Produto inativo não pode ser vendido.")
  })
})

