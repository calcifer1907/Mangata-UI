/**
 * Gestor de caché para el servidor
 * Proporciona funciones para limpiar caché y optimizar el rendimiento
 */

interface CacheStats {
  clearedAt: Date;
  memoryBefore: NodeJS.MemoryUsage;
  memoryAfter: NodeJS.MemoryUsage;
  itemsCleared: number;
}

class CacheManager {
  private cacheStats: CacheStats[] = [];
  private cacheItems = new Map<string, any>();

  /**
   * Limpiar toda la caché del servidor
   */
  public clearAllCache(): CacheStats {
    const memoryBefore = process.memoryUsage();
    const itemsCount = this.cacheItems.size;

    // Limpiar caché en memoria
    this.cacheItems.clear();

    // Forzar garbage collection si está disponible
    if (global.gc) {
      global.gc();
    }

    const memoryAfter = process.memoryUsage();

    const stats: CacheStats = {
      clearedAt: new Date(),
      memoryBefore,
      memoryAfter,
      itemsCleared: itemsCount,
    };

    this.cacheStats.push(stats);

    // Mantener solo los últimos 10 registros
    if (this.cacheStats.length > 10) {
      this.cacheStats = this.cacheStats.slice(-10);
    }

    console.log(`🧹 Caché limpiada: ${itemsCount} elementos eliminados`);
    console.log(
      `📊 Memoria liberada: ${Math.round(
        (memoryBefore.heapUsed - memoryAfter.heapUsed) / 1024 / 1024
      )} MB`
    );

    return stats;
  }

  /**
   * Limpiar caché específica por clave
   */
  public clearCacheByKey(key: string): boolean {
    const existed = this.cacheItems.has(key);
    if (existed) {
      this.cacheItems.delete(key);
      console.log(`🗑️  Caché eliminada para clave: ${key}`);
    }
    return existed;
  }

  /**
   * Limpiar caché por patrón de clave
   */
  public clearCacheByPattern(pattern: string): number {
    let clearedCount = 0;
    const regex = new RegExp(pattern);

    for (const key of this.cacheItems.keys()) {
      if (regex.test(key)) {
        this.cacheItems.delete(key);
        clearedCount++;
      }
    }

    if (clearedCount > 0) {
      console.log(
        `🗑️  Caché eliminada por patrón "${pattern}": ${clearedCount} elementos`
      );
    }

    return clearedCount;
  }

  /**
   * Obtener estadísticas de la caché
   */
  public getCacheStats() {
    const currentMemory = process.memoryUsage();
    const lastClear = this.cacheStats[this.cacheStats.length - 1];

    return {
      currentItems: this.cacheItems.size,
      totalClears: this.cacheStats.length,
      lastClear: lastClear
        ? {
            timestamp: lastClear.clearedAt,
            itemsCleared: lastClear.itemsCleared,
            memoryFreed: Math.round(
              (lastClear.memoryBefore.heapUsed -
                lastClear.memoryAfter.heapUsed) /
                1024 /
                1024
            ),
          }
        : null,
      currentMemory: {
        rss: Math.round(currentMemory.rss / 1024 / 1024),
        heapUsed: Math.round(currentMemory.heapUsed / 1024 / 1024),
        heapTotal: Math.round(currentMemory.heapTotal / 1024 / 1024),
      },
    };
  }

  /**
   * Programar limpieza automática de caché
   */
  public scheduleAutoCleanup(intervalMinutes: number = 30) {
    setInterval(() => {
      console.log(`⏰ Limpieza automática de caché programada...`);
      this.clearAllCache();
    }, intervalMinutes * 60 * 1000);

    console.log(
      `🔄 Limpieza automática de caché programada cada ${intervalMinutes} minutos`
    );
  }

  /**
   * Optimizar memoria del servidor
   */
  public optimizeMemory() {
    const beforeMemory = process.memoryUsage();

    // Limpiar caché
    this.clearAllCache();

    // Forzar garbage collection múltiples veces
    if (global.gc) {
      for (let i = 0; i < 3; i++) {
        global.gc();
      }
    }

    const afterMemory = process.memoryUsage();
    const memoryFreed = Math.round(
      (beforeMemory.heapUsed - afterMemory.heapUsed) / 1024 / 1024
    );

    console.log(
      `🚀 Optimización de memoria completada. Memoria liberada: ${memoryFreed} MB`
    );

    return {
      memoryFreed,
      beforeMemory,
      afterMemory,
    };
  }
}

// Instancia singleton del gestor de caché
export const cacheManager = new CacheManager();

// Exportar funciones de utilidad
export const clearServerCache = () => cacheManager.clearAllCache();
export const getCacheStats = () => cacheManager.getCacheStats();
export const optimizeServerMemory = () => cacheManager.optimizeMemory();
export const scheduleAutoCleanup = (intervalMinutes?: number) =>
  cacheManager.scheduleAutoCleanup(intervalMinutes);
