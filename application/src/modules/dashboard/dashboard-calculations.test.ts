import { describe, expect, it } from "vitest"

import {
  calculateAverageTicketCents,
  calculateVariationPercentage,
  getMonthDateRange,
  getPreviousMonthPeriod,
} from "./dashboard-calculations"

describe("dashboard calculations", () => {
  it("calculates selected month date range in UTC", () => {
    const range = getMonthDateRange({ month: 6, year: 2026 })

    expect(range.startDate.toISOString()).toBe("2026-06-01T00:00:00.000Z")
    expect(range.endDate.toISOString()).toBe("2026-07-01T00:00:00.000Z")
  })

  it("gets previous month across year boundary", () => {
    expect(getPreviousMonthPeriod({ month: 1, year: 2026 })).toEqual({
      month: 12,
      year: 2025,
    })
  })

  it("calculates percentage variation rounded to two decimals", () => {
    expect(calculateVariationPercentage(65000, 56000)).toBe(16.07)
  })

  it("returns 0 variation when current and previous are zero", () => {
    expect(calculateVariationPercentage(0, 0)).toBe(0)
  })

  it("returns null variation when previous is zero and current is greater than zero", () => {
    expect(calculateVariationPercentage(100, 0)).toBeNull()
  })

  it("calculates average ticket rounded to integer cents", () => {
    expect(calculateAverageTicketCents(1000, 3)).toBe(333)
  })
})

