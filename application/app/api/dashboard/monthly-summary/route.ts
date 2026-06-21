import { requireAuth } from "@/src/modules/auth/current-user"
import { monthlyDashboardQuerySchema } from "@/src/modules/dashboard/dashboard.schemas"
import { getMonthlyDashboardSummary } from "@/src/modules/dashboard/dashboard.service"
import { handleRouteError, okResponse } from "@/src/shared/http/api-response"

export async function GET(request: Request) {
  try {
    await requireAuth(request, ["admin"])
    const searchParams = Object.fromEntries(new URL(request.url).searchParams)
    const period = monthlyDashboardQuerySchema.parse(searchParams)
    const summary = await getMonthlyDashboardSummary(period)

    return okResponse({ data: summary })
  } catch (error) {
    return handleRouteError(error)
  }
}

