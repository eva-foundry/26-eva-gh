import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      lines: 80,
      functions: 80,
      statements: 80,
      branches: 70,
      exclude: [
        "src/index.ts", // re-export barrel
        "src/**/*.d.ts", // type declarations (not executed)
      ],
    },
    environment: "node",
    include: ["src/__tests__/**/*.test.ts"],
    globals: true,
  },
});
