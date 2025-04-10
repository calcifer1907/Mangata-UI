import { Response, Request, NextFunction } from "express";

export const handleError = (
  error: any,
  _request: Request,
  response: Response,
  next: NextFunction
): Response<any, Record<string, any>> | undefined => {
  if (error.code === "ER_DUP_ENTRY") {
    return response.status(409).json({
      status: 409,
      error: "Conflict",
      message: "El correo ya existe",
    });
  }

  // Otros errores
  response.status(500).json({
    status: 500,
    error: "Internal Server Error",
    message: "Something went wrong",
  });
  next();
};
