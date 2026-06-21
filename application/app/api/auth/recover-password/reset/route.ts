import { resetPasswordSchema } from "@/src/modules/auth/auth.schemas"
import { resetPassword } from "@/src/modules/auth/password-recovery.service"
import { handleRouteError, okResponse } from "@/src/shared/http/api-response"

export async function POST(request: Request) {
  try {
    const body = resetPasswordSchema.parse(await request.json())
    const result = await resetPassword(body)

    return okResponse({ data: result })
  } catch (error) {
    return handleRouteError(error)
  }
}
