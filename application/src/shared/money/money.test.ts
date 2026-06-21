import { describe, expect, it } from "vitest"

import {
  addMoneyCents,
  formatMoneyCents,
  MONEY_CENTS_ERROR_MESSAGE,
  parseMoneyToCents,
  subtractMoneyCents,
  toMoneyCents,
} from "./money"

describe("money helpers", () => {
  it("parses displayed money values to cents", () => {
    expect(parseMoneyToCents("R$ 1,00")).toBe(100)
    expect(parseMoneyToCents("10,50")).toBe(1050)
    expect(parseMoneyToCents("0,03")).toBe(3)
    expect(parseMoneyToCents("1234.56")).toBe(123456)
  })

  it("formats cents for display", () => {
    expect(formatMoneyCents(100)).toBe("R$ 1,00")
    expect(formatMoneyCents(1050)).toBe("R$ 10,50")
    expect(formatMoneyCents(3)).toBe("R$ 0,03")
  })

  it("sums and subtracts integer cents", () => {
    expect(addMoneyCents([100, 250, 3])).toBe(353)
    expect(subtractMoneyCents(1000, 250)).toBe(750)
  })

  it("rejects non-integer cents", () => {
    expect(() => toMoneyCents(10.5)).toThrow(MONEY_CENTS_ERROR_MESSAGE)
    expect(() => addMoneyCents([100, 20.5])).toThrow(
      MONEY_CENTS_ERROR_MESSAGE,
    )
    expect(() => formatMoneyCents(1.25)).toThrow(MONEY_CENTS_ERROR_MESSAGE)
  })

  it("rejects invalid money strings", () => {
    expect(() => parseMoneyToCents("10,999")).toThrow("Invalid money value.")
    expect(() => parseMoneyToCents("abc")).toThrow("Invalid money value.")
  })
})
