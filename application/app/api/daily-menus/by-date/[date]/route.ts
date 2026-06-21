import { requireAuth } from "@/src/modules/auth/current-user"
import { dailyMenuDateSchema } from "@/src/modules/daily-menu/daily-menu.schemas"
import { getDailyMenuByDate } from "@/src/modules/daily-menu/daily-menu.service"
import { handleRouteError, okResponse } from "@/src/shared/http/api-response"

type RouteContext = {
  params: Promise<{
    date: string
  }>
}

export async function GET(request: Request, context: RouteContext) {
  try {
    await requireAuth(request)
    const { date } = await context.params
    const dailyMenuDate = dailyMenuDateSchema.parse(date)
    const dailyMenu = await getDailyMenuByDate(dailyMenuDate)

    return okResponse({ data: dailyMenu })
  } catch (error) {
    return handleRouteError(error)
  }
}

