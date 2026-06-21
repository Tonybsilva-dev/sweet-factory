export const packagingMaterialTypes = [
  "packaging",
  "sticker",
  "spoon",
  "bag",
  "lid",
  "box",
  "other",
] as const

export type PackagingMaterialType = (typeof packagingMaterialTypes)[number]

export type PackagingMaterial = {
  id: string
  name: string
  type: PackagingMaterialType
  currentStockQuantity: number
  unitCostCents: number
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export type CreatePackagingMaterialInput = {
  name: string
  type: PackagingMaterialType
  currentStockQuantity: number
  unitCostCents: number
}

export type UpdatePackagingMaterialInput = Partial<
  Pick<CreatePackagingMaterialInput, "name" | "type">
>

export type ListPackagingMaterialsInput = {
  search?: string
  type?: PackagingMaterialType
  isActive?: boolean
}
