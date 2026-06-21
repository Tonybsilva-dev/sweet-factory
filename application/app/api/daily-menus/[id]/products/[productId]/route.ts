import { requireAuth } from "@/src/modules/auth/current-user"
import { updateDailyMenuProductSchema } from "@/src/modules/daily-menu/daily-menu.schemas"
import { updateDailyMenuProductUseCase } from "@/src/modules/daily-menu/daily-menu.service"
import { handleRouteError, okResponse } from "@/src/shared/http/api-response"
import { validateObjectId } from "@/src/shared/validation/object-id"

type RouteContext = {
  params: Promise<{
    id: string
    productId: string
  }>
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const user = await requireAuth(request, ["admin"])
    const { id, productId } = await context.params
    const dailyMenuId = validateObjectId(id)
    const validatedProductId = validateObjectId(productId)
    const body = updateDailyMenuProductSchema.parse(await request.json())
    const dailyMenu = await updateDailyMenuProductUseCase(
      dailyMenuId,
      validatedProductId,
      body,
      { userId: user.id },
    )

    return okResponse({ data: dailyMenu })
  } catch (error) {
    return handleRouteError(error)
  }
}
