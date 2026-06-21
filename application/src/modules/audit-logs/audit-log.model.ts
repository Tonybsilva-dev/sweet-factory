import mongoose, { Schema } from "mongoose"

const auditLogSchema = new Schema(
  {
    action: { type: String, required: true, index: true },
    entity: { type: String, required: true },
    entityId: { type: Schema.Types.ObjectId, required: false },
    before: { type: Schema.Types.Mixed, default: null },
    after: { type: Schema.Types.Mixed, default: null },
    userId: { type: Schema.Types.ObjectId, required: false, index: true },
    ip: { type: String, required: false },
    userAgent: { type: String, required: false },
  },
  {
    collection: "audit_logs",
    timestamps: { createdAt: true, updatedAt: false },
  },
)

auditLogSchema.index({ createdAt: -1 })
auditLogSchema.index({ entity: 1, entityId: 1 })

export const AuditLogModel =
  mongoose.models.AuditLog ?? mongoose.model("AuditLog", auditLogSchema)
