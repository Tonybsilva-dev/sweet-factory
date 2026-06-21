import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

const { connectMock, mongooseMock } = vi.hoisted(() => {
  const connectMock = vi.fn()
  const mongooseMock = {
    connection: {
      readyState: 1,
    },
    connect: connectMock,
  }

  return { connectMock, mongooseMock }
})

vi.mock("mongoose", () => ({
  default: mongooseMock,
}))

type TestGlobal = typeof globalThis & {
  __sweetFactoryMongooseCache?: unknown
}

describe("MongoDB connection helper", () => {
  beforeEach(() => {
    vi.resetModules()
    connectMock.mockReset()
    delete (globalThis as TestGlobal).__sweetFactoryMongooseCache
    delete process.env.MONGODB_URI
  })

  afterEach(() => {
    delete process.env.MONGODB_URI
  })

  it("throws a clear error when MONGODB_URI is missing", async () => {
    const { connectToMongoDB, MONGODB_URI_MISSING_MESSAGE } = await import(
      "../../shared/database/mongodb"
    )

    await expect(connectToMongoDB()).rejects.toThrow(
      MONGODB_URI_MISSING_MESSAGE,
    )
    expect(connectMock).not.toHaveBeenCalled()
  })

  it("connects once and reuses the cached connection", async () => {
    connectMock.mockResolvedValue(mongooseMock)

    const { connectToMongoDB } = await import("../../shared/database/mongodb")

    const firstConnection = await connectToMongoDB(
      "mongodb://localhost:27017/sweet_factory",
    )
    const secondConnection = await connectToMongoDB(
      "mongodb://localhost:27017/sweet_factory",
    )

    expect(firstConnection).toBe(mongooseMock)
    expect(secondConnection).toBe(mongooseMock)
    expect(connectMock).toHaveBeenCalledTimes(1)
    expect(connectMock).toHaveBeenCalledWith(
      "mongodb://localhost:27017/sweet_factory",
      {
        bufferCommands: false,
      },
    )
  })

  it("clears the pending promise after a connection failure", async () => {
    connectMock.mockRejectedValueOnce(new Error("connection failed"))

    const { connectToMongoDB } = await import("../../shared/database/mongodb")

    await expect(connectToMongoDB("mongodb://localhost:27017/fail")).rejects.toThrow(
      "connection failed",
    )

    connectMock.mockResolvedValue(mongooseMock)
    await expect(
      connectToMongoDB("mongodb://localhost:27017/sweet_factory"),
    ).resolves.toBe(mongooseMock)

    expect(connectMock).toHaveBeenCalledTimes(2)
  })
})
