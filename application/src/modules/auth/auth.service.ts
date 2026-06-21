import { Types } from "mongoose"

import { connectToMongoDB } from "@/src/shared/database/mongodb"
import { unauthorizedError } from "@/src/shared/errors/api-error"

import { signAccessToken } from "./jwt"
import { comparePassword } from "./password"
import type { AuthenticatedUser, User } from "./auth.types"
import { UserModel } from "./user.model"

type UserDocumentLike = {
  _id: Types.ObjectId
  name: string
  email: string
  passwordHash: string
  role: User["role"]
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
  toObject?: () => UserDocumentLike
}

function serializeAuthenticatedUser(
  document: UserDocumentLike,
): AuthenticatedUser {
  const user = document.toObject ? document.toObject() : document

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  }
}

export async function findActiveUserById(id: string) {
  const user = await UserModel.findOne({ _id: id, isActive: true })

  return user ? serializeAuthenticatedUser(user as UserDocumentLike) : null
}

export async function login(input: {
  email: string
  password: string
}): Promise<{
  accessToken: string
  user: AuthenticatedUser
}> {
  await connectToMongoDB()

  const user = (await UserModel.findOne({
    email: input.email,
    isActive: true,
  })) as UserDocumentLike | null

  if (!user) {
    throw unauthorizedError("Email ou senha inválidos.")
  }

  const passwordMatches = await comparePassword(
    input.password,
    user.passwordHash,
  )

  if (!passwordMatches) {
    throw unauthorizedError("Email ou senha inválidos.")
  }

  const authenticatedUser = serializeAuthenticatedUser(user)
  const accessToken = signAccessToken({
    sub: authenticatedUser.id,
    email: authenticatedUser.email,
    role: authenticatedUser.role,
  })

  return {
    accessToken,
    user: authenticatedUser,
  }
}
