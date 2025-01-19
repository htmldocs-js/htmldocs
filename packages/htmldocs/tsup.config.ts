import { defineConfig } from "tsup";
import fs from 'fs';
import path from 'path';

const nodeModulesPath = path.join(__dirname, 'public', 'template', 'node_modules');

if (fs.existsSync(nodeModulesPath)) {
  fs.rmSync(nodeModulesPath, { recursive: true, force: true });
}

export default defineConfig({
  entry: ["./src/cli/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  outDir: "dist/cli",
  banner: {
    js: "#!/usr/bin/env node",
  },
  publicDir: true,
  define: {
    "process.env.API_URL": process.env.API_URL || "https://htmldocs.com",
  },
});

