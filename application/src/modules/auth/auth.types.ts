export const userRoles = ["admin", "operator"] as const

export type UserRole = (typeof userRoles)[number]

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
}

export type AuthenticatedUser = Pick<User, "id" | "name" | "email" | "role">

export type JwtUserPayload = {
  sub: string
  email: string
  role: UserRole
}
