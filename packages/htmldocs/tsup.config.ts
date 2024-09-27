import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/cli/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  outDir: "dist/cli",
  banner: {
    js: "#!/usr/bin/env node",
  },
});

