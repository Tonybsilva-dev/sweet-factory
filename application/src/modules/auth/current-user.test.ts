import { beforeEach, describe, expect, it, vi } from "vitest"

import { signAccessToken } from "./jwt"

const { connectToMongoDBMock, findActiveUserByIdMock } = vi.hoisted(() => ({
  connectToMongoDBMock: vi.fn(),
  findActiveUserByIdMock: vi.fn(),
}))

vi.mock("@/src/shared/database/mongodb", () => ({
  connectToMongoDB: connectToMongoDBMock,
}))

vi.mock("./auth.service", () => ({
  findActiveUserById: findActiveUserByIdMock,
}))

describe("current user helpers", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = "test-secret"
    connectToMongoDBMock.mockResolvedValue({})
    findActiveUserByIdMock.mockReset()
  })

  it("rejects requests without bearer token", async () => {
    const { requireAuth } = await import("./current-user")

    await expect(requireAuth(new Request("http://localhost"))).rejects.toMatchObject(
      {
        code: "UNAUTHORIZED",
      },
    )
  })

  it("rejects invalid tokens", async () => {
    const { requireAuth } = await import("./current-user")

    await expect(
      requireAuth(
        new Request("http://localhost", {
          headers: { authorization: "Bearer invalid-token" },
        }),
      ),
    ).rejects.toMatchObject({
      code: "UNAUTHORIZED",
    })
  })

  it("returns authenticated user for valid token", async () => {
    const { requireAuth } = await import("./current-user")
    const token = signAccessToken({
      sub: "507f1f77bcf86cd799439011",
      email: "admin@sweetfactory.local",
      role: "admin",
    })
    const user = {
      id: "507f1f77bcf86cd799439011",
      name: "Admin",
      email: "admin@sweetfactory.local",
      role: "admin",
    }
    findActiveUserByIdMock.mockResolvedValue(user)

    await expect(
      requireAuth(
        new Request("http://localhost", {
          headers: { authorization: `Bearer ${token}` },
        }),
      ),
    ).resolves.toEqual(user)
  })

  it("rejects users without an allowed role", async () => {
    const { requireAuth } = await import("./current-user")
    const token = signAccessToken({
      sub: "507f1f77bcf86cd799439011",
      email: "operator@sweetfactory.local",
      role: "operator",
    })
    findActiveUserByIdMock.mockResolvedValue({
      id: "507f1f77bcf86cd799439011",
      name: "Operator",
      email: "operator@sweetfactory.local",
      role: "operator",
    })

    await expect(
      requireAuth(
        new Request("http://localhost", {
          headers: { authorization: `Bearer ${token}` },
        }),
        ["admin"],
      ),
    ).rejects.toMatchObject({
      code: "FORBIDDEN",
    })
  })
})
