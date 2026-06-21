export type AuditLogAction =
  | "ingredient.created"
  | "ingredient.updated"
  | "ingredient.deactivated"
  | "ingredient.reactivated"
  | "packaging.created"
  | "packaging.updated"
  | "packaging.deactivated"
  | "purchase.created"
  | "ingredient.stock_updated"
  | "ingredient.average_cost_updated"
  | "packaging.stock_updated"
  | "packaging.unit_cost_updated"
  | "product.created"
  | "product.updated"
  | "product.price_recalculated"
  | "product.deactivated"
  | "daily_menu.created"
  | "daily_menu.product_enabled"
  | "daily_menu.product_disabled"
  | "daily_menu.published"
  | "daily_menu.closed"
  | "sale.created"
  | "auth.password_recovery_requested"
  | "auth.password_reset"

export type AuditLogEntity =
  | "ingredient"
  | "packaging_material"
  | "purchase"
  | "product"
  | "daily_menu"
  | "sale"
  | "user"
  | "audit_log"

export type RegisterAuditLogInput = {
  action: AuditLogAction
  entity: AuditLogEntity
  entityId?: string
  before?: unknown
  after?: unknown
  userId?: string
  ip?: string
  userAgent?: string
}
