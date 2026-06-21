import { describe, expect, it } from "vitest"

import {
  assertAcceptedUnit,
  convertToBaseUnit,
  convertUnitQuantity,
  getBaseUnit,
  isAcceptedUnit,
  UNIT_CONVERSION_ERROR_MESSAGE,
} from "./units"

describe("unit helpers", () => {
  it("converts kg to g", () => {
    expect(convertUnitQuantity(2, "kg", "g")).toBe(2000)
    expect(convertToBaseUnit(2, "kg")).toEqual({ quantity: 2000, unit: "g" })
  })

  it("converts g to g", () => {
    expect(convertUnitQuantity(150, "g", "g")).toBe(150)
    expect(convertToBaseUnit(150, "g")).toEqual({ quantity: 150, unit: "g" })
  })

  it("converts l to ml", () => {
    expect(convertUnitQuantity(3, "l", "ml")).toBe(3000)
    expect(convertToBaseUnit(3, "l")).toEqual({ quantity: 3000, unit: "ml" })
  })

  it("converts ml to ml", () => {
    expect(convertUnitQuantity(250, "ml", "ml")).toBe(250)
    expect(convertToBaseUnit(250, "ml")).toEqual({
      quantity: 250,
      unit: "ml",
    })
  })

  it("converts un to un", () => {
    expect(convertUnitQuantity(12, "un", "un")).toBe(12)
    expect(convertToBaseUnit(12, "un")).toEqual({ quantity: 12, unit: "un" })
  })

  it("blocks incompatible conversions", () => {
    expect(() => convertUnitQuantity(1, "kg", "ml")).toThrow(
      UNIT_CONVERSION_ERROR_MESSAGE,
    )
    expect(() => convertUnitQuantity(1, "l", "g")).toThrow(
      UNIT_CONVERSION_ERROR_MESSAGE,
    )
    expect(() => convertUnitQuantity(1, "un", "g")).toThrow(
      UNIT_CONVERSION_ERROR_MESSAGE,
    )
  })

  it("validates accepted units", () => {
    expect(isAcceptedUnit("kg")).toBe(true)
    expect(isAcceptedUnit("oz")).toBe(false)
    expect(() => assertAcceptedUnit("oz")).toThrow("Invalid unit: oz")
  })

  it("returns the base unit for each unit family", () => {
    expect(getBaseUnit("kg")).toBe("g")
    expect(getBaseUnit("g")).toBe("g")
    expect(getBaseUnit("l")).toBe("ml")
    expect(getBaseUnit("ml")).toBe("ml")
    expect(getBaseUnit("un")).toBe("un")
  })

  it("rejects negative quantities", () => {
    expect(() => convertUnitQuantity(-1, "kg", "g")).toThrow(
      "Quantity must be non-negative.",
    )
  })
})
