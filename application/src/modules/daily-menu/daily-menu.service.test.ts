import { beforeEach, describe, expect, it, vi } from "vitest"

import { auditLogService } from "@/src/modules/audit-logs/audit-log.service"
import { findProductById } from "@/src/modules/products/product.repository"

import {
  createDailyMenu,
  findDailyMenuByDate,
} from "./daily-menu.repository"
import { createDailyMenuUseCase } from "./daily-menu.service"

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

vi.mock("./daily-menu.repository", () => ({
  createDailyMenu: vi.fn(async (input) => ({
    id: "daily-menu-id",
    ...input,
  })),
  findDailyMenuByDate: vi.fn(),
  findDailyMenuById: vi.fn(),
  updateDailyMenuById: vi.fn(),
}))

describe("daily menu service", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("creates daily menu with product snapshots and audit log", async () => {
    vi.mocked(findDailyMenuByDate).mockResolvedValue(null)
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

    const dailyMenu = await createDailyMenuUseCase(
      {
        date: "2026-06-21",
        products: [
          {
            productId: "product-id",
            enabled: true,
            salePriceCents: 850,
          },
        ],
        notes: "Cardápio do dia",
      },
      { userId: "user-id" },
    )

    expect(createDailyMenu).toHaveBeenCalledWith(
      expect.objectContaining({
        date: "2026-06-21",
        status: "draft",
        createdBy: "user-id",
        products: [
          expect.objectContaining({
            productId: "product-id",
            nameSnapshot: "Mousse de Morango",
            enabled: true,
            salePriceCents: 850,
            costSnapshotCents: 420,
          }),
        ],
      }),
    )
    expect(auditLogService.register).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "daily_menu.created",
        entity: "daily_menu",
        entityId: "daily-menu-id",
        userId: "user-id",
      }),
    )
    expect(dailyMenu.id).toBe("daily-menu-id")
  })

  it("blocks inactive products", async () => {
    vi.mocked(findDailyMenuByDate).mockResolvedValue(null)
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
      createDailyMenuUseCase({
        date: "2026-06-21",
        products: [
          {
            productId: "product-id",
          },
        ],
      }),
    ).rejects.toThrow("Produto inativo não pode ser adicionado ao cardápio.")
  })
})

