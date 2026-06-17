/** @type {import('next').NextConfig} */
const serverCompilerPackages = ["esbuild", "ts-json-schema-generator"];

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push(...serverCompilerPackages);
    }

    return config;
  },
};

const withBundleAnalyzer = (await import("@next/bundle-analyzer")).default({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
