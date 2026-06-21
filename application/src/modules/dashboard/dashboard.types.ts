export type DashboardPeriod = {
  month: number
  year: number
}

export type DashboardDateRange = {
  startDate: Date
  endDate: Date
}

export type DashboardSalesMetrics = {
  salesCents: number
  estimatedCostCents: number
  estimatedGrossProfitCents: number
  salesCount: number
}

export type DashboardExpensesMetrics = {
  ingredientsCents: number
  packagingCents: number
}

export type DashboardTopProduct = {
  productId: string
  nameSnapshot: string
  quantity: number
  revenueCents: number
  estimatedProfitCents: number
}

export type VariationPercentage = number | null

export type MonthlyDashboardSummary = {
  period: DashboardPeriod
  sales: {
    currentMonthCents: number
    previousMonthCents: number
    variationPercentage: VariationPercentage
  }
  expenses: {
    ingredientsCents: number
    previousIngredientsCents: number
    ingredientsVariationPercentage: VariationPercentage
    packagingCents: number
    previousPackagingCents: number
    packagingVariationPercentage: VariationPercentage
  }
  profit: {
    estimatedGrossProfitCents: number
    previousEstimatedGrossProfitCents: number
    variationPercentage: VariationPercentage
  }
  ticket: {
    averageTicketCents: number
    previousAverageTicketCents: number
    variationPercentage: VariationPercentage
  }
  topProducts: DashboardTopProduct[]
}

