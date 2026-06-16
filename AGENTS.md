# Repository Guidelines

## Project Structure & Module Organization

This is a pnpm/Turborepo monorepo. Main source lives in `packages/`:

- `packages/htmldocs`: Next.js preview app plus CLI source under `src/cli` and app UI under `src/app`.
- `packages/render`: document rendering package and shared CSS under `src/`.
- `packages/react`: React document components in `components/`.
- `packages/e2e-tests`: Playwright end-to-end tests in `tests/`.
- `packages/eslint-config` and `packages/typescript-config`: shared lint and TS presets.

Apps live in `apps/`:

- `apps/app`: hosted product app, built with Next.js, React 19, Supabase, Stripe, and server-side PDF/rendering integrations.
- `apps/docs`: documentation content and static assets, including MDX pages, Mintlify config, images, logos, and OpenAPI reference files.
- `apps/examples`: local example project consumed by the htmldocs CLI; documents live in `apps/examples/documents`.

The root workspace also includes `packages/htmldocs/public/template`, which is part of the pnpm workspace and is copied into generated starter projects.

## Architecture & Compilation Pipeline

Turbo coordinates package tasks from the root. Build dependencies are compiled first through `dependsOn: ["^build"]`, and outputs are cached from `.next/**` and `dist/**`.

The `htmldocs` package has two build stages:

1. `node build-preview-server.mjs` runs `next build` for the local preview app, then moves `.next` into `dist/preview/.next`.
2. `pnpm build-cli` runs `tsup-node` on `src/cli/index.ts`, emits an executable ESM CLI into `dist/cli`, includes declarations, and injects `process.env.API_URL`.

`packages/render` compiles Sass from `src/css/index.scss`, bundles render code with its build script, runs `tsc`, and copies `paged.polyfill.js` into `dist`. `packages/react` uses `tsup` to emit ESM, CJS, and type declarations. The examples app runs through `htmldocs dev`, which starts the CLI preview workflow against `apps/examples/documents`.

## Build, Test, and Development Commands

Use pnpm from the repository root.

- `pnpm dev`: starts Turbo development tasks.
- `pnpm build`: builds workspace packages, excluding the starter template.
- `pnpm lint`: runs package lint tasks.
- `pnpm test`: runs Turbo test tasks.
- `pnpm --filter htmldocs dev`: starts the local htmldocs preview app.
- `pnpm --filter htmldocs build`: builds the preview server and CLI package.
- `pnpm --filter @htmldocs/render build`: compiles rendering CSS, JS, and types.
- `pnpm --filter @htmldocs/react build`: builds React component package outputs.
- `pnpm --filter @htmldocs/app dev`: starts the hosted product app locally.
- `pnpm --filter @htmldocs/app generate`: regenerates Supabase database types for the app.
- `pnpm --filter @htmldocs/examples dev`: runs the example documents with the CLI preview server.
- `pnpm --filter e2e-tests test`: runs Playwright e2e tests.
- `pnpm --filter e2e-tests install:browsers`: installs Chromium for Playwright.

## Coding Style & Naming Conventions

Code is TypeScript/React-first. Use `.ts` for utilities and CLI code, `.tsx` for React components, and keep component filenames in PascalCase when exporting a component, such as `Document.tsx` or `MarginBox.tsx`. Shared configs extend Prettier and ESLint; run `pnpm lint` before submitting changes. The root formatter is `pnpm format`, which formats `ts`, `tsx`, and `md` files. Prefer existing package boundaries: rendering internals belong in `packages/render`, reusable document components in `packages/react`, CLI and preview behavior in `packages/htmldocs`, and product surfaces in `apps/app`.

## Testing Guidelines

End-to-end coverage uses Playwright in `packages/e2e-tests/tests`. Name new browser tests with the `*.spec.ts` pattern and keep helpers or fixtures near existing files such as `fixtures.ts` and `helpers/`. Playwright defaults to `TEST_BASE_URL` or `http://localhost:3000`, runs Chromium, and records trace/video on first retry. For package-level logic, prefer colocated focused tests if a package already has a test setup; otherwise document manual verification in the PR.

## Commit & Pull Request Guidelines

Recent history uses short, imperative commit subjects such as `Fix htmldocs local preview startup` or concise lower-case updates like `update docs`. Keep subjects focused on the user-visible change. PRs should include a short summary, validation commands run, linked issues when applicable, and screenshots or recordings for UI/preview changes. Mention any skipped tests and why.

## Agent-Specific Instructions

Do not overwrite this file without explicit permission. After mobile, iOS, or Android changes, validate the affected flow in a simulator with Computer Use when available; if that is not possible, report the validation gap clearly.
