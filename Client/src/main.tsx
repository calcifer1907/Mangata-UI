import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { SnackbarProvider } from "notistack";
import Theme from "./Theme.ts";

import { ThemeProvider, CssBaseline } from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={Theme}>
      <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
        <CssBaseline />
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </StrictMode>
);
