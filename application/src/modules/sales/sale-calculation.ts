export type SaleCalculationItemInput = {
  quantity: number
  unitPriceCents: number
  costSnapshotCents: number
}

export type CalculatedSaleItem = SaleCalculationItemInput & {
  totalPriceCents: number
  estimatedProfitCents: number
}

export type SaleCalculationResult = {
  items: CalculatedSaleItem[]
  grossTotalCents: number
  discountCents: number
  netTotalCents: number
  estimatedCostCents: number
  estimatedGrossProfitCents: number
}

function assertIntegerCents(value: number, message: string): void {
  if (!Number.isInteger(value)) {
    throw new Error(message)
  }
}

export function calculateSaleTotals(
  items: SaleCalculationItemInput[],
  discountCents = 0,
): SaleCalculationResult {
  if (items.length === 0) {
    throw new Error("Venda precisa ter pelo menos um item.")
  }

  assertIntegerCents(discountCents, "Desconto deve estar em centavos inteiros.")

  if (discountCents < 0) {
    throw new Error("Desconto deve ser maior ou igual a zero.")
  }

  const calculatedItems = items.map((item) => {
    if (item.quantity <= 0) {
      throw new Error("Quantidade deve ser maior que zero.")
    }

    assertIntegerCents(
      item.unitPriceCents,
      "Preço unitário deve estar em centavos inteiros.",
    )
    assertIntegerCents(
      item.costSnapshotCents,
      "Custo deve estar em centavos inteiros.",
    )

    const totalPriceCents = item.quantity * item.unitPriceCents
    const estimatedProfitCents =
      totalPriceCents - item.quantity * item.costSnapshotCents

    return {
      ...item,
      totalPriceCents,
      estimatedProfitCents,
    }
  })
  const grossTotalCents = calculatedItems.reduce(
    (total, item) => total + item.totalPriceCents,
    0,
  )

  if (discountCents > grossTotalCents) {
    throw new Error("Desconto não pode ser maior que o total bruto.")
  }

  const estimatedCostCents = calculatedItems.reduce(
    (total, item) => total + item.quantity * item.costSnapshotCents,
    0,
  )
  const netTotalCents = grossTotalCents - discountCents

  return {
    items: calculatedItems,
    grossTotalCents,
    discountCents,
    netTotalCents,
    estimatedCostCents,
    estimatedGrossProfitCents: netTotalCents - estimatedCostCents,
  }
}

