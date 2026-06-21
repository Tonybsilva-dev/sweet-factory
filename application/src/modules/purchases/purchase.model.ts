import mongoose, { Schema } from "mongoose"

const purchaseItemSchema = new Schema(
  {
    itemType: {
      type: String,
      required: true,
      enum: ["ingredient", "packaging_material"],
      index: true,
    },
    itemId: { type: Schema.Types.ObjectId, required: true, index: true },
    nameSnapshot: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true },
    normalizedQuantity: { type: Number, required: true, min: 0 },
    normalizedUnit: { type: String, required: true },
    totalPriceCents: { type: Number, required: true, min: 0 },
    unitPriceCents: { type: Number, required: true, min: 0 },
  },
  { _id: false },
)

const purchaseSchema = new Schema(
  {
    purchaseDate: { type: Date, required: true, index: true },
    supplierName: { type: String, default: null },
    items: { type: [purchaseItemSchema], required: true },
    totalAmountCents: { type: Number, required: true, min: 0 },
    notes: { type: String, default: null },
    createdBy: { type: Schema.Types.ObjectId, required: false, index: true },
  },
  {
    collection: "purchases",
    timestamps: { createdAt: true, updatedAt: false },
  },
)

export const PurchaseModel =
  mongoose.models.Purchase ?? mongoose.model("Purchase", purchaseSchema)
