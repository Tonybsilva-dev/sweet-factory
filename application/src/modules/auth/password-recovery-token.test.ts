import { describe, expect, it } from "vitest"

import {
  generatePasswordRecoveryToken,
  hashPasswordRecoveryToken,
  isPasswordRecoveryTokenExpired,
} from "./password-recovery-token"

describe("password recovery token helpers", () => {
  it("generates random tokens", () => {
    const firstToken = generatePasswordRecoveryToken()
    const secondToken = generatePasswordRecoveryToken()

    expect(firstToken).toHaveLength(64)
    expect(secondToken).toHaveLength(64)
    expect(firstToken).not.toBe(secondToken)
  })

  it("hashes tokens deterministically without returning the original token", () => {
    const token = "recovery-token"
    const tokenHash = hashPasswordRecoveryToken(token)

    expect(tokenHash).toHaveLength(64)
    expect(tokenHash).toBe(hashPasswordRecoveryToken(token))
    expect(tokenHash).not.toBe(token)
  })

  it("detects expired tokens", () => {
    const now = new Date("2026-06-21T12:00:00.000Z")

    expect(
      isPasswordRecoveryTokenExpired(
        new Date("2026-06-21T11:59:59.999Z"),
        now,
      ),
    ).toBe(true)
    expect(isPasswordRecoveryTokenExpired(now, now)).toBe(true)
    expect(
      isPasswordRecoveryTokenExpired(
        new Date("2026-06-21T12:00:00.001Z"),
        now,
      ),
    ).toBe(false)
  })
})
