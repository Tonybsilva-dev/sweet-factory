import { requireAuth } from "@/src/modules/auth/current-user"
import {
  createSaleSchema,
  listSalesSchema,
} from "@/src/modules/sales/sale.schemas"
import {
  createSaleUseCase,
  listSales,
} from "@/src/modules/sales/sale.service"
import { handleRouteError, okResponse } from "@/src/shared/http/api-response"

export async function GET(request: Request) {
  try {
    await requireAuth(request, ["admin", "operator"])
    const searchParams = Object.fromEntries(new URL(request.url).searchParams)
    const filters = listSalesSchema.parse(searchParams)
    const sales = await listSales(filters)

    return okResponse({ data: sales })
  } catch (error) {
    return handleRouteError(error)
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth(request, ["admin", "operator"])
    const body = createSaleSchema.parse(await request.json())
    const sale = await createSaleUseCase(body, { userId: user.id })

    return okResponse({ data: sale }, 201)
  } catch (error) {
    return handleRouteError(error)
  }
}

