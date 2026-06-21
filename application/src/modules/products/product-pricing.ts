export type ProductIngredientCostInput = {
  normalizedQuantity: number
  averageCostCents: number
}

export type ProductMaterialCostInput = {
  quantity: number
  unitCostCents: number
}

export type ProductCostInput = {
  ingredients: ProductIngredientCostInput[]
  materials?: ProductMaterialCostInput[]
  recipeYield: number
  lossPercentage: number
}

export type ProductPriceInput = {
  calculatedCostCents: number
  desiredMarginPercentage: number
}

export function calculateProductCostCents({
  ingredients,
  materials = [],
  recipeYield,
  lossPercentage,
}: ProductCostInput): number {
  if (ingredients.length === 0) {
    throw new Error("Produto precisa ter pelo menos um ingrediente.")
  }

  if (recipeYield <= 0) {
    throw new Error("Rendimento deve ser maior que zero.")
  }

  if (lossPercentage < 0 || lossPercentage >= 100) {
    throw new Error("Percentual de perda deve ser maior ou igual a 0 e menor que 100.")
  }

  const ingredientsCostCents = ingredients.reduce((total, ingredient) => {
    if (ingredient.normalizedQuantity <= 0) {
      throw new Error("Quantidade de ingrediente deve ser maior que zero.")
    }

    if (!Number.isInteger(ingredient.averageCostCents)) {
      throw new Error("Custo de ingrediente deve estar em centavos inteiros.")
    }

    return total + ingredient.normalizedQuantity * ingredient.averageCostCents
  }, 0)

  const materialsCostCents = materials.reduce((total, material) => {
    if (material.quantity <= 0) {
      throw new Error("Quantidade de material deve ser maior que zero.")
    }

    if (!Number.isInteger(material.unitCostCents)) {
      throw new Error("Custo de material deve estar em centavos inteiros.")
    }

    return total + material.quantity * material.unitCostCents
  }, 0)

  const totalRecipeCostCents = ingredientsCostCents + materialsCostCents
  const unitCostCents = totalRecipeCostCents / recipeYield
  const lossMultiplier = 1 - lossPercentage / 100

  return Math.round(unitCostCents / lossMultiplier)
}

export function calculateSuggestedPriceCents({
  calculatedCostCents,
  desiredMarginPercentage,
}: ProductPriceInput): number {
  if (!Number.isInteger(calculatedCostCents)) {
    throw new Error("Custo calculado deve estar em centavos inteiros.")
  }

  if (calculatedCostCents < 0) {
    throw new Error("Custo calculado deve ser maior ou igual a zero.")
  }

  if (desiredMarginPercentage <= 0 || desiredMarginPercentage >= 100) {
    throw new Error("Margem deve ser maior que 0 e menor que 100.")
  }

  return Math.round(calculatedCostCents / (1 - desiredMarginPercentage / 100))
}

