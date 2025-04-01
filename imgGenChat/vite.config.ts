import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import * as path from "path";

const resolve = (src: string) => path.resolve(__dirname, src);

export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths()],
  resolve: {
    alias: [
      { find: "@assets", replacement: resolve("src/assets") },
      { find: "@interface", replacement: resolve("src/interface") },
    ],
  },

  server: {
    proxy: {
      "/genImage": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },
    },
  },
});
