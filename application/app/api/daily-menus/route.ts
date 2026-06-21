import { requireAuth } from "@/src/modules/auth/current-user"
import { createDailyMenuSchema } from "@/src/modules/daily-menu/daily-menu.schemas"
import { createDailyMenuUseCase } from "@/src/modules/daily-menu/daily-menu.service"
import { handleRouteError, okResponse } from "@/src/shared/http/api-response"

export async function POST(request: Request) {
  try {
    const user = await requireAuth(request, ["admin"])
    const body = createDailyMenuSchema.parse(await request.json())
    const dailyMenu = await createDailyMenuUseCase(body, { userId: user.id })

    return okResponse({ data: dailyMenu }, 201)
  } catch (error) {
    return handleRouteError(error)
  }
}

