import { Types } from "mongoose"

import { IngredientModel } from "./ingredient.model"
import type {
  CreateIngredientInput,
  Ingredient,
  ListIngredientsInput,
  UpdateIngredientInput,
} from "./ingredient.types"

type IngredientDocumentLike = {
  _id: Types.ObjectId
  name: string
  baseUnit: Ingredient["baseUnit"]
  category: string
  currentStockQuantity: number
  averageCostCents: number
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
  toObject?: () => IngredientDocumentLike
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export function serializeIngredient(document: IngredientDocumentLike): Ingredient {
  const ingredient = document.toObject ? document.toObject() : document

  return {
    id: ingredient._id.toString(),
    name: ingredient.name,
    baseUnit: ingredient.baseUnit,
    category: ingredient.category,
    currentStockQuantity: ingredient.currentStockQuantity,
    averageCostCents: ingredient.averageCostCents,
    isActive: ingredient.isActive,
    createdAt: ingredient.createdAt,
    updatedAt: ingredient.updatedAt,
    deletedAt: ingredient.deletedAt,
  }
}

export async function createIngredient(input: CreateIngredientInput) {
  const ingredient = await IngredientModel.create({
    ...input,
    isActive: true,
    deletedAt: null,
  })

  return serializeIngredient(ingredient as IngredientDocumentLike)
}

export async function findIngredients(filters: ListIngredientsInput) {
  const query: Record<string, unknown> = {
    isActive: filters.isActive ?? true,
  }

  if (filters.search) {
    query.name = { $regex: escapeRegex(filters.search), $options: "i" }
  }

  if (filters.category) {
    query.category = filters.category
  }

  const ingredients = await IngredientModel.find(query).sort({ name: 1 })

  return ingredients.map((ingredient) =>
    serializeIngredient(ingredient as IngredientDocumentLike),
  )
}

export async function findIngredientById(id: string) {
  const ingredient = await IngredientModel.findById(id)

  return ingredient
    ? serializeIngredient(ingredient as IngredientDocumentLike)
    : null
}

export async function updateIngredientById(
  id: string,
  input: UpdateIngredientInput & {
    currentStockQuantity?: number
    averageCostCents?: number
    isActive?: boolean
    deletedAt?: Date | null
  },
) {
  const ingredient = await IngredientModel.findByIdAndUpdate(id, input, {
    new: true,
  })

  return ingredient
    ? serializeIngredient(ingredient as IngredientDocumentLike)
    : null
}

export async function incrementIngredientStockAndCost(
  id: string,
  input: {
    currentStockQuantity: number
    averageCostCents: number
  },
) {
  return updateIngredientById(id, input)
}
