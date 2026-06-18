/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "@htmldocs/eslint-config/library.js",
    "plugin:@next/next/recommended-legacy",
  ],
  env: {
    browser: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  settings: {
    next: {
      rootDir: __dirname,
    },
  },
};
