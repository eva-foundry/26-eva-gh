import path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@config": path.resolve(__dirname, "src/config"),
            "@lib": path.resolve(__dirname, "src/lib"),
            "@components": path.resolve(__dirname, "src/components"),
            "@types": path.resolve(__dirname, "src/types"),
            "@styles": path.resolve(__dirname, "src/styles")
        }
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/test/setupTests.ts",
        coverage: {
            provider: "v8",
            include: ["src/components/chat/**/*"],
            exclude: ["**/*test.*", "src/test/**", "src/components/chat/Sidebar.tsx"],
            reporters: ["text"]
        }
    }
});
