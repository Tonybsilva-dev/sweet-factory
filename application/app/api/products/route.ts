import { requireAuth } from "@/src/modules/auth/current-user"
import {
  createProductSchema,
  listProductsSchema,
} from "@/src/modules/products/product.schemas"
import {
  createProductUseCase,
  listProducts,
} from "@/src/modules/products/product.service"
import { handleRouteError, okResponse } from "@/src/shared/http/api-response"

export async function GET(request: Request) {
  try {
    await requireAuth(request)
    const searchParams = Object.fromEntries(new URL(request.url).searchParams)
    const filters = listProductsSchema.parse(searchParams)
    const products = await listProducts(filters)

    return okResponse({ data: products })
  } catch (error) {
    return handleRouteError(error)
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth(request, ["admin"])
    const body = createProductSchema.parse(await request.json())
    const product = await createProductUseCase(body, { userId: user.id })

    return okResponse({ data: product }, 201)
  } catch (error) {
    return handleRouteError(error)
  }
}

