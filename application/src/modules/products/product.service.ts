import { auditLogService } from "@/src/modules/audit-logs/audit-log.service"
import { findIngredientById } from "@/src/modules/ingredients/ingredient.repository"
import { findPackagingMaterialById } from "@/src/modules/packaging-materials/packaging-material.repository"
import { connectToMongoDB } from "@/src/shared/database/mongodb"
import {
  businessRuleError,
  notFoundError,
} from "@/src/shared/errors/api-error"
import {
  convertUnitQuantity,
  type Unit,
  UNIT_CONVERSION_ERROR_MESSAGE,
} from "@/src/shared/units/units"

import {
  calculateProductCostCents,
  calculateSuggestedPriceCents,
} from "./product-pricing"
import {
  createProduct,
  findProductById,
  findProducts,
  type PersistProductInput,
  updateProductById,
} from "./product.repository"
import type {
  CreateProductInput,
  ListProductsInput,
  ProductIngredient,
  ProductMaterial,
  UpdateProductInput,
} from "./product.types"

type Actor = {
  userId?: string
}

function convertQuantityOrThrow(
  quantity: number,
  unit: Unit,
  baseUnit: Unit,
): number {
  try {
    return convertUnitQuantity(quantity, unit, baseUnit)
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === UNIT_CONVERSION_ERROR_MESSAGE
    ) {
      throw businessRuleError("Unidade incompatível.")
    }

    throw error
  }
}

async function buildProductIngredients(
  input: CreateProductInput["ingredients"],
): Promise<ProductIngredient[]> {
  const productIngredients: ProductIngredient[] = []

  for (const item of input) {
    const ingredient = await findIngredientById(item.ingredientId)

    if (!ingredient) {
      throw notFoundError("Ingrediente não encontrado.")
    }

    if (!ingredient.isActive) {
      throw businessRuleError("Ingrediente inativo não pode ser usado no produto.")
    }

    const normalizedQuantity = convertQuantityOrThrow(
      item.quantity,
      item.unit,
      ingredient.baseUnit,
    )

    productIngredients.push({
      ingredientId: ingredient.id,
      nameSnapshot: ingredient.name,
      quantity: item.quantity,
      unit: item.unit,
      normalizedQuantity,
      normalizedUnit: ingredient.baseUnit,
      costSnapshotCents: ingredient.averageCostCents,
    })
  }

  return productIngredients
}

async function buildProductMaterials(
  input: CreateProductInput["materials"] = [],
): Promise<ProductMaterial[]> {
  const productMaterials: ProductMaterial[] = []

  for (const item of input) {
    const material = await findPackagingMaterialById(item.materialId)

    if (!material) {
      throw notFoundError("Material não encontrado.")
    }

    if (!material.isActive) {
      throw businessRuleError("Material inativo não pode ser usado no produto.")
    }

    productMaterials.push({
      materialId: material.id,
      nameSnapshot: material.name,
      quantity: item.quantity,
      unitCostSnapshotCents: material.unitCostCents,
    })
  }

  return productMaterials
}

function calculateProductPricing(input: {
  ingredients: ProductIngredient[]
  materials: ProductMaterial[]
  recipeYield: number
  lossPercentage: number
  desiredMarginPercentage: number
}) {
  const calculatedCostCents = calculateProductCostCents({
    ingredients: input.ingredients.map((ingredient) => ({
      normalizedQuantity: ingredient.normalizedQuantity,
      averageCostCents: ingredient.costSnapshotCents,
    })),
    materials: input.materials.map((material) => ({
      quantity: material.quantity,
      unitCostCents: material.unitCostSnapshotCents,
    })),
    recipeYield: input.recipeYield,
    lossPercentage: input.lossPercentage,
  })
  const suggestedPriceCents = calculateSuggestedPriceCents({
    calculatedCostCents,
    desiredMarginPercentage: input.desiredMarginPercentage,
  })

  return {
    calculatedCostCents,
    suggestedPriceCents,
  }
}

async function buildPersistProductInput(
  input: CreateProductInput,
): Promise<PersistProductInput> {
  const ingredients = await buildProductIngredients(input.ingredients)
  const materials = await buildProductMaterials(input.materials)
  const { calculatedCostCents, suggestedPriceCents } = calculateProductPricing({
    ingredients,
    materials,
    recipeYield: input.recipeYield,
    lossPercentage: input.lossPercentage,
    desiredMarginPercentage: input.desiredMarginPercentage,
  })

  return {
    name: input.name,
    description: input.description ?? null,
    category: input.category ?? null,
    imageUrl: input.imageUrl ?? null,
    ingredients,
    materials,
    recipeYield: input.recipeYield,
    lossPercentage: input.lossPercentage,
    desiredMarginPercentage: input.desiredMarginPercentage,
    calculatedCostCents,
    suggestedPriceCents,
    salePriceCents: input.salePriceCents ?? suggestedPriceCents,
    isActive: true,
    deletedAt: null,
    deletedBy: null,
  }
}

function shouldRecalculateProduct(input: UpdateProductInput): boolean {
  return (
    input.ingredients !== undefined ||
    input.materials !== undefined ||
    input.recipeYield !== undefined ||
    input.lossPercentage !== undefined ||
    input.desiredMarginPercentage !== undefined
  )
}

function omitUndefinedValues<T extends Record<string, unknown>>(input: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined),
  ) as Partial<T>
}

export async function listProducts(input: ListProductsInput) {
  await connectToMongoDB()

  return findProducts(input)
}

export async function getProduct(id: string) {
  await connectToMongoDB()

  const product = await findProductById(id)

  if (!product) {
    throw notFoundError("Produto não encontrado.")
  }

  return product
}

export async function createProductUseCase(
  input: CreateProductInput,
  actor?: Actor,
) {
  await connectToMongoDB()

  const product = await createProduct(await buildPersistProductInput(input))

  await auditLogService.register({
    action: "product.created",
    entity: "product",
    entityId: product.id,
    before: null,
    after: product,
    userId: actor?.userId,
  })

  return product
}

export async function updateProductUseCase(
  id: string,
  input: UpdateProductInput,
  actor?: Actor,
) {
  await connectToMongoDB()

  const before = await findProductById(id)

  if (!before) {
    throw notFoundError("Produto não encontrado.")
  }

  const updateInput = omitUndefinedValues<Partial<PersistProductInput>>({
    name: input.name,
    description: input.description,
    category: input.category,
    imageUrl: input.imageUrl,
    salePriceCents: input.salePriceCents,
  })

  if (shouldRecalculateProduct(input)) {
    const ingredients = input.ingredients
      ? await buildProductIngredients(input.ingredients)
      : before.ingredients
    const materials = input.materials
      ? await buildProductMaterials(input.materials)
      : before.materials
    const recipeYield = input.recipeYield ?? before.recipeYield
    const lossPercentage = input.lossPercentage ?? before.lossPercentage
    const desiredMarginPercentage =
      input.desiredMarginPercentage ?? before.desiredMarginPercentage
    const { calculatedCostCents, suggestedPriceCents } = calculateProductPricing({
      ingredients,
      materials,
      recipeYield,
      lossPercentage,
      desiredMarginPercentage,
    })

    Object.assign(updateInput, {
      ingredients,
      materials,
      recipeYield,
      lossPercentage,
      desiredMarginPercentage,
      calculatedCostCents,
      suggestedPriceCents,
      salePriceCents: input.salePriceCents ?? before.salePriceCents,
    })
  }

  const after = await updateProductById(id, updateInput)

  await auditLogService.register({
    action: "product.updated",
    entity: "product",
    entityId: id,
    before,
    after,
    userId: actor?.userId,
  })

  return after
}

export async function deactivateProductUseCase(id: string, actor?: Actor) {
  await connectToMongoDB()

  const before = await findProductById(id)

  if (!before) {
    throw notFoundError("Produto não encontrado.")
  }

  const after = await updateProductById(id, {
    isActive: false,
    deletedAt: new Date(),
    deletedBy: actor?.userId ?? null,
  })

  await auditLogService.register({
    action: "product.deactivated",
    entity: "product",
    entityId: id,
    before,
    after,
    userId: actor?.userId,
  })

  return after
}

export async function recalculateProductPriceUseCase(
  id: string,
  actor?: Actor,
) {
  await connectToMongoDB()

  const before = await findProductById(id)

  if (!before) {
    throw notFoundError("Produto não encontrado.")
  }

  const ingredients = await buildProductIngredients(
    before.ingredients.map((ingredient) => ({
      ingredientId: ingredient.ingredientId,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
    })),
  )
  const materials = await buildProductMaterials(
    before.materials.map((material) => ({
      materialId: material.materialId,
      quantity: material.quantity,
    })),
  )
  const { calculatedCostCents, suggestedPriceCents } = calculateProductPricing({
    ingredients,
    materials,
    recipeYield: before.recipeYield,
    lossPercentage: before.lossPercentage,
    desiredMarginPercentage: before.desiredMarginPercentage,
  })
  const after = await updateProductById(id, {
    ingredients,
    materials,
    calculatedCostCents,
    suggestedPriceCents,
  })

  await auditLogService.register({
    action: "product.price_recalculated",
    entity: "product",
    entityId: id,
    before,
    after,
    userId: actor?.userId,
  })

  return after
}
