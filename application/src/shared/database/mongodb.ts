import mongoose, { type Mongoose } from "mongoose"

export const MONGODB_URI_MISSING_MESSAGE =
  "MONGODB_URI is not defined. Set it in your environment before connecting to MongoDB."

type MongooseConnectionCache = {
  connection: Mongoose | null
  promise: Promise<Mongoose> | null
}

declare global {
  var __sweetFactoryMongooseCache: MongooseConnectionCache | undefined
}

function getMongooseCache(): MongooseConnectionCache {
  globalThis.__sweetFactoryMongooseCache ??= {
    connection: null,
    promise: null,
  }

  return globalThis.__sweetFactoryMongooseCache
}

export async function connectToMongoDB(
  uri = process.env.MONGODB_URI,
): Promise<Mongoose> {
  const connectionUri = uri?.trim()

  if (!connectionUri) {
    throw new Error(MONGODB_URI_MISSING_MESSAGE)
  }

  const cache = getMongooseCache()

  if (cache.connection) {
    return cache.connection
  }

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(connectionUri, {
        bufferCommands: false,
      })
      .catch((error: unknown) => {
        cache.promise = null
        throw error
      })
  }

  cache.connection = await cache.promise

  return cache.connection
}

export function getMongoDBReadyState(): number {
  return mongoose.connection.readyState
}
