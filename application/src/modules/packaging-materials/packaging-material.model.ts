import mongoose, { Schema } from "mongoose"

import { packagingMaterialTypes } from "./packaging-material.types"

const packagingMaterialSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    type: {
      type: String,
      required: true,
      enum: packagingMaterialTypes,
      index: true,
    },
    currentStockQuantity: { type: Number, required: true, default: 0, min: 0 },
    unitCostCents: { type: Number, required: true, default: 0, min: 0 },
    isActive: { type: Boolean, required: true, default: true, index: true },
    deletedAt: { type: Date, default: null, index: true },
  },
  {
    collection: "packaging_materials",
    timestamps: true,
  },
)

export const PackagingMaterialModel =
  mongoose.models.PackagingMaterial ??
  mongoose.model("PackagingMaterial", packagingMaterialSchema)
