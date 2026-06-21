import mongoose, { Schema } from "mongoose"

const ingredientSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    baseUnit: { type: String, required: true, enum: ["g", "ml", "un"] },
    category: { type: String, required: true, trim: true, index: true },
    currentStockQuantity: { type: Number, required: true, default: 0, min: 0 },
    averageCostCents: { type: Number, required: true, default: 0, min: 0 },
    isActive: { type: Boolean, required: true, default: true, index: true },
    deletedAt: { type: Date, default: null, index: true },
  },
  {
    collection: "ingredients",
    timestamps: true,
  },
)

export const IngredientModel =
  mongoose.models.Ingredient ??
  mongoose.model("Ingredient", ingredientSchema)
