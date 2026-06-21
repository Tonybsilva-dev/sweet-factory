import { createHash, randomBytes } from "node:crypto"

const RECOVERY_TOKEN_BYTES = 32

export function generatePasswordRecoveryToken(): string {
  return randomBytes(RECOVERY_TOKEN_BYTES).toString("hex")
}

export function hashPasswordRecoveryToken(token: string): string {
  return createHash("sha256").update(token).digest("hex")
}

export function isPasswordRecoveryTokenExpired(
  expiresAt: Date,
  now = new Date(),
): boolean {
  return expiresAt.getTime() <= now.getTime()
}
