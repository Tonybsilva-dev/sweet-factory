export type WeightedAverageCostInput = {
  currentStockQuantity: number
  currentAverageCostCents: number
  purchasedQuantity: number
  purchaseTotalCents: number
}

export function calculateWeightedAverageCostCents({
  currentStockQuantity,
  currentAverageCostCents,
  purchasedQuantity,
  purchaseTotalCents,
}: WeightedAverageCostInput): number {
  if (purchasedQuantity <= 0) {
    throw new Error("Quantidade comprada deve ser maior que zero.")
  }

  const totalQuantity = currentStockQuantity + purchasedQuantity

  if (totalQuantity <= 0) {
    throw new Error("Quantidade total deve ser maior que zero.")
  }

  const currentStockValueCents =
    currentStockQuantity * currentAverageCostCents
  const newAverage =
    (currentStockValueCents + purchaseTotalCents) / totalQuantity

  return Math.round(newAverage)
}

export function calculateUnitPriceCents(
  totalPriceCents: number,
  normalizedQuantity: number,
): number {
  if (normalizedQuantity <= 0) {
    throw new Error("Quantidade deve ser maior que zero.")
  }

  return Math.round(totalPriceCents / normalizedQuantity)
}
