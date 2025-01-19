/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: false,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("esbuild");
    }

    return config;
  },
};

export default nextConfig;
