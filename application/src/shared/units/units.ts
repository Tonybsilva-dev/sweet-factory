export const acceptedUnits = ["g", "kg", "ml", "l", "un"] as const

export type Unit = (typeof acceptedUnits)[number]

export const UNIT_CONVERSION_ERROR_MESSAGE = "Incompatible unit conversion."

const conversionMultipliers: Record<Unit, Partial<Record<Unit, number>>> = {
  kg: {
    g: 1000,
  },
  g: {
    g: 1,
  },
  l: {
    ml: 1000,
  },
  ml: {
    ml: 1,
  },
  un: {
    un: 1,
  },
}

export function isAcceptedUnit(unit: string): unit is Unit {
  return acceptedUnits.includes(unit as Unit)
}

export function assertAcceptedUnit(unit: string): asserts unit is Unit {
  if (!isAcceptedUnit(unit)) {
    throw new Error(`Invalid unit: ${unit}`)
  }
}

export function convertUnitQuantity(
  quantity: number,
  fromUnit: Unit,
  toUnit: Unit,
): number {
  if (quantity < 0) {
    throw new Error("Quantity must be non-negative.")
  }

  const multiplier = conversionMultipliers[fromUnit][toUnit]

  if (multiplier === undefined) {
    throw new Error(UNIT_CONVERSION_ERROR_MESSAGE)
  }

  return quantity * multiplier
}

export function getBaseUnit(unit: Unit): Unit {
  if (unit === "kg" || unit === "g") {
    return "g"
  }

  if (unit === "l" || unit === "ml") {
    return "ml"
  }

  return "un"
}

export function convertToBaseUnit(quantity: number, unit: Unit): {
  quantity: number
  unit: Unit
} {
  const baseUnit = getBaseUnit(unit)

  return {
    quantity: convertUnitQuantity(quantity, unit, baseUnit),
    unit: baseUnit,
  }
}
