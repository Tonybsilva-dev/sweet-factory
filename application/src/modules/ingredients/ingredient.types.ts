import type { Unit } from "@/src/shared/units/units"

export type Ingredient = {
  id: string
  name: string
  baseUnit: Unit
  category: string
  currentStockQuantity: number
  averageCostCents: number
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export type CreateIngredientInput = {
  name: string
  baseUnit: Unit
  category: string
  currentStockQuantity: number
  averageCostCents: number
}

export type UpdateIngredientInput = Partial<
  Pick<CreateIngredientInput, "name" | "category">
>

export type ListIngredientsInput = {
  search?: string
  category?: string
  isActive?: boolean
}
