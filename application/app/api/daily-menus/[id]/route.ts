import { requireAuth } from "@/src/modules/auth/current-user"
import { getDailyMenu } from "@/src/modules/daily-menu/daily-menu.service"
import { handleRouteError, okResponse } from "@/src/shared/http/api-response"
import { validateObjectId } from "@/src/shared/validation/object-id"

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function GET(request: Request, context: RouteContext) {
  try {
    await requireAuth(request)
    const { id } = await context.params
    const dailyMenuId = validateObjectId(id)
    const dailyMenu = await getDailyMenu(dailyMenuId)

    return okResponse({ data: dailyMenu })
  } catch (error) {
    return handleRouteError(error)
  }
}

