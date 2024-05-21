const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@htmldocs/react"],
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(jsx|tsx)$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: isServer ? [
            '@htmldocs/babel-plugin-webpack',
          ] : [],
        },
      },
    });
    
    return config;
  },
};