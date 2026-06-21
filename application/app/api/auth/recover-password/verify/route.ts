import { verifyPasswordRecoverySchema } from "@/src/modules/auth/auth.schemas"
import { verifyPasswordRecoveryToken } from "@/src/modules/auth/password-recovery.service"
import { handleRouteError, okResponse } from "@/src/shared/http/api-response"

export async function POST(request: Request) {
  try {
    const body = verifyPasswordRecoverySchema.parse(await request.json())
    const result = await verifyPasswordRecoveryToken(body)

    return okResponse({ data: result })
  } catch (error) {
    return handleRouteError(error)
  }
}
