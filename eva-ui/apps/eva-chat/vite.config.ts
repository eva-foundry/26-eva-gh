import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
    plugins: [react()],
    test: {
      environment: "jsdom",
      setupFiles: "./src/test/setupTests.ts",
  },
    resolve: {
        alias: {
            "@config": path.resolve(__dirname, "./src/config"),
            "@lib": path.resolve(__dirname, "./src/lib"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@types": path.resolve(__dirname, "./src/types"),
            "@styles": path.resolve(__dirname, "./src/styles")
        }
    },
    server: {
        port: 5175
    }
});
