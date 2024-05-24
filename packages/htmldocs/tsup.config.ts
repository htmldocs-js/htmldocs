import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/cli/index.ts"],
  format: ["cjs"],
  dts: true,
  clean: true,
  external: ["@htmldocs/render"],
  outDir: "cli",
});

