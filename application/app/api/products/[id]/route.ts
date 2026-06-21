import { requireAuth } from "@/src/modules/auth/current-user"
import { updateProductSchema } from "@/src/modules/products/product.schemas"
import {
  deactivateProductUseCase,
  getProduct,
  updateProductUseCase,
} from "@/src/modules/products/product.service"
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
    const productId = validateObjectId(id)
    const product = await getProduct(productId)

    return okResponse({ data: product })
  } catch (error) {
    return handleRouteError(error)
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const user = await requireAuth(request, ["admin"])
    const { id } = await context.params
    const productId = validateObjectId(id)
    const body = updateProductSchema.parse(await request.json())
    const product = await updateProductUseCase(productId, body, {
      userId: user.id,
    })

    return okResponse({ data: product })
  } catch (error) {
    return handleRouteError(error)
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const user = await requireAuth(request, ["admin"])
    const { id } = await context.params
    const productId = validateObjectId(id)
    const product = await deactivateProductUseCase(productId, {
      userId: user.id,
    })

    return okResponse({ data: product })
  } catch (error) {
    return handleRouteError(error)
  }
}

