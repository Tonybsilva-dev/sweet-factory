import { describe, expect, it } from "vitest"

import { comparePassword, hashPassword } from "./password"

describe("password helpers", () => {
  it("hashes and compares passwords", async () => {
    const passwordHash = await hashPassword("admin123")

    expect(passwordHash).not.toBe("admin123")
    await expect(comparePassword("admin123", passwordHash)).resolves.toBe(true)
    await expect(comparePassword("wrong-password", passwordHash)).resolves.toBe(
      false,
    )
  })
})
