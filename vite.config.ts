import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => ({
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      include: ["src"],
    }),
  ],
  build: {
    lib: {
      entry: resolve("src", "index.ts"),
      name: "react-component-library",
      formats: ["es", "cjs"],
      fileName: (format) =>
        `react-component-library.${
          format === "cjs" ? "cjs" : "es.js"
        }`,
    },
    rollupOptions: {
      output: {
        preserveModules: true,
      }
    },
    optimizeDeps: {
      exclude: ["react", "react-dom"]
    },
    esbuild: {
      minify: true,
    },
  },
}));
