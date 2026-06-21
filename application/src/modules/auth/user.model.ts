import mongoose, { Schema } from "mongoose"

import { userRoles } from "./auth.types"

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, enum: userRoles },
    isActive: { type: Boolean, required: true, default: true, index: true },
  },
  {
    collection: "users",
    timestamps: true,
  },
)

export const UserModel =
  mongoose.models.User ?? mongoose.model("User", userSchema)
