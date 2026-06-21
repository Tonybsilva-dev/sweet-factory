import { requestPasswordRecoverySchema } from "@/src/modules/auth/auth.schemas"
import { requestPasswordRecovery } from "@/src/modules/auth/password-recovery.service"
import { handleRouteError, okResponse } from "@/src/shared/http/api-response"

export async function POST(request: Request) {
  try {
    const body = requestPasswordRecoverySchema.parse(await request.json())
    const result = await requestPasswordRecovery(body)

    return okResponse({ data: result })
  } catch (error) {
    return handleRouteError(error)
  }
}
