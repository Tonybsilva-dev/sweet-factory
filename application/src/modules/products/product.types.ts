import type { Unit } from "@/src/shared/units/units"

export type ProductIngredient = {
  ingredientId: string
  nameSnapshot: string
  quantity: number
  unit: Unit
  normalizedQuantity: number
  normalizedUnit: Unit
  costSnapshotCents: number
}

export type ProductMaterial = {
  materialId: string
  nameSnapshot: string
  quantity: number
  unitCostSnapshotCents: number
}

export type Product = {
  id: string
  name: string
  description?: string | null
  category?: string | null
  imageUrl?: string | null
  ingredients: ProductIngredient[]
  materials: ProductMaterial[]
  recipeYield: number
  lossPercentage: number
  desiredMarginPercentage: number
  calculatedCostCents: number
  suggestedPriceCents: number
  salePriceCents: number
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
  deletedBy?: string | null
}

export type ProductIngredientInput = {
  ingredientId: string
  quantity: number
  unit: Unit
}

export type ProductMaterialInput = {
  materialId: string
  quantity: number
}

export type CreateProductInput = {
  name: string
  description?: string | null
  category?: string | null
  imageUrl?: string | null
  ingredients: ProductIngredientInput[]
  materials?: ProductMaterialInput[]
  recipeYield: number
  lossPercentage: number
  desiredMarginPercentage: number
  salePriceCents?: number
}

export type UpdateProductInput = Partial<
  Pick<
    CreateProductInput,
    | "name"
    | "description"
    | "category"
    | "imageUrl"
    | "ingredients"
    | "materials"
    | "recipeYield"
    | "lossPercentage"
    | "desiredMarginPercentage"
    | "salePriceCents"
  >
>

export type ListProductsInput = {
  search?: string
  category?: string
  isActive?: boolean
}

