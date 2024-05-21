import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  external: ["uglify-js", "@swc/core", "esbuild", "./processChild", "./minify", "watchpack"],
});

