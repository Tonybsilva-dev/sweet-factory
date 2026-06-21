import { NextResponse } from "next/server"
import { ZodError } from "zod"

import { ApiError, isApiError } from "@/src/shared/errors/api-error"

type ErrorBody = {
  error: {
    code: string
    message: string
    details?: Array<{
      field?: string
      message: string
    }>
  }
}

export function okResponse<T>(data: T, status = 200): NextResponse<T> {
  return NextResponse.json(data, { status })
}

export function errorResponse(error: ApiError): NextResponse<ErrorBody> {
  return NextResponse.json(
    {
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
    },
    { status: error.status },
  )
}

export function handleRouteError(error: unknown): NextResponse<ErrorBody> {
  if (error instanceof ZodError) {
    return errorResponse(
      new ApiError(
        "VALIDATION_ERROR",
        "Dados inválidos.",
        error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      ),
    )
  }

  if (isApiError(error)) {
    return errorResponse(error)
  }

  console.error(error)

  return errorResponse(
    new ApiError("INTERNAL_ERROR", "Erro interno inesperado."),
  )
}
