import { saveListService } from "../services/save-list.service";
import { CustomError } from "@/core/errors";
import { apiError } from "@/core/api-responses/api-error";
import { successResponse } from "@/core/responses/basic.response";
import { NextResponse } from "next/server";
import { authenticate } from "@/core/lib/auth";
import { Role } from "@/core/enums/role.enum";

export async function SaveListController(
  request: Request,
  { params }: { params: { listId: string } },
) {
  try {
    const userId = await authenticate(request, Role.USER);
    await saveListService({ listId: params.listId, userId });
    return NextResponse.json(successResponse());
  } catch (error) {
    if (error instanceof CustomError) {
      return apiError(error);
    }
    return apiError(
      new CustomError({
        message:
          "Se ha producido un error inesperado intentando guardar la lista",
      }),
    );
  }
}
