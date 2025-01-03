import { apiError } from "@/core/api-responses/api-error";
import { apiSuccess } from "@/core/api-responses/api-success";
import { generateUnits } from "@/core/engine/units-generator";
import { Difficulty } from "@/core/enums/difficulty.enum";
import { CustomError } from "@/core/errors";

export async function GET() {
  try {
    if (process.env.NODE_ENV !== "development") {
      throw new CustomError({
        message: "Esta ruta solo está disponible en el entorno de desarrollo",
        type: "ValidationError",
        statusCode: 403,
      });
    }

    const units = await generateUnits({
      difficulty: Difficulty.ADVANCED,
      numberOfUnits: 5,
    });

    return apiSuccess(units);
  } catch (error) {
    if (error instanceof CustomError) {
      return apiError(error);
    }
    return apiError(
      new CustomError({
        message: "Se ha producido un error al generar las unidades",
      }),
    );
  }
}
