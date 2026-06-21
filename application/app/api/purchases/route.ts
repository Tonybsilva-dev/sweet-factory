import {
  createPurchaseSchema,
  listPurchasesSchema,
} from "@/src/modules/purchases/purchase.schemas"
import {
  createPurchaseUseCase,
  listPurchases,
} from "@/src/modules/purchases/purchase.service"
import { requireAuth } from "@/src/modules/auth/current-user"
import { handleRouteError, okResponse } from "@/src/shared/http/api-response"

export async function GET(request: Request) {
  try {
    await requireAuth(request)
    const searchParams = Object.fromEntries(new URL(request.url).searchParams)
    const filters = listPurchasesSchema.parse(searchParams)
    const purchases = await listPurchases(filters)

    return okResponse({ data: purchases })
  } catch (error) {
    return handleRouteError(error)
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth(request, ["admin"])
    const body = createPurchaseSchema.parse(await request.json())
    const purchase = await createPurchaseUseCase(body, { userId: user.id })

    return okResponse({ data: purchase }, 201)
  } catch (error) {
    return handleRouteError(error)
  }
}
