import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import usersRouters from "./routes/users.routes";
import loginRouters from "./routes/login.routes";
import reservations from "./routes/reservations.routes";
import payments from "./routes/payments.routes";
import exportData from "./routes/exportData.routes";
import socio from "./routes/socio.routes";
import emails from "./routes/emails.routes";

import errorHandler from "./middlewares/handleError";
import { apiCacheControl, clearCache } from "./middlewares/cacheControl";
import {
  performanceOptimizer,
  memoryOptimizer,
  basicRateLimit,
} from "./middlewares/performance";
import { cacheManager, scheduleAutoCleanup } from "./utils/cacheManager";

const app = express();

app.use(helmet());

// Middlewares de optimización y rendimiento
app.use(performanceOptimizer);
// app.use(responseTimeMonitor);
app.use(memoryOptimizer);
app.use(basicRateLimit);

const corsOptions = {
  origin: [
    "http://localhost:5173",
    // "http://192.168.0.233:5173",
    "https://mangatabeachclub.com",
    "https://integrations.api.bold.co",
  ],
  credentials: true,
};

const PORT = process.env.PORT || 8080;

app.get("/", (_request, response) => {
  response.json({ message: "Server" });
});

// Ruta para limpiar caché del servidor
app.get("/clear-cache", clearCache, (_request, response) => {
  const stats = cacheManager.clearAllCache();
  response.json({
    message: "Caché del servidor limpiada",
    timestamp: new Date().toISOString(),
    status: "success",
    stats: {
      itemsCleared: stats.itemsCleared,
      memoryFreed:
        Math.round(
          (stats.memoryBefore.heapUsed - stats.memoryAfter.heapUsed) /
            1024 /
            1024
        ) + " MB",
    },
  });
});

// Ruta para obtener estadísticas de caché
app.get("/cache-stats", (_request, response) => {
  const stats = cacheManager.getCacheStats();
  response.json({
    message: "Estadísticas de caché del servidor",
    timestamp: new Date().toISOString(),
    stats,
  });
});

// Ruta para optimizar memoria
app.get("/optimize-memory", (_request, response) => {
  const result = cacheManager.optimizeMemory();
  response.json({
    message: "Optimización de memoria completada",
    timestamp: new Date().toISOString(),
    memoryFreed: result.memoryFreed + " MB",
  });
});

// Ruta para verificar el estado del servidor
app.get("/health", (_request, response) => {
  const memoryUsage = process.memoryUsage();
  response.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: {
      rss: Math.round(memoryUsage.rss / 1024 / 1024) + " MB",
      heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024) + " MB",
      heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024) + " MB",
    },
  });
});

app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));

// Aplicar control de caché específico para APIs
app.use(apiCacheControl);

app.use("/auth", loginRouters);
app.use("/api", usersRouters);
app.use("/api", reservations);
app.use("/api", exportData);
app.use("/api", socio);
app.use("/api", emails);
app.use(payments);
app.use(errorHandler);

app.use((req, res, next) => {
  // res.setHeader(
  //   "Content-Security-Policy",
  //   "default-src 'self'; " +
  //     "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com; " +
  //     "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
  //     "connect-src 'self' https://mangatabeachclub.com; " +
  //     "frame-src 'self' https://www.youtube.com; " +
  //     "object-src 'none'; " +
  //     "base-uri 'self'; " +
  //     "form-action 'self';"
  // );

  // HSTS
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  // X-Content-Type-Options
  res.setHeader("X-Content-Type-Options", "nosniff");

  next();
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);

  // Inicializar limpieza automática de caché cada 30 minutos
  scheduleAutoCleanup(30);

  console.log("🚀 Servidor optimizado con control de caché activado");
  console.log("📊 Rutas disponibles para gestión de caché:");
  console.log("   - GET /clear-cache - Limpiar caché del servidor");
  console.log("   - GET /cache-stats - Ver estadísticas de caché");
  console.log("   - GET /optimize-memory - Optimizar memoria");
  console.log("   - GET /health - Estado del servidor");
});
