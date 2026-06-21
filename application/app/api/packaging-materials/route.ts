import {
  createPackagingMaterialSchema,
  listPackagingMaterialsSchema,
} from "@/src/modules/packaging-materials/packaging-material.schemas"
import {
  createPackagingMaterialUseCase,
  listPackagingMaterials,
} from "@/src/modules/packaging-materials/packaging-material.service"
import { requireAuth } from "@/src/modules/auth/current-user"
import { handleRouteError, okResponse } from "@/src/shared/http/api-response"

export async function GET(request: Request) {
  try {
    await requireAuth(request)
    const searchParams = Object.fromEntries(new URL(request.url).searchParams)
    const filters = listPackagingMaterialsSchema.parse(searchParams)
    const materials = await listPackagingMaterials(filters)

    return okResponse({ data: materials })
  } catch (error) {
    return handleRouteError(error)
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth(request, ["admin"])
    const body = createPackagingMaterialSchema.parse(await request.json())
    const material = await createPackagingMaterialUseCase(body, {
      userId: user.id,
    })

    return okResponse({ data: material }, 201)
  } catch (error) {
    return handleRouteError(error)
  }
}
