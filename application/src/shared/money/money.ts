export const MONEY_CENTS_ERROR_MESSAGE =
  "Money values must be integer cents."

export function assertMoneyCents(value: number): void {
  if (!Number.isInteger(value)) {
    throw new Error(MONEY_CENTS_ERROR_MESSAGE)
  }
}

export function toMoneyCents(value: number): number {
  assertMoneyCents(value)

  return value
}

export function parseMoneyToCents(value: string): number {
  const moneyValue = value
    .trim()
    .replace(/^R\$\s?/, "")

  const normalizedValue = moneyValue.includes(",")
    ? moneyValue.replace(/\./g, "").replace(",", ".")
    : moneyValue

  if (!/^-?\d+(\.\d{1,2})?$/.test(normalizedValue)) {
    throw new Error("Invalid money value.")
  }

  const [reais = "0", cents = ""] = normalizedValue.split(".")
  const sign = reais.startsWith("-") ? -1 : 1
  const absoluteReais = reais.replace("-", "")
  const normalizedCents = cents.padEnd(2, "0")

  return sign * (Number(absoluteReais) * 100 + Number(normalizedCents))
}

export function formatMoneyCents(valueInCents: number): string {
  assertMoneyCents(valueInCents)

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  return formatter.format(valueInCents / 100)
}

export function addMoneyCents(valuesInCents: number[]): number {
  return valuesInCents.reduce((total, value) => {
    assertMoneyCents(value)

    return total + value
  }, 0)
}

export function subtractMoneyCents(
  valueInCents: number,
  amountToSubtractInCents: number,
): number {
  assertMoneyCents(valueInCents)
  assertMoneyCents(amountToSubtractInCents)

  return valueInCents - amountToSubtractInCents
}
