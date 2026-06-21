import mongoose, { Schema } from "mongoose"

import { dailyMenuStatuses } from "./daily-menu.types"

const dailyMenuProductSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    nameSnapshot: { type: String, required: true, trim: true },
    enabled: { type: Boolean, required: true, default: true },
    salePriceCents: { type: Number, required: true, min: 0 },
    costSnapshotCents: { type: Number, required: true, min: 0 },
  },
  { _id: false },
)

const dailyMenuSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
      unique: true,
      index: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },
    status: {
      type: String,
      required: true,
      enum: dailyMenuStatuses,
      default: "draft",
      index: true,
    },
    products: {
      type: [dailyMenuProductSchema],
      required: true,
      validate: {
        validator: (value: unknown[]) => value.length > 0,
        message: "Cardápio precisa ter pelo menos um produto.",
      },
    },
    notes: { type: String, default: null, trim: true },
    createdBy: { type: Schema.Types.ObjectId, default: null, ref: "User" },
  },
  {
    collection: "daily_menus",
    timestamps: true,
  },
)

export const DailyMenuModel =
  mongoose.models.DailyMenu ?? mongoose.model("DailyMenu", dailyMenuSchema)

