import { connectToMongoDB } from "@/src/shared/database/mongodb"

import { createAuditLog } from "./audit-log.repository"
import type { RegisterAuditLogInput } from "./audit-log.types"

const sensitiveKeys = new Set([
  "password",
  "passwordHash",
  "accessToken",
  "token",
  "jwt",
])

function maskSensitiveData(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(maskSensitiveData)
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entryValue]) => [
        key,
        sensitiveKeys.has(key) ? "[masked]" : maskSensitiveData(entryValue),
      ]),
    )
  }

  return value
}

export async function registerAuditLog(input: RegisterAuditLogInput) {
  await connectToMongoDB()

  return createAuditLog({
    ...input,
    before: maskSensitiveData(input.before ?? null),
    after: maskSensitiveData(input.after ?? null),
  })
}

export const auditLogService = {
  register: registerAuditLog,
}
