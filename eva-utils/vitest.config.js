import { defineConfig } from "vitest/config";
export default defineConfig({
    test: {
        coverage: {
            provider: "v8",
            reporter: ["text", "lcov", "html"],
            lines: 80,
            functions: 80,
            statements: 80,
            branches: 70
        },
        globals: true,
        environment: "node",
        include: ["src/**/*.test.ts"]
    }
});
//# sourceMappingURL=vitest.config.js.map