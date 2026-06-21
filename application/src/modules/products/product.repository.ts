import { Types } from "mongoose"

import { ProductModel } from "./product.model"
import type {
  ListProductsInput,
  Product,
  ProductIngredient,
  ProductMaterial,
} from "./product.types"

type ProductIngredientDocumentLike = Omit<ProductIngredient, "ingredientId"> & {
  ingredientId: Types.ObjectId | string
}

type ProductMaterialDocumentLike = Omit<ProductMaterial, "materialId"> & {
  materialId: Types.ObjectId | string
}

type ProductDocumentLike = {
  _id: Types.ObjectId
  name: string
  description?: string | null
  category?: string | null
  imageUrl?: string | null
  ingredients: ProductIngredientDocumentLike[]
  materials: ProductMaterialDocumentLike[]
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
  deletedBy?: Types.ObjectId | string | null
  toObject?: () => ProductDocumentLike
}

export type PersistProductInput = Omit<Product, "id" | "createdAt" | "updatedAt">

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function serializeProductIngredient(
  ingredient: ProductIngredientDocumentLike,
): ProductIngredient {
  return {
    ingredientId: ingredient.ingredientId.toString(),
    nameSnapshot: ingredient.nameSnapshot,
    quantity: ingredient.quantity,
    unit: ingredient.unit,
    normalizedQuantity: ingredient.normalizedQuantity,
    normalizedUnit: ingredient.normalizedUnit,
    costSnapshotCents: ingredient.costSnapshotCents,
  }
}

function serializeProductMaterial(
  material: ProductMaterialDocumentLike,
): ProductMaterial {
  return {
    materialId: material.materialId.toString(),
    nameSnapshot: material.nameSnapshot,
    quantity: material.quantity,
    unitCostSnapshotCents: material.unitCostSnapshotCents,
  }
}

export function serializeProduct(document: ProductDocumentLike): Product {
  const product = document.toObject ? document.toObject() : document

  return {
    id: product._id.toString(),
    name: product.name,
    description: product.description,
    category: product.category,
    imageUrl: product.imageUrl,
    ingredients: product.ingredients.map(serializeProductIngredient),
    materials: product.materials.map(serializeProductMaterial),
    recipeYield: product.recipeYield,
    lossPercentage: product.lossPercentage,
    desiredMarginPercentage: product.desiredMarginPercentage,
    calculatedCostCents: product.calculatedCostCents,
    suggestedPriceCents: product.suggestedPriceCents,
    salePriceCents: product.salePriceCents,
    isActive: product.isActive,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    deletedAt: product.deletedAt,
    deletedBy: product.deletedBy?.toString() ?? null,
  }
}

export async function createProduct(input: PersistProductInput) {
  const product = await ProductModel.create(input)

  return serializeProduct(product as ProductDocumentLike)
}

export async function findProducts(filters: ListProductsInput) {
  const query: Record<string, unknown> = {
    isActive: filters.isActive ?? true,
  }

  if (filters.search) {
    query.name = { $regex: escapeRegex(filters.search), $options: "i" }
  }

  if (filters.category) {
    query.category = filters.category
  }

  const products = await ProductModel.find(query).sort({ name: 1 })

  return products.map((product) => serializeProduct(product as ProductDocumentLike))
}

export async function findProductById(id: string) {
  const product = await ProductModel.findById(id)

  return product ? serializeProduct(product as ProductDocumentLike) : null
}

export async function updateProductById(
  id: string,
  input: Partial<PersistProductInput>,
) {
  const product = await ProductModel.findByIdAndUpdate(id, input, {
    new: true,
  })

  return product ? serializeProduct(product as ProductDocumentLike) : null
}

