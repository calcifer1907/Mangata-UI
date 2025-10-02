import { Request, Response, NextFunction } from "express";

/**
 * Middleware para optimizar el rendimiento del servidor
 * Incluye compresión, límites de tamaño y optimizaciones
 */
export const performanceOptimizer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Limitar el tamaño del body para evitar ataques
  if (req.headers["content-length"]) {
    const contentLength = parseInt(req.headers["content-length"]);
    if (contentLength > 10 * 1024 * 1024) {
      // 10MB límite
      res.status(413).json({
        error: "Payload too large",
        message: "El archivo es demasiado grande",
      });
      return;
    }
  }

  // Optimizar headers para mejor rendimiento
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Headers para optimizar la carga
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Keep-Alive", "timeout=5, max=1000");

  next();
};

/**
 * Middleware para monitorear el tiempo de respuesta
 */
export const responseTimeMonitor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;

    // Log solo si la respuesta es lenta (> 1 segundo)
    if (duration > 000) {
      console.warn(
        `⚠️  Respuesta lenta: ${req.method} ${req.path} - ${duration}ms - Status: ${status}`
      );
    }

    // Log para respuestas muy lentas (> 5 segundos)
    if (duration > 5000) {
      console.error(
        `🚨 Respuesta muy lenta: ${req.method} ${req.path} - ${duration}ms - Status: ${status}`
      );
    }
  });

  next();
};

/**
 * Middleware para limpiar memoria y optimizar recursos
 */
export const memoryOptimizer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Forzar garbage collection en desarrollo (solo si está disponible)
  if (process.env.NODE_ENV === "development" && global.gc) {
    // Ejecutar GC cada 100 requests
    if (Math.random() < 0.01) {
      global.gc();
    }
  }

  next();
};

/**
 * Middleware para rate limiting básico
 */
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export const basicRateLimit = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientIP = req.ip || req.connection.remoteAddress || "unknown";
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutos
  const maxRequests = 100; // máximo 100 requests por ventana

  const clientData = requestCounts.get(clientIP);

  if (!clientData || now > clientData.resetTime) {
    // Nueva ventana de tiempo
    requestCounts.set(clientIP, { count: 1, resetTime: now + windowMs });
  } else {
    // Incrementar contador
    clientData.count++;

    if (clientData.count > maxRequests) {
      res.status(429).json({
        error: "Too many requests",
        message: "Demasiadas solicitudes. Intenta de nuevo más tarde.",
      });
      return;
    }
  }

  next();
};
