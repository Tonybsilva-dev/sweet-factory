import mongoose, { Schema } from "mongoose"

import { acceptedUnits } from "@/src/shared/units/units"

const productIngredientSchema = new Schema(
  {
    ingredientId: { type: Schema.Types.ObjectId, required: true, ref: "Ingredient" },
    nameSnapshot: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true, enum: acceptedUnits },
    normalizedQuantity: { type: Number, required: true, min: 0 },
    normalizedUnit: { type: String, required: true, enum: acceptedUnits },
    costSnapshotCents: { type: Number, required: true, min: 0 },
  },
  { _id: false },
)

const productMaterialSchema = new Schema(
  {
    materialId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "PackagingMaterial",
    },
    nameSnapshot: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0 },
    unitCostSnapshotCents: { type: Number, required: true, min: 0 },
  },
  { _id: false },
)

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    description: { type: String, default: null, trim: true },
    category: { type: String, default: null, trim: true, index: true },
    imageUrl: { type: String, default: null, trim: true },
    ingredients: {
      type: [productIngredientSchema],
      required: true,
      validate: {
        validator: (value: unknown[]) => value.length > 0,
        message: "Produto precisa ter pelo menos um ingrediente.",
      },
    },
    materials: { type: [productMaterialSchema], required: true, default: [] },
    recipeYield: { type: Number, required: true, min: 0 },
    lossPercentage: { type: Number, required: true, min: 0, max: 99.9999 },
    desiredMarginPercentage: {
      type: Number,
      required: true,
      min: 0.0001,
      max: 99.9999,
    },
    calculatedCostCents: { type: Number, required: true, min: 0 },
    suggestedPriceCents: { type: Number, required: true, min: 0 },
    salePriceCents: { type: Number, required: true, min: 0 },
    isActive: { type: Boolean, required: true, default: true, index: true },
    deletedAt: { type: Date, default: null, index: true },
    deletedBy: { type: Schema.Types.ObjectId, default: null, ref: "User" },
  },
  {
    collection: "products",
    timestamps: true,
  },
)

export const ProductModel =
  mongoose.models.Product ?? mongoose.model("Product", productSchema)

