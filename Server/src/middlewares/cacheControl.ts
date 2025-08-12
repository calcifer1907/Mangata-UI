import { Request, Response, NextFunction } from "express";

/**
 * Middleware para controlar la caché del servidor
 * Evita que el navegador almacene en caché las respuestas del servidor
 * Útil para desarrollo y para evitar problemas de datos obsoletos
 */
export const noCache = (req: Request, res: Response, next: NextFunction) => {
  // Headers para evitar caché en el navegador
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  next();
};

/**
 * Middleware para control de caché específico para APIs
 * Permite caché por un tiempo limitado para recursos estáticos
 */
export const apiCacheControl = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Para rutas de API, no cachear
  if (req.path.startsWith("/api/") || req.path.startsWith("/auth/")) {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
  } else {
    // Para otros recursos, caché por 1 hora
    res.setHeader("Cache-Control", "public, max-age=3600");
  }

  next();
};

/**
 * Middleware para limpiar caché específico
 * Útil para rutas que necesitan datos frescos
 */
export const clearCache = (req: Request, res: Response, next: NextFunction) => {
  // Headers agresivos para limpiar caché
  res.setHeader(
    "Cache-Control",
    "no-cache, no-store, must-revalidate, private"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "-1");
  res.setHeader("Surrogate-Control", "no-store");

  next();
};

/**
 * Middleware para caché condicional basado en el método HTTP
 */
export const conditionalCache = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // GET requests pueden tener caché limitado
  if (req.method === "GET") {
    res.setHeader("Cache-Control", "public, max-age=300"); // 5 minutos
  } else {
    // POST, PUT, DELETE no deben cachearse
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
  }

  next();
};
