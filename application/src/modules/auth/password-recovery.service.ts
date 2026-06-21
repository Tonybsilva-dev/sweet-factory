import { Types } from "mongoose"

import { auditLogService } from "@/src/modules/audit-logs/audit-log.service"
import { connectToMongoDB } from "@/src/shared/database/mongodb"
import { businessRuleError } from "@/src/shared/errors/api-error"

import {
  generatePasswordRecoveryToken,
  hashPasswordRecoveryToken,
  isPasswordRecoveryTokenExpired,
} from "./password-recovery-token"
import { PasswordRecoveryTokenModel } from "./password-recovery-token.model"
import { hashPassword } from "./password"
import type { User } from "./auth.types"
import { UserModel } from "./user.model"

export const PASSWORD_RECOVERY_REQUEST_MESSAGE =
  "Se o email existir, enviaremos instruções para recuperação."

export const PASSWORD_RESET_SUCCESS_MESSAGE = "Senha redefinida com sucesso."

export const PASSWORD_RECOVERY_TOKEN_EXPIRES_IN_MS = 30 * 60 * 1000

type UserDocumentLike = {
  _id: Types.ObjectId
  name: string
  email: string
  passwordHash: string
  role: User["role"]
  isActive: boolean
}

type PasswordRecoveryTokenDocumentLike = {
  _id: Types.ObjectId
  userId: Types.ObjectId
  tokenHash: string
  expiresAt: Date
  usedAt?: Date | null
}

function shouldExposeRecoveryToken(): boolean {
  return process.env.NODE_ENV !== "production"
}

async function findRecoveryToken(token: string) {
  const tokenHash = hashPasswordRecoveryToken(token)

  return (await PasswordRecoveryTokenModel.findOne({
    tokenHash,
  })) as PasswordRecoveryTokenDocumentLike | null
}

function assertRecoveryTokenCanBeUsed(
  recoveryToken: PasswordRecoveryTokenDocumentLike | null,
): PasswordRecoveryTokenDocumentLike {
  if (!recoveryToken || recoveryToken.usedAt) {
    throw businessRuleError("Token de recuperação inválido.")
  }

  if (isPasswordRecoveryTokenExpired(recoveryToken.expiresAt)) {
    throw businessRuleError("Token de recuperação expirado.")
  }

  return recoveryToken
}

export async function requestPasswordRecovery(input: {
  email: string
}): Promise<{
  message: string
  recoveryToken?: string
}> {
  await connectToMongoDB()

  const user = (await UserModel.findOne({
    email: input.email,
    isActive: true,
  })) as UserDocumentLike | null

  if (!user) {
    return {
      message: PASSWORD_RECOVERY_REQUEST_MESSAGE,
    }
  }

  const now = new Date()
  const recoveryToken = generatePasswordRecoveryToken()
  const tokenHash = hashPasswordRecoveryToken(recoveryToken)
  const expiresAt = new Date(
    now.getTime() + PASSWORD_RECOVERY_TOKEN_EXPIRES_IN_MS,
  )

  await PasswordRecoveryTokenModel.updateMany(
    { userId: user._id, usedAt: null },
    { $set: { usedAt: now } },
  )

  await PasswordRecoveryTokenModel.create({
    userId: user._id,
    tokenHash,
    expiresAt,
  })

  await auditLogService.register({
    action: "auth.password_recovery_requested",
    entity: "user",
    entityId: user._id.toString(),
    userId: user._id.toString(),
    before: null,
    after: {
      email: user.email,
      expiresAt,
      token: recoveryToken,
    },
  })

  return {
    message: PASSWORD_RECOVERY_REQUEST_MESSAGE,
    ...(shouldExposeRecoveryToken() ? { recoveryToken } : {}),
  }
}

export async function verifyPasswordRecoveryToken(input: {
  token: string
}): Promise<{
  valid: true
}> {
  await connectToMongoDB()

  assertRecoveryTokenCanBeUsed(await findRecoveryToken(input.token))

  return {
    valid: true,
  }
}

export async function resetPassword(input: {
  token: string
  password: string
}): Promise<{
  message: string
}> {
  await connectToMongoDB()

  const recoveryToken = assertRecoveryTokenCanBeUsed(
    await findRecoveryToken(input.token),
  )
  const user = (await UserModel.findOne({
    _id: recoveryToken.userId,
    isActive: true,
  })) as UserDocumentLike | null

  if (!user) {
    throw businessRuleError("Token de recuperação inválido.")
  }

  const now = new Date()
  const passwordHash = await hashPassword(input.password)

  await UserModel.updateOne(
    { _id: user._id, isActive: true },
    { $set: { passwordHash } },
  )

  await PasswordRecoveryTokenModel.updateMany(
    { userId: user._id, usedAt: null },
    { $set: { usedAt: now } },
  )

  await auditLogService.register({
    action: "auth.password_reset",
    entity: "user",
    entityId: user._id.toString(),
    userId: user._id.toString(),
    before: null,
    after: {
      passwordResetAt: now,
    },
  })

  return {
    message: PASSWORD_RESET_SUCCESS_MESSAGE,
  }
}
