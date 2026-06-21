import { requireAuth } from "@/src/modules/auth/current-user"
import { recalculateProductPriceSchema } from "@/src/modules/products/product.schemas"
import { recalculateProductPriceUseCase } from "@/src/modules/products/product.service"
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
    recalculateProductPriceSchema.parse({})
    const { id } = await context.params
    const productId = validateObjectId(id)
    const product = await recalculateProductPriceUseCase(productId, {
      userId: user.id,
    })

    return okResponse({ data: product })
  } catch (error) {
    return handleRouteError(error)
  }
}

