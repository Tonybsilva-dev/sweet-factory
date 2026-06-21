import jwt, { type JwtPayload } from "jsonwebtoken"

import {
  unauthorizedError,
  type ApiError,
} from "@/src/shared/errors/api-error"

import type { JwtUserPayload, UserRole } from "./auth.types"

export const JWT_SECRET_MISSING_MESSAGE =
  "JWT_SECRET is not defined. Set it in your environment before signing tokens."

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET?.trim()

  if (!secret) {
    throw new Error(JWT_SECRET_MISSING_MESSAGE)
  }

  return secret
}

export function signAccessToken(payload: JwtUserPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "8h" })
}

function isUserRole(value: unknown): value is UserRole {
  return value === "admin" || value === "operator"
}

export function verifyAccessToken(token: string): JwtUserPayload {
  try {
    const payload = jwt.verify(token, getJwtSecret()) as JwtPayload

    if (
      typeof payload.sub !== "string" ||
      typeof payload.email !== "string" ||
      !isUserRole(payload.role)
    ) {
      throw unauthorizedError("Token inválido.")
    }

    return {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
    }
  } catch (error) {
    if ((error as ApiError).code === "UNAUTHORIZED") {
      throw error
    }

    throw unauthorizedError("Token inválido.")
  }
}
