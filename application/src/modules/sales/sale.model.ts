import mongoose, { Schema } from "mongoose"

import { paymentMethods, salesChannels } from "./sale.types"

const saleItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    nameSnapshot: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0 },
    unitPriceCents: { type: Number, required: true, min: 0 },
    costSnapshotCents: { type: Number, required: true, min: 0 },
    totalPriceCents: { type: Number, required: true, min: 0 },
    estimatedProfitCents: { type: Number, required: true },
  },
  { _id: false },
)

const saleSchema = new Schema(
  {
    saleDate: { type: Date, required: true, index: true },
    items: {
      type: [saleItemSchema],
      required: true,
      validate: {
        validator: (value: unknown[]) => value.length > 0,
        message: "Venda precisa ter pelo menos um item.",
      },
    },
    grossTotalCents: { type: Number, required: true, min: 0 },
    discountCents: { type: Number, required: true, default: 0, min: 0 },
    netTotalCents: { type: Number, required: true, min: 0 },
    estimatedCostCents: { type: Number, required: true, min: 0 },
    estimatedGrossProfitCents: { type: Number, required: true },
    paymentMethod: {
      type: String,
      required: true,
      enum: paymentMethods,
      index: true,
    },
    salesChannel: {
      type: String,
      required: true,
      enum: salesChannels,
      index: true,
    },
    notes: { type: String, default: null, trim: true },
    createdBy: { type: Schema.Types.ObjectId, default: null, ref: "User" },
  },
  {
    collection: "sales",
    timestamps: true,
  },
)

export const SaleModel =
  mongoose.models.Sale ?? mongoose.model("Sale", saleSchema)

