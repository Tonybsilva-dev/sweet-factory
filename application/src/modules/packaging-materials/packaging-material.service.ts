import { auditLogService } from "@/src/modules/audit-logs/audit-log.service"
import { connectToMongoDB } from "@/src/shared/database/mongodb"
import { notFoundError } from "@/src/shared/errors/api-error"

import {
  createPackagingMaterial,
  findPackagingMaterialById,
  findPackagingMaterials,
  updatePackagingMaterialById,
} from "./packaging-material.repository"
import type {
  CreatePackagingMaterialInput,
  ListPackagingMaterialsInput,
  UpdatePackagingMaterialInput,
} from "./packaging-material.types"

export async function listPackagingMaterials(
  input: ListPackagingMaterialsInput,
) {
  await connectToMongoDB()

  return findPackagingMaterials(input)
}

export async function getPackagingMaterial(id: string) {
  await connectToMongoDB()

  const material = await findPackagingMaterialById(id)

  if (!material) {
    throw notFoundError("Material não encontrado.")
  }

  return material
}

export async function createPackagingMaterialUseCase(
  input: CreatePackagingMaterialInput,
  actor?: { userId?: string },
) {
  await connectToMongoDB()

  const material = await createPackagingMaterial(input)

  await auditLogService.register({
    action: "packaging.created",
    entity: "packaging_material",
    entityId: material.id,
    before: null,
    after: material,
    userId: actor?.userId,
  })

  return material
}

export async function updatePackagingMaterialUseCase(
  id: string,
  input: UpdatePackagingMaterialInput,
  actor?: { userId?: string },
) {
  await connectToMongoDB()

  const before = await findPackagingMaterialById(id)

  if (!before) {
    throw notFoundError("Material não encontrado.")
  }

  const after = await updatePackagingMaterialById(id, input)

  await auditLogService.register({
    action: "packaging.updated",
    entity: "packaging_material",
    entityId: id,
    before,
    after,
    userId: actor?.userId,
  })

  return after
}

export async function deactivatePackagingMaterialUseCase(
  id: string,
  actor?: { userId?: string },
) {
  await connectToMongoDB()

  const before = await findPackagingMaterialById(id)

  if (!before) {
    throw notFoundError("Material não encontrado.")
  }

  const after = await updatePackagingMaterialById(id, {
    isActive: false,
    deletedAt: new Date(),
  })

  await auditLogService.register({
    action: "packaging.deactivated",
    entity: "packaging_material",
    entityId: id,
    before,
    after,
    userId: actor?.userId,
  })

  return after
}
