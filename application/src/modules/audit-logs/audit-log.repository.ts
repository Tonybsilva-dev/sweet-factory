import { AuditLogModel } from "./audit-log.model"
import type { RegisterAuditLogInput } from "./audit-log.types"

export async function createAuditLog(input: RegisterAuditLogInput) {
  return AuditLogModel.create(input)
}
