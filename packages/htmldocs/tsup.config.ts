import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/cli/index.ts"],
  format: ["cjs"],
  dts: true,
  clean: false,
  outDir: "cli",
});

