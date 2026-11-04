import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // Nest injects by the types in a constructor, which only SWC (not esbuild, Vitest's
  // default) records when it compiles a test.
  plugins: [swc.vite({ module: { type: "es6" } })],
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts", "src/**/*.test.ts"],
    coverage: { include: ["src/**/*.ts"], exclude: ["src/main.ts"] },
  },
});
