import type {
  DashboardDateRange,
  DashboardPeriod,
  DashboardSalesMetrics,
  VariationPercentage,
} from "./dashboard.types"

export function getMonthDateRange(period: DashboardPeriod): DashboardDateRange {
  const startDate = new Date(Date.UTC(period.year, period.month - 1, 1))
  const endDate = new Date(Date.UTC(period.year, period.month, 1))

  return {
    startDate,
    endDate,
  }
}

export function getPreviousMonthPeriod(period: DashboardPeriod): DashboardPeriod {
  if (period.month === 1) {
    return {
      month: 12,
      year: period.year - 1,
    }
  }

  return {
    month: period.month - 1,
    year: period.year,
  }
}

export function calculateVariationPercentage(
  currentValue: number,
  previousValue: number,
): VariationPercentage {
  if (previousValue === 0) {
    return currentValue === 0 ? 0 : null
  }

  return Math.round(((currentValue - previousValue) / previousValue) * 10000) / 100
}

export function calculateAverageTicketCents(
  salesCents: number,
  salesCount: number,
): number {
  if (salesCount <= 0) {
    return 0
  }

  return Math.round(salesCents / salesCount)
}

export function normalizeSalesMetrics(
  metrics?: Partial<DashboardSalesMetrics> | null,
): DashboardSalesMetrics {
  return {
    salesCents: metrics?.salesCents ?? 0,
    estimatedCostCents: metrics?.estimatedCostCents ?? 0,
    estimatedGrossProfitCents: metrics?.estimatedGrossProfitCents ?? 0,
    salesCount: metrics?.salesCount ?? 0,
  }
}

