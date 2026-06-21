import { handleRouteError, okResponse } from "@/src/shared/http/api-response"
import {
  createIngredientSchema,
  listIngredientsSchema,
} from "@/src/modules/ingredients/ingredient.schemas"
import {
  createIngredientUseCase,
  listIngredients,
} from "@/src/modules/ingredients/ingredient.service"
import { requireAuth } from "@/src/modules/auth/current-user"

export async function GET(request: Request) {
  try {
    await requireAuth(request)
    const searchParams = Object.fromEntries(new URL(request.url).searchParams)
    const filters = listIngredientsSchema.parse(searchParams)
    const ingredients = await listIngredients(filters)

    return okResponse({ data: ingredients })
  } catch (error) {
    return handleRouteError(error)
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth(request, ["admin"])
    const body = createIngredientSchema.parse(await request.json())
    const ingredient = await createIngredientUseCase(body, { userId: user.id })

    return okResponse({ data: ingredient }, 201)
  } catch (error) {
    return handleRouteError(error)
  }
}
