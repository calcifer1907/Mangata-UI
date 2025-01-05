import { Response, Request, NextFunction } from "express";
import { verifyToken } from "../auth";

// Middleware para proteger las rutas
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado" });
  }

  // Eliminar "Bearer " del token
  const bearerToken = token.split(" ")[1];

  const decoded = verifyToken(bearerToken);
  if (!decoded) {
    return res.status(403).json({ message: "Token no válido" });
  }

  // Si el token es válido, adjuntamos la información del usuario al request
  //@ts-ignore
  req.user = decoded;
  next();
};
