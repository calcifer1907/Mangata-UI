import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./i18n";
import App from "./App";

import { SnackbarProvider } from "notistack";
// import Theme from "./Theme";

// import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./index.css";

// Configuración optimizada del Emotion cache para React 19
// El key 'mui' es recomendado por MUI para mejor compatibilidad
// prepend: true asegura que los estilos de MUI tengan prioridad
const emotionCache = createCache({
  key: "mui",
  prepend: true, // 是否插入到 <head> 开头
  stylisPlugins: [], // Stylis 插件
  speedy: false, // 在生产环境中是否使用 speedy 模式
  nonce: "your-nonce-here", // CSP nonce
});

const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

const root = createRoot(container);

// Orden correcto de providers para React 19:
// 1. CacheProvider (Emotion) - debe estar en el nivel más externo
// 2. ThemeProvider (MUI) - requiere CacheProvider
// 3. SnackbarProvider (notistack) - puede estar dentro de ThemeProvider
// 4. CssBaseline - debe estar dentro de ThemeProvider
// 5. App - componente principal
root.render(
  <StrictMode>
    <CacheProvider value={emotionCache}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={5000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        // Configuración optimizada para React 19
        dense={false}
        preventDuplicate={true}
      >
        <App />
      </SnackbarProvider>
    </CacheProvider>
  </StrictMode>
);
