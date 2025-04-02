import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./i18n.ts";
import App from "./App.tsx";

import { SnackbarProvider } from "notistack";
import Theme from "./Theme.ts";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./index.css";

const cache = createCache({
  key: "css",
  prepend: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CacheProvider value={cache}>
      <ThemeProvider theme={Theme}>
        <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
          <CssBaseline />
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  </StrictMode>
);
