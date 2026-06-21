import { Types } from "mongoose"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { hashPasswordRecoveryToken } from "./password-recovery-token"

const {
  auditLogRegisterMock,
  connectToMongoDBMock,
  passwordRecoveryTokenCreateMock,
  passwordRecoveryTokenFindOneMock,
  passwordRecoveryTokenUpdateManyMock,
  userFindOneMock,
  userUpdateOneMock,
} = vi.hoisted(() => ({
  auditLogRegisterMock: vi.fn(),
  connectToMongoDBMock: vi.fn(),
  passwordRecoveryTokenCreateMock: vi.fn(),
  passwordRecoveryTokenFindOneMock: vi.fn(),
  passwordRecoveryTokenUpdateManyMock: vi.fn(),
  userFindOneMock: vi.fn(),
  userUpdateOneMock: vi.fn(),
}))

vi.mock("@/src/shared/database/mongodb", () => ({
  connectToMongoDB: connectToMongoDBMock,
}))

vi.mock("@/src/modules/audit-logs/audit-log.service", () => ({
  auditLogService: {
    register: auditLogRegisterMock,
  },
}))

vi.mock("./user.model", () => ({
  UserModel: {
    findOne: userFindOneMock,
    updateOne: userUpdateOneMock,
  },
}))

vi.mock("./password-recovery-token.model", () => ({
  PasswordRecoveryTokenModel: {
    create: passwordRecoveryTokenCreateMock,
    findOne: passwordRecoveryTokenFindOneMock,
    updateMany: passwordRecoveryTokenUpdateManyMock,
  },
}))

describe("password recovery service", () => {
  const userId = new Types.ObjectId("507f1f77bcf86cd799439011")

  beforeEach(() => {
    connectToMongoDBMock.mockResolvedValue({})
    auditLogRegisterMock.mockResolvedValue({})
    passwordRecoveryTokenCreateMock.mockResolvedValue({})
    passwordRecoveryTokenFindOneMock.mockReset()
    passwordRecoveryTokenUpdateManyMock.mockResolvedValue({})
    userFindOneMock.mockReset()
    userUpdateOneMock.mockResolvedValue({})
  })

  it("does not reveal whether an email exists", async () => {
    const { requestPasswordRecovery, PASSWORD_RECOVERY_REQUEST_MESSAGE } =
      await import("./password-recovery.service")
    userFindOneMock.mockResolvedValue(null)

    await expect(
      requestPasswordRecovery({ email: "missing@sweetfactory.local" }),
    ).resolves.toEqual({
      message: PASSWORD_RECOVERY_REQUEST_MESSAGE,
    })
    expect(passwordRecoveryTokenCreateMock).not.toHaveBeenCalled()
    expect(auditLogRegisterMock).not.toHaveBeenCalled()
  })

  it("creates a one-time recovery token for active users", async () => {
    const { requestPasswordRecovery, PASSWORD_RECOVERY_REQUEST_MESSAGE } =
      await import("./password-recovery.service")
    userFindOneMock.mockResolvedValue({
      _id: userId,
      name: "Admin",
      email: "admin@sweetfactory.local",
      passwordHash: "hash",
      role: "admin",
      isActive: true,
    })

    const result = await requestPasswordRecovery({
      email: "admin@sweetfactory.local",
    })

    expect(result.message).toBe(PASSWORD_RECOVERY_REQUEST_MESSAGE)
    expect(result.recoveryToken).toHaveLength(64)
    expect(passwordRecoveryTokenUpdateManyMock).toHaveBeenCalledWith(
      { userId, usedAt: null },
      { $set: { usedAt: expect.any(Date) } },
    )
    expect(passwordRecoveryTokenCreateMock).toHaveBeenCalledWith({
      userId,
      tokenHash: hashPasswordRecoveryToken(result.recoveryToken ?? ""),
      expiresAt: expect.any(Date),
    })
    expect(auditLogRegisterMock).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "auth.password_recovery_requested",
        entity: "user",
        entityId: userId.toString(),
        userId: userId.toString(),
      }),
    )
  })

  it("validates active recovery tokens", async () => {
    const { verifyPasswordRecoveryToken } = await import(
      "./password-recovery.service"
    )
    passwordRecoveryTokenFindOneMock.mockResolvedValue({
      _id: new Types.ObjectId(),
      userId,
      tokenHash: "hash",
      expiresAt: new Date(Date.now() + 60_000),
      usedAt: null,
    })

    await expect(
      verifyPasswordRecoveryToken({ token: "valid-token" }),
    ).resolves.toEqual({
      valid: true,
    })
  })

  it("rejects expired recovery tokens with a clear error", async () => {
    const { verifyPasswordRecoveryToken } = await import(
      "./password-recovery.service"
    )
    passwordRecoveryTokenFindOneMock.mockResolvedValue({
      _id: new Types.ObjectId(),
      userId,
      tokenHash: "hash",
      expiresAt: new Date(Date.now() - 60_000),
      usedAt: null,
    })

    await expect(
      verifyPasswordRecoveryToken({ token: "expired-token" }),
    ).rejects.toMatchObject({
      code: "BUSINESS_RULE_ERROR",
      message: "Token de recuperação expirado.",
    })
  })

  it("resets password with hash and invalidates recovery tokens", async () => {
    const { resetPassword, PASSWORD_RESET_SUCCESS_MESSAGE } = await import(
      "./password-recovery.service"
    )
    passwordRecoveryTokenFindOneMock.mockResolvedValue({
      _id: new Types.ObjectId(),
      userId,
      tokenHash: "hash",
      expiresAt: new Date(Date.now() + 60_000),
      usedAt: null,
    })
    userFindOneMock.mockResolvedValue({
      _id: userId,
      name: "Admin",
      email: "admin@sweetfactory.local",
      passwordHash: "old-hash",
      role: "admin",
      isActive: true,
    })

    await expect(
      resetPassword({ token: "valid-token", password: "novaSenha123" }),
    ).resolves.toEqual({
      message: PASSWORD_RESET_SUCCESS_MESSAGE,
    })
    expect(userUpdateOneMock).toHaveBeenCalledWith(
      { _id: userId, isActive: true },
      {
        $set: {
          passwordHash: expect.not.stringContaining("novaSenha123"),
        },
      },
    )
    expect(passwordRecoveryTokenUpdateManyMock).toHaveBeenCalledWith(
      { userId, usedAt: null },
      { $set: { usedAt: expect.any(Date) } },
    )
    expect(auditLogRegisterMock).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "auth.password_reset",
        entity: "user",
        entityId: userId.toString(),
        userId: userId.toString(),
      }),
    )
  })
})
