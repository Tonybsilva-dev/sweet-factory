import { afterEach, beforeEach, describe, expect, it } from "vitest"

import {
  JWT_SECRET_MISSING_MESSAGE,
  signAccessToken,
  verifyAccessToken,
} from "./jwt"

describe("JWT helpers", () => {
  const previousJwtSecret = process.env.JWT_SECRET

  beforeEach(() => {
    process.env.JWT_SECRET = "test-secret"
  })

  afterEach(() => {
    process.env.JWT_SECRET = previousJwtSecret
  })

  it("signs and verifies access tokens", () => {
    const token = signAccessToken({
      sub: "507f1f77bcf86cd799439011",
      email: "admin@sweetfactory.local",
      role: "admin",
    })

    expect(verifyAccessToken(token)).toEqual({
      sub: "507f1f77bcf86cd799439011",
      email: "admin@sweetfactory.local",
      role: "admin",
    })
  })

  it("throws a clear error when JWT_SECRET is missing", () => {
    delete process.env.JWT_SECRET

    expect(() =>
      signAccessToken({
        sub: "507f1f77bcf86cd799439011",
        email: "admin@sweetfactory.local",
        role: "admin",
      }),
    ).toThrow(JWT_SECRET_MISSING_MESSAGE)
  })

  it("rejects invalid tokens with UNAUTHORIZED", () => {
    expect(() => verifyAccessToken("invalid-token")).toThrow("Token inválido.")
  })
})
