import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const serverCompilerPackages = ["esbuild", "ts-json-schema-generator"];
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

const nextConfig = {
  outputFileTracingRoot: repoRoot,
  serverExternalPackages: serverCompilerPackages,
};

const withBundleAnalyzer = (await import("@next/bundle-analyzer")).default({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
