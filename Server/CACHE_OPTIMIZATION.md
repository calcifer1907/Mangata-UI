# Optimización de Caché del Servidor

Este documento describe las optimizaciones implementadas para eliminar la caché del servidor y mejorar el rendimiento.

## 🚀 Funcionalidades Implementadas

### 1. Middlewares de Control de Caché

#### `cacheControl.ts`

- **`noCache`**: Elimina completamente la caché del navegador
- **`apiCacheControl`**: Control específico para rutas de API (sin caché) vs recursos estáticos
- **`clearCache`**: Limpieza agresiva de caché con headers adicionales
- **`conditionalCache`**: Caché condicional basado en el método HTTP

### 2. Middlewares de Optimización de Rendimiento

#### `performance.ts`

- **`performanceOptimizer`**: Límites de tamaño, headers de seguridad y optimización de conexiones
- **`responseTimeMonitor`**: Monitoreo de tiempo de respuesta con alertas para respuestas lentas
- **`memoryOptimizer`**: Optimización de memoria con garbage collection automático
- **`basicRateLimit`**: Rate limiting básico para prevenir abuso

### 3. Gestor de Caché Avanzado

#### `cacheManager.ts`

- Limpieza automática de caché en memoria
- Estadísticas detalladas de uso de memoria
- Limpieza programada cada 30 minutos
- Optimización de memoria con múltiples garbage collections

## 📊 Rutas Disponibles

### Gestión de Caché

- `GET /clear-cache` - Limpiar caché del servidor
- `GET /cache-stats` - Ver estadísticas de caché
- `GET /optimize-memory` - Optimizar memoria del servidor
- `GET /health` - Estado del servidor y uso de memoria

## 🔧 Scripts de Ejecución

### Scripts Optimizados

```bash
# Desarrollo con optimizaciones
npm run dev:optimized

# Producción con optimizaciones
npm run start:optimized

# Desarrollo normal
npm run dev

# Producción normal
npm run start
```

### Flags de Node.js Utilizados

- `--expose-gc`: Habilita garbage collection manual
- `--max-old-space-size=4096`: Aumenta el límite de memoria heap a 4GB

## 📈 Beneficios de Rendimiento

### 1. Eliminación de Caché

- Headers HTTP que previenen el almacenamiento en caché del navegador
- Limpieza automática de caché en memoria del servidor
- Control granular por tipo de ruta

### 2. Optimización de Memoria

- Garbage collection automático
- Monitoreo de uso de memoria
- Limpieza programada cada 30 minutos
- Límites de tamaño de payload

### 3. Monitoreo y Alertas

- Logs de respuestas lentas (> 1 segundo)
- Alertas críticas para respuestas muy lentas (> 5 segundos)
- Estadísticas detalladas de rendimiento

## 🛠️ Uso Práctico

### Limpiar Caché Manualmente

```bash
curl https://tu-servidor.com/clear-cache
```

### Ver Estadísticas

```bash
curl https://tu-servidor.com/cache-stats
```

### Optimizar Memoria

```bash
curl https://tu-servidor.com/optimize-memory
```

### Verificar Estado del Servidor

```bash
curl https://tu-servidor.com/health
```

## 🔍 Monitoreo

### Logs del Servidor

El servidor ahora genera logs informativos:

- `🧹 Caché limpiada: X elementos eliminados`
- `📊 Memoria liberada: X MB`
- `⚠️ Respuesta lenta: [método] [ruta] - [tiempo]ms`
- `🚨 Respuesta muy lenta: [método] [ruta] - [tiempo]ms`
- `⏰ Limpieza automática de caché programada...`

### Métricas de Memoria

- RSS (Resident Set Size)
- Heap Used (Memoria heap utilizada)
- Heap Total (Memoria heap total)
- Memoria liberada por limpieza

## ⚙️ Configuración

### Variables de Entorno

```bash
NODE_ENV=development  # Habilita garbage collection más agresivo
PORT=8080            # Puerto del servidor
```

### Personalización

- Modificar el intervalo de limpieza automática en `scheduleAutoCleanup(30)`
- Ajustar límites de rate limiting en `basicRateLimit`
- Cambiar límites de tamaño de payload en `performanceOptimizer`

## 🚨 Consideraciones

1. **Garbage Collection**: Solo funciona con `--expose-gc` flag
2. **Rate Limiting**: Implementación básica en memoria, considerar Redis para producción
3. **Monitoreo**: Los logs pueden ser verbosos en desarrollo
4. **Memoria**: El límite de 4GB puede no ser suficiente para aplicaciones muy grandes

## 📝 Próximas Mejoras

- [ ] Implementar Redis para rate limiting distribuido
- [ ] Agregar métricas con Prometheus/Grafana
- [ ] Configuración dinámica via API
- [ ] Limpieza de caché por patrones de URL
- [ ] Compresión de respuestas con gzip
