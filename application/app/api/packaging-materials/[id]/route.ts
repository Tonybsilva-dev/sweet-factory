import { updatePackagingMaterialSchema } from "@/src/modules/packaging-materials/packaging-material.schemas"
import {
  deactivatePackagingMaterialUseCase,
  updatePackagingMaterialUseCase,
} from "@/src/modules/packaging-materials/packaging-material.service"
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
    const materialId = validateObjectId(id)
    const body = updatePackagingMaterialSchema.parse(await request.json())
    const material = await updatePackagingMaterialUseCase(materialId, body, {
      userId: user.id,
    })

    return okResponse({ data: material })
  } catch (error) {
    return handleRouteError(error)
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const user = await requireAuth(_request, ["admin"])
    const { id } = await context.params
    const materialId = validateObjectId(id)
    const material = await deactivatePackagingMaterialUseCase(materialId, {
      userId: user.id,
    })

    return okResponse({ data: material })
  } catch (error) {
    return handleRouteError(error)
  }
}
