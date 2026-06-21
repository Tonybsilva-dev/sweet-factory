import { requireAuth } from "@/src/modules/auth/current-user"
import { dailyMenuActionSchema } from "@/src/modules/daily-menu/daily-menu.schemas"
import { publishDailyMenuUseCase } from "@/src/modules/daily-menu/daily-menu.service"
import { handleRouteError, okResponse } from "@/src/shared/http/api-response"
import { validateObjectId } from "@/src/shared/validation/object-id"

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function POST(request: Request, context: RouteContext) {
  try {
    const user = await requireAuth(request, ["admin"])
    dailyMenuActionSchema.parse({})
    const { id } = await context.params
    const dailyMenuId = validateObjectId(id)
    const dailyMenu = await publishDailyMenuUseCase(dailyMenuId, {
      userId: user.id,
    })

    return okResponse({ data: dailyMenu })
  } catch (error) {
    return handleRouteError(error)
  }
}
