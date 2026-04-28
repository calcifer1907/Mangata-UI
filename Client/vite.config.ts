import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import compression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic", // Compatible con React 19
      babel: {
        plugins: [],
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: "src/locales/*",
          dest: "locales",
        },
      ],
    }),

    compression({
      algorithm: "gzip",
      ext: ".gz",
    }),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        maximumFileSizeToCacheInBytes: 3000000,
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
    }),
  ],
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor-react";
            }
            if (id.includes("lodash")) {
              return "vendor-lodash";
            }
            return "vendor";
          }
          if (id.includes("/utils/")) {
            return "utils";
          }
        },
      },
    },
  },
});
