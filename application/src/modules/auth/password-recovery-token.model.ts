import mongoose, { Schema } from "mongoose"

const passwordRecoveryTokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    tokenHash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
    usedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: "password_recovery_tokens",
    timestamps: { createdAt: true, updatedAt: false },
  },
)

passwordRecoveryTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export const PasswordRecoveryTokenModel =
  mongoose.models.PasswordRecoveryToken ??
  mongoose.model("PasswordRecoveryToken", passwordRecoveryTokenSchema)
