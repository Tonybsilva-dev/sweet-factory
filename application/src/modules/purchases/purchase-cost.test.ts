import { describe, expect, it } from "vitest"

import {
  calculateUnitPriceCents,
  calculateWeightedAverageCostCents,
} from "./purchase-cost"

describe("purchase cost helpers", () => {
  it("calculates average cost with empty stock", () => {
    expect(
      calculateWeightedAverageCostCents({
        currentStockQuantity: 0,
        currentAverageCostCents: 0,
        purchasedQuantity: 2000,
        purchaseTotalCents: 6000,
      }),
    ).toBe(3)
  })

  it("calculates weighted average cost with existing stock", () => {
    expect(
      calculateWeightedAverageCostCents({
        currentStockQuantity: 1000,
        currentAverageCostCents: 4,
        purchasedQuantity: 1000,
        purchaseTotalCents: 6000,
      }),
    ).toBe(5)
  })

  it("rounds average cost to integer cents", () => {
    expect(
      calculateWeightedAverageCostCents({
        currentStockQuantity: 2,
        currentAverageCostCents: 1,
        purchasedQuantity: 1,
        purchaseTotalCents: 2,
      }),
    ).toBe(1)
  })

  it("calculates unit price in cents from normalized quantity", () => {
    expect(calculateUnitPriceCents(6000, 2000)).toBe(3)
  })

  it("rejects invalid quantities", () => {
    expect(() =>
      calculateWeightedAverageCostCents({
        currentStockQuantity: 0,
        currentAverageCostCents: 0,
        purchasedQuantity: 0,
        purchaseTotalCents: 100,
      }),
    ).toThrow("Quantidade comprada deve ser maior que zero.")
    expect(() => calculateUnitPriceCents(100, 0)).toThrow(
      "Quantidade deve ser maior que zero.",
    )
  })
})
