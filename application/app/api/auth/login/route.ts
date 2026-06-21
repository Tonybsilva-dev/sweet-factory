import { loginSchema } from "@/src/modules/auth/auth.schemas"
import { login } from "@/src/modules/auth/auth.service"
import { handleRouteError, okResponse } from "@/src/shared/http/api-response"

export async function POST(request: Request) {
  try {
    const body = loginSchema.parse(await request.json())
    const session = await login(body)

    return okResponse({ data: session })
  } catch (error) {
    return handleRouteError(error)
  }
}
