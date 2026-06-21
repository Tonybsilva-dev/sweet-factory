export const dailyMenuStatuses = ["draft", "published", "closed"] as const

export type DailyMenuStatus = (typeof dailyMenuStatuses)[number]

export type DailyMenuProduct = {
  productId: string
  nameSnapshot: string
  enabled: boolean
  salePriceCents: number
  costSnapshotCents: number
}

export type DailyMenu = {
  id: string
  date: string
  status: DailyMenuStatus
  products: DailyMenuProduct[]
  notes?: string | null
  createdBy?: string | null
  createdAt?: Date
  updatedAt?: Date
}

export type CreateDailyMenuProductInput = {
  productId: string
  enabled?: boolean
  salePriceCents?: number
}

export type CreateDailyMenuInput = {
  date: string
  products: CreateDailyMenuProductInput[]
  notes?: string | null
}

export type UpdateDailyMenuProductInput = {
  enabled?: boolean
  salePriceCents?: number
}

