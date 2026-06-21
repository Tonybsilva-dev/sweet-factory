import { describe, expect, it } from "vitest"

import { calculateSaleTotals } from "./sale-calculation"

describe("sale calculation", () => {
  it("calculates gross total, net total, cost and estimated profit", () => {
    const sale = calculateSaleTotals(
      [
        {
          quantity: 2,
          unitPriceCents: 900,
          costSnapshotCents: 420,
        },
      ],
      100,
    )

    expect(sale.grossTotalCents).toBe(1800)
    expect(sale.discountCents).toBe(100)
    expect(sale.netTotalCents).toBe(1700)
    expect(sale.estimatedCostCents).toBe(840)
    expect(sale.estimatedGrossProfitCents).toBe(860)
    expect(sale.items[0]?.totalPriceCents).toBe(1800)
    expect(sale.items[0]?.estimatedProfitCents).toBe(960)
  })

  it("blocks discount greater than gross total", () => {
    expect(() =>
      calculateSaleTotals(
        [
          {
            quantity: 1,
            unitPriceCents: 900,
            costSnapshotCents: 420,
          },
        ],
        901,
      ),
    ).toThrow("Desconto não pode ser maior que o total bruto.")
  })

  it("requires at least one item", () => {
    expect(() => calculateSaleTotals([], 0)).toThrow(
      "Venda precisa ter pelo menos um item.",
    )
  })

  it("requires positive quantity", () => {
    expect(() =>
      calculateSaleTotals([
        {
          quantity: 0,
          unitPriceCents: 900,
          costSnapshotCents: 420,
        },
      ]),
    ).toThrow("Quantidade deve ser maior que zero.")
  })
})

