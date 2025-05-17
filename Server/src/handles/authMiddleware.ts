import { Response, Request, NextFunction } from "express";

// Extend the Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
import { verifyToken } from "../auth";

// Middleware para proteger las rutas
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(403).json({ message: "Token no proporcionado" });
  } else {
    // Eliminar "Bearer " del token
    const bearerToken = token.split(" ")[1];

    const decoded = verifyToken(bearerToken);
    if (!decoded) {
      res.status(403).json({ message: "Token no válido" });
    } else {
      // Si el token es válido, adjuntamos la información del usuario al request
      req.user = decoded;
    }
  }

  next();
};
