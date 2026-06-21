import { beforeEach, describe, expect, it, vi } from "vitest"

import {
  aggregateExpensesMetrics,
  aggregateSalesMetrics,
  aggregateTopProducts,
} from "./dashboard.repository"
import { getMonthlyDashboardSummary } from "./dashboard.service"

vi.mock("@/src/shared/database/mongodb", () => ({
  connectToMongoDB: vi.fn(),
}))

vi.mock("./dashboard.repository", () => ({
  aggregateExpensesMetrics: vi.fn(),
  aggregateSalesMetrics: vi.fn(),
  aggregateTopProducts: vi.fn(),
}))

describe("dashboard service", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("builds monthly dashboard summary comparing with previous month", async () => {
    vi.mocked(aggregateSalesMetrics)
      .mockResolvedValueOnce({
        salesCents: 100000,
        estimatedCostCents: 35000,
        estimatedGrossProfitCents: 65000,
        salesCount: 40,
      })
      .mockResolvedValueOnce({
        salesCents: 80000,
        estimatedCostCents: 24000,
        estimatedGrossProfitCents: 56000,
        salesCount: 40,
      })
    vi.mocked(aggregateExpensesMetrics)
      .mockResolvedValueOnce({
        ingredientsCents: 30000,
        packagingCents: 5000,
      })
      .mockResolvedValueOnce({
        ingredientsCents: 20000,
        packagingCents: 4000,
      })
    vi.mocked(aggregateTopProducts).mockResolvedValue([
      {
        productId: "product-id",
        nameSnapshot: "Mousse de Morango",
        quantity: 20,
        revenueCents: 18000,
        estimatedProfitCents: 9000,
      },
    ])

    const summary = await getMonthlyDashboardSummary({ month: 6, year: 2026 })

    expect(summary).toEqual({
      period: {
        month: 6,
        year: 2026,
      },
      sales: {
        currentMonthCents: 100000,
        previousMonthCents: 80000,
        variationPercentage: 25,
      },
      expenses: {
        ingredientsCents: 30000,
        previousIngredientsCents: 20000,
        ingredientsVariationPercentage: 50,
        packagingCents: 5000,
        previousPackagingCents: 4000,
        packagingVariationPercentage: 25,
      },
      profit: {
        estimatedGrossProfitCents: 65000,
        previousEstimatedGrossProfitCents: 56000,
        variationPercentage: 16.07,
      },
      ticket: {
        averageTicketCents: 2500,
        previousAverageTicketCents: 2000,
        variationPercentage: 25,
      },
      topProducts: [
        {
          productId: "product-id",
          nameSnapshot: "Mousse de Morango",
          quantity: 20,
          revenueCents: 18000,
          estimatedProfitCents: 9000,
        },
      ],
    })
  })
})

