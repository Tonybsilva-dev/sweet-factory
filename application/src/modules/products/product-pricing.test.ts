import { describe, expect, it } from "vitest"

import {
  calculateProductCostCents,
  calculateSuggestedPriceCents,
} from "./product-pricing"

describe("product pricing", () => {
  it("calculates unit cost from ingredients, materials, yield and loss", () => {
    const calculatedCostCents = calculateProductCostCents({
      ingredients: [
        {
          normalizedQuantity: 150,
          averageCostCents: 3,
        },
      ],
      materials: [
        {
          quantity: 1,
          unitCostCents: 80,
        },
      ],
      recipeYield: 2,
      lossPercentage: 5,
    })

    expect(calculatedCostCents).toBe(279)
  })

  it("calculates suggested price from desired margin", () => {
    expect(
      calculateSuggestedPriceCents({
        calculatedCostCents: 420,
        desiredMarginPercentage: 50,
      }),
    ).toBe(840)
  })

  it("rounds non-exact divisions to integer cents", () => {
    const calculatedCostCents = calculateProductCostCents({
      ingredients: [
        {
          normalizedQuantity: 10,
          averageCostCents: 10,
        },
      ],
      recipeYield: 3,
      lossPercentage: 0,
    })

    expect(calculatedCostCents).toBe(33)
  })

  it("requires at least one ingredient", () => {
    expect(() =>
      calculateProductCostCents({
        ingredients: [],
        recipeYield: 1,
        lossPercentage: 0,
      }),
    ).toThrow("Produto precisa ter pelo menos um ingrediente.")
  })

  it("requires margin greater than 0 and lower than 100", () => {
    expect(() =>
      calculateSuggestedPriceCents({
        calculatedCostCents: 100,
        desiredMarginPercentage: 100,
      }),
    ).toThrow("Margem deve ser maior que 0 e menor que 100.")
  })
})

