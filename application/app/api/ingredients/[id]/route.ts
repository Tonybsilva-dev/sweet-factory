import { updateIngredientSchema } from "@/src/modules/ingredients/ingredient.schemas"
import {
  deactivateIngredientUseCase,
  updateIngredientUseCase,
} from "@/src/modules/ingredients/ingredient.service"
import { requireAuth } from "@/src/modules/auth/current-user"
import { handleRouteError, okResponse } from "@/src/shared/http/api-response"
import { validateObjectId } from "@/src/shared/validation/object-id"

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const user = await requireAuth(request, ["admin"])
    const { id } = await context.params
    const ingredientId = validateObjectId(id)
    const body = updateIngredientSchema.parse(await request.json())
    const ingredient = await updateIngredientUseCase(ingredientId, body, {
      userId: user.id,
    })

    return okResponse({ data: ingredient })
  } catch (error) {
    return handleRouteError(error)
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const user = await requireAuth(_request, ["admin"])
    const { id } = await context.params
    const ingredientId = validateObjectId(id)
    const ingredient = await deactivateIngredientUseCase(ingredientId, {
      userId: user.id,
    })

    return okResponse({ data: ingredient })
  } catch (error) {
    return handleRouteError(error)
  }
}
