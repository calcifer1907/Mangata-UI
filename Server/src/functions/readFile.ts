import { readFileSync } from "fs";
import fs from "fs/promises";
import path from "path";

type MetodoLectura = () => Promise<string>;

export async function leerArchivoSimple(
  archivo: string,
  intento: number = 0,
): Promise<string> {
  // En Vercel, buscar en la carpeta 'html'
  const rutasParaVercel = [
    // Ruta directa en carpeta html
    path.join(process.cwd(), "html", archivo),
    // Ruta relativa a la raíz
    path.join(process.cwd(), archivo),
    // Ruta con html al mismo nivel
    path.join(process.cwd(), "..", "html", archivo),
    // Ruta original por si acaso
    archivo,
  ];

  // Usar la primera ruta como principal para los primeros métodos
  const rutaCompleta = rutasParaVercel[0];

  const metodos: MetodoLectura[] = [
    // Método 1: fs.promises con ruta a carpeta html
    async () => await fs.readFile(rutaCompleta, "utf-8"),

    // Método 2: Callback tradicional con ruta a carpeta html
    async () => {
      return new Promise((resolve, reject) => {
        require("fs").readFile(
          rutaCompleta,
          "utf-8",
          (err: Error | null, data: string) => {
            err ? reject(err) : resolve(data);
          },
        );
      });
    },

    // Método 3: readFileSync con ruta a carpeta html
    async () => readFileSync(rutaCompleta, "utf-8"),

    // Método 4: Buscar en todas las posibles rutas de la carpeta html
    async () => {
      const errores: string[] = [];

      for (const ruta of rutasParaVercel) {
        try {
          //   console.log(`Intentando leer desde: ${ruta}`);
          return await fs.readFile(ruta, "utf-8");
        } catch (error) {
          errores.push(
            `${ruta}: ${error instanceof Error ? error.message : "error desconocido"}`,
          );
          continue;
        }
      }

      throw new Error(
        `No se encontró el archivo en ninguna ruta de la carpeta html. Intentos: ${errores.join("; ")}`,
      );
    },

    // Método 5: Listar contenido de la carpeta html para debug
    async () => {
      try {
        const htmlPath = path.join(process.cwd(), "html");
        const files = await fs.readdir(htmlPath);
        // console.log(`Archivos en carpeta html: ${files.join(", ")}`);

        // Buscar el archivo por nombre (ignorando la ruta)
        const nombreArchivo = path.basename(archivo);
        const archivoEncontrado = files.find((f) => f === nombreArchivo);

        if (archivoEncontrado) {
          return await fs.readFile(
            path.join(htmlPath, archivoEncontrado),
            "utf-8",
          );
        }

        throw new Error(
          `Archivo ${nombreArchivo} no encontrado en carpeta html. Archivos disponibles: ${files.join(", ")}`,
        );
      } catch (error) {
        throw new Error(
          `Error al listar carpeta html: ${error instanceof Error ? error.message : "error desconocido"}`,
        );
      }
    },
  ];

  if (intento >= metodos.length) {
    throw new Error(
      `No se pudo leer: ${archivo} desde la carpeta html después de ${metodos.length} intentos`,
    );
  }

  try {
    const metodoActual: MetodoLectura = metodos[intento];
    //     console.log(
    //       `Intentando método ${intento + 1} para leer: ${archivo} desde carpeta html`,
    //     );
    return await metodoActual();
  } catch (error) {
    //     if (error instanceof Error) {
    //       console.log(
    //         `⚠️ Método ${intento + 1} falló: ${error.message}, probando siguiente...`,
    //       );
    //     } else {
    //       console.log(
    //         `⚠️ Método ${intento + 1} falló con error desconocido, probando siguiente...`,
    //       );
    //     }
    return leerArchivoSimple(archivo, intento + 1);
  }
}

// Función específica para leer desde carpeta html
export async function leerDesdeCarpetaHtml(archivo: string): Promise<string> {
  const rutasHtml = [
    path.join(process.cwd(), "html", archivo),
    path.join(process.cwd(), "src", "html", archivo),
    path.join(process.cwd(), "..", "html", archivo),
    path.join(__dirname, "html", archivo),
    path.join(__dirname, "..", "html", archivo),
  ];

  // Información de depuración
  //   console.log("=== DEBUG LECTURA DESDE CARPETA HTML ===");
  //   console.log("process.cwd():", process.cwd());
  //   console.log("__dirname:", __dirname);
  //   console.log("Archivo buscado:", archivo);
  //   console.log("Rutas a intentar:", rutasHtml);

  for (const ruta of rutasHtml) {
    try {
      //       console.log(`Intentando leer: ${ruta}`);
      const contenido = await fs.readFile(ruta, "utf-8");
      console.log(`✅ Éxito leyendo desde: ${ruta}`);
      return contenido;
    } catch {
      //       console.log(
      //         `❌ Falló ruta ${ruta}:`,
      //         error instanceof Error ? error.message : "error desconocido",
      //       );
    }
  }

  // Si no encuentra el archivo, listar el contenido de posibles carpetas html
  try {
    const possibleHtmlPaths = [
      path.join(process.cwd(), "html"),
      path.join(process.cwd(), "src", "html"),
      path.join(__dirname, "html"),
    ];

    for (const htmlPath of possibleHtmlPaths) {
      try {
        const files = await fs.readdir(htmlPath);
        console.log(`Contenido de ${htmlPath}:`, files);
      } catch {
        console.log(`La carpeta ${htmlPath} no existe`);
      }
    }
  } catch (error) {
    console.log("Error al listar carpetas:", error);
  }

  throw new Error(
    `No se pudo leer el archivo ${archivo} desde ninguna ruta de la carpeta html`,
  );
}

// Función wrapper que prioriza la carpeta html
export async function leerArchivoHtml(
  archivo: string,
  usarVercel: boolean = !!process.env.VERCEL,
): Promise<string> {
  try {
    // Intentar primero con la función específica para carpeta html
    return await leerDesdeCarpetaHtml(archivo);
  } catch (error) {
    console.log(
      "Falló lectura desde carpeta html, intentando métodos alternativos:",
      error,
    );

    // Si estamos en Vercel y falla, intentar con la función original
    if (usarVercel) {
      return await leerArchivoSimple(archivo);
    }

    throw error;
  }
}
