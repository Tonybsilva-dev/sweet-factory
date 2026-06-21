import { connectToMongoDB } from "@/src/shared/database/mongodb"

import {
  calculateAverageTicketCents,
  calculateVariationPercentage,
  getMonthDateRange,
  getPreviousMonthPeriod,
} from "./dashboard-calculations"
import {
  aggregateExpensesMetrics,
  aggregateSalesMetrics,
  aggregateTopProducts,
} from "./dashboard.repository"
import type {
  DashboardPeriod,
  MonthlyDashboardSummary,
} from "./dashboard.types"

export async function getMonthlyDashboardSummary(
  period: DashboardPeriod,
): Promise<MonthlyDashboardSummary> {
  await connectToMongoDB()

  const previousPeriod = getPreviousMonthPeriod(period)
  const currentRange = getMonthDateRange(period)
  const previousRange = getMonthDateRange(previousPeriod)
  const [
    currentSales,
    previousSales,
    currentExpenses,
    previousExpenses,
    topProducts,
  ] = await Promise.all([
    aggregateSalesMetrics(currentRange),
    aggregateSalesMetrics(previousRange),
    aggregateExpensesMetrics(currentRange),
    aggregateExpensesMetrics(previousRange),
    aggregateTopProducts(currentRange),
  ])
  const averageTicketCents = calculateAverageTicketCents(
    currentSales.salesCents,
    currentSales.salesCount,
  )
  const previousAverageTicketCents = calculateAverageTicketCents(
    previousSales.salesCents,
    previousSales.salesCount,
  )

  return {
    period,
    sales: {
      currentMonthCents: currentSales.salesCents,
      previousMonthCents: previousSales.salesCents,
      variationPercentage: calculateVariationPercentage(
        currentSales.salesCents,
        previousSales.salesCents,
      ),
    },
    expenses: {
      ingredientsCents: currentExpenses.ingredientsCents,
      previousIngredientsCents: previousExpenses.ingredientsCents,
      ingredientsVariationPercentage: calculateVariationPercentage(
        currentExpenses.ingredientsCents,
        previousExpenses.ingredientsCents,
      ),
      packagingCents: currentExpenses.packagingCents,
      previousPackagingCents: previousExpenses.packagingCents,
      packagingVariationPercentage: calculateVariationPercentage(
        currentExpenses.packagingCents,
        previousExpenses.packagingCents,
      ),
    },
    profit: {
      estimatedGrossProfitCents: currentSales.estimatedGrossProfitCents,
      previousEstimatedGrossProfitCents:
        previousSales.estimatedGrossProfitCents,
      variationPercentage: calculateVariationPercentage(
        currentSales.estimatedGrossProfitCents,
        previousSales.estimatedGrossProfitCents,
      ),
    },
    ticket: {
      averageTicketCents,
      previousAverageTicketCents,
      variationPercentage: calculateVariationPercentage(
        averageTicketCents,
        previousAverageTicketCents,
      ),
    },
    topProducts,
  }
}

