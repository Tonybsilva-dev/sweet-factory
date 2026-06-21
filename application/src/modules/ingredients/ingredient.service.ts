import { auditLogService } from "@/src/modules/audit-logs/audit-log.service"
import { connectToMongoDB } from "@/src/shared/database/mongodb"
import { notFoundError } from "@/src/shared/errors/api-error"

import {
  createIngredient,
  findIngredientById,
  findIngredients,
  updateIngredientById,
} from "./ingredient.repository"
import type {
  CreateIngredientInput,
  ListIngredientsInput,
  UpdateIngredientInput,
} from "./ingredient.types"

export async function listIngredients(input: ListIngredientsInput) {
  await connectToMongoDB()

  return findIngredients(input)
}

export async function getIngredient(id: string) {
  await connectToMongoDB()

  const ingredient = await findIngredientById(id)

  if (!ingredient) {
    throw notFoundError("Ingrediente não encontrado.")
  }

  return ingredient
}

export async function createIngredientUseCase(
  input: CreateIngredientInput,
  actor?: { userId?: string },
) {
  await connectToMongoDB()

  const ingredient = await createIngredient(input)

  await auditLogService.register({
    action: "ingredient.created",
    entity: "ingredient",
    entityId: ingredient.id,
    before: null,
    after: ingredient,
    userId: actor?.userId,
  })

  return ingredient
}

export async function updateIngredientUseCase(
  id: string,
  input: UpdateIngredientInput,
  actor?: { userId?: string },
) {
  await connectToMongoDB()

  const before = await findIngredientById(id)

  if (!before) {
    throw notFoundError("Ingrediente não encontrado.")
  }

  const after = await updateIngredientById(id, input)

  await auditLogService.register({
    action: "ingredient.updated",
    entity: "ingredient",
    entityId: id,
    before,
    after,
    userId: actor?.userId,
  })

  return after
}

export async function deactivateIngredientUseCase(
  id: string,
  actor?: { userId?: string },
) {
  await connectToMongoDB()

  const before = await findIngredientById(id)

  if (!before) {
    throw notFoundError("Ingrediente não encontrado.")
  }

  const after = await updateIngredientById(id, {
    isActive: false,
    deletedAt: new Date(),
  })

  await auditLogService.register({
    action: "ingredient.deactivated",
    entity: "ingredient",
    entityId: id,
    before,
    after,
    userId: actor?.userId,
  })

  return after
}
