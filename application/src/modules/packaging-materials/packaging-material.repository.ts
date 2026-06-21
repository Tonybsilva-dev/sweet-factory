import { Types } from "mongoose"

import { PackagingMaterialModel } from "./packaging-material.model"
import type {
  CreatePackagingMaterialInput,
  ListPackagingMaterialsInput,
  PackagingMaterial,
  UpdatePackagingMaterialInput,
} from "./packaging-material.types"

type PackagingMaterialDocumentLike = {
  _id: Types.ObjectId
  name: string
  type: PackagingMaterial["type"]
  currentStockQuantity: number
  unitCostCents: number
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
  toObject?: () => PackagingMaterialDocumentLike
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export function serializePackagingMaterial(
  document: PackagingMaterialDocumentLike,
): PackagingMaterial {
  const material = document.toObject ? document.toObject() : document

  return {
    id: material._id.toString(),
    name: material.name,
    type: material.type,
    currentStockQuantity: material.currentStockQuantity,
    unitCostCents: material.unitCostCents,
    isActive: material.isActive,
    createdAt: material.createdAt,
    updatedAt: material.updatedAt,
    deletedAt: material.deletedAt,
  }
}

export async function createPackagingMaterial(
  input: CreatePackagingMaterialInput,
) {
  const material = await PackagingMaterialModel.create({
    ...input,
    isActive: true,
    deletedAt: null,
  })

  return serializePackagingMaterial(material as PackagingMaterialDocumentLike)
}

export async function findPackagingMaterials(
  filters: ListPackagingMaterialsInput,
) {
  const query: Record<string, unknown> = {
    isActive: filters.isActive ?? true,
  }

  if (filters.search) {
    query.name = { $regex: escapeRegex(filters.search), $options: "i" }
  }

  if (filters.type) {
    query.type = filters.type
  }

  const materials = await PackagingMaterialModel.find(query).sort({ name: 1 })

  return materials.map((material) =>
    serializePackagingMaterial(material as PackagingMaterialDocumentLike),
  )
}

export async function findPackagingMaterialById(id: string) {
  const material = await PackagingMaterialModel.findById(id)

  return material
    ? serializePackagingMaterial(material as PackagingMaterialDocumentLike)
    : null
}

export async function updatePackagingMaterialById(
  id: string,
  input: UpdatePackagingMaterialInput & {
    currentStockQuantity?: number
    unitCostCents?: number
    isActive?: boolean
    deletedAt?: Date | null
  },
) {
  const material = await PackagingMaterialModel.findByIdAndUpdate(id, input, {
    new: true,
  })

  return material
    ? serializePackagingMaterial(material as PackagingMaterialDocumentLike)
    : null
}
