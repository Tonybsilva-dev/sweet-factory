export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "BUSINESS_RULE_ERROR"
  | "INTERNAL_ERROR"

export type ApiErrorDetail = {
  field?: string
  message: string
}

const statusByCode: Record<ApiErrorCode, number> = {
  VALIDATION_ERROR: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  BUSINESS_RULE_ERROR: 422,
  INTERNAL_ERROR: 500,
}

export class ApiError extends Error {
  readonly code: ApiErrorCode
  readonly status: number
  readonly details?: ApiErrorDetail[]

  constructor(
    code: ApiErrorCode,
    message: string,
    details?: ApiErrorDetail[],
  ) {
    super(message)
    this.name = "ApiError"
    this.code = code
    this.status = statusByCode[code]
    this.details = details
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

export function notFoundError(message: string): ApiError {
  return new ApiError("NOT_FOUND", message)
}

export function businessRuleError(message: string): ApiError {
  return new ApiError("BUSINESS_RULE_ERROR", message)
}

export function conflictError(message: string): ApiError {
  return new ApiError("CONFLICT", message)
}

export function unauthorizedError(message = "Usuário não autenticado."): ApiError {
  return new ApiError("UNAUTHORIZED", message)
}

export function forbiddenError(message = "Usuário sem permissão."): ApiError {
  return new ApiError("FORBIDDEN", message)
}
