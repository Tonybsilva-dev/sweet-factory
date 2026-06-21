import { connectToMongoDB } from "@/src/shared/database/mongodb"
import {
  forbiddenError,
  unauthorizedError,
} from "@/src/shared/errors/api-error"

import type { AuthenticatedUser, UserRole } from "./auth.types"
import { findActiveUserById } from "./auth.service"
import { verifyAccessToken } from "./jwt"

function getBearerToken(request: Request): string {
  const authorization = request.headers.get("authorization")

  if (!authorization?.startsWith("Bearer ")) {
    throw unauthorizedError()
  }

  const token = authorization.slice("Bearer ".length).trim()

  if (!token) {
    throw unauthorizedError()
  }

  return token
}

export async function getCurrentUser(
  request: Request,
): Promise<AuthenticatedUser | null> {
  const authorization = request.headers.get("authorization")

  if (!authorization) {
    return null
  }

  const token = getBearerToken(request)
  const payload = verifyAccessToken(token)

  await connectToMongoDB()

  return findActiveUserById(payload.sub)
}

export async function requireAuth(
  request: Request,
  allowedRoles?: UserRole[],
): Promise<AuthenticatedUser> {
  const token = getBearerToken(request)
  const payload = verifyAccessToken(token)

  await connectToMongoDB()

  const user = await findActiveUserById(payload.sub)

  if (!user) {
    throw unauthorizedError()
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    throw forbiddenError()
  }

  return user
}
