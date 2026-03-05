import { Request, Response, NextFunction } from "express";

// headers.config.js
export const securityHeaders = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Headers obligatorios
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  // CSP robusta
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; " +
      "style-src 'self' 'unsafe-inline' https:; " +
      "font-src 'self' https: data:; " +
      "img-src 'self' https: data:; " +
      "connect-src 'self' https:; " +
      "frame-ancestors 'none';",
  );

  // HSTS (solo si usas HTTPS)
  if (req.secure || req.headers["x-forwarded-proto"] === "https") {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload",
    );
  }

  next();
};
