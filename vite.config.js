import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": "./src/assets",
      "@components": "./src/components",
      "@layouts": "./src/layouts",
      "@pages": "./src/pages",
      "@routes": "./src/routes",
      "@store": "./src/store",
      "@styles": "./src/styles",
      "@shared": "./src/shared",
      "@utils": "./src/utils",
    },
  },
});
