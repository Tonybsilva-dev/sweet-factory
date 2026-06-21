import { Types } from "mongoose"
import { z } from "zod"

export const objectIdSchema = z
  .string()
  .refine((value) => Types.ObjectId.isValid(value), {
    message: "ID inválido.",
  })

export function validateObjectId(id: string): string {
  return objectIdSchema.parse(id)
}
