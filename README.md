<h1 align="center">
<img src="https://github.com/user-attachments/assets/655fa7f9-98e7-42ee-8cd0-bb9193f100e9" alt="htmldocs" width="100%" />
</h1>

<div align="center">
<p align="center">
<a href="https://docs.htmldocs.com">
  <img alt="Documentation" src="https://img.shields.io/website?down_message=offline&label=docs&up_color=007aff&up_message=online&url=https%3A%2F%2Fdocs.htmldocs.com"
></a> <a href="https://htmldocs.com"><img src="https://img.shields.io/website?label=htmldocs.com&up_message=online&url=https%3A%2F%2Fhtmldocs.com" alt="Website"></a> <a href="https://www.npmjs.com/package/htmldocs"><img src="https://img.shields.io/npm/v/htmldocs?style=flat" alt="NPM version"></a> <a href="https://github.com/htmldocs-js/htmldocs/blob/main/LICENSE"><img src="https://img.shields.io/github/license/htmldocs-js/htmldocs" alt="License"></a> <a href="https://join.slack.com/t/htmldocs/shared_invite/zt-29hw1bnmu-ShX6Jo1KNc_XeF~gFQJH_Q"><img src="https://img.shields.io/badge/chat-on%20slack-4a154b?logo=slack" alt="Slack"></a> </p>
</div>

PDF document creation is stuck in the past, from clunky Word docs to complex LaTeX to outdated tools. htmldocs brings document generation into 2025 with a modern developer experience using the tools you already love: **React**, **TypeScript**, and **Tailwind**.

## What is htmldocs?

htmldocs is a local document editor and preview server to help you _create_ PDFs with React. It provides all the structural benefits of LaTeX with the familiarity of HTML and CSS. With htmldocs, you can use JSX to build document templates (invoices, reports, contracts, etc.) and generate PDFs just by passing data as props. htmldocs has:

- 📌 Support for the latest CSS features like margin boxes and flexbox
- 🧩 A collection of unstyled components to help you layout your documents
- 📄 JSX templating system for building dynamic documents
- 🔗 Full TypeScript support for type safety
- ⚡ Dynamic data integration through props and APIs
- 📊 Real-time preview server with hot reloading
- 🚀 **Zero-build development** - modify templates and see changes instantly
- 🏗️ **Monorepo architecture** with pnpm workspaces and Turbo
- 🔄 **Workspace dependencies** - automatic linking between packages

## Example

To see the full power of htmldocs, here is how you might build a dynamic invoice document template with JSX template variables:

<img src="https://github.com/user-attachments/assets/40e4ec91-e5eb-483a-ba28-14c6fd57ad8b" alt="Invoice template with htmldocs" width="100%" />

To change the customer details, all you need to do is render the `Invoice` component with different props:

```tsx
<Invoice 
  customer={{
    name: "John Doe",
    address: "456 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    phone: "123-456-7890",
  }}
  items={items}
/>
```

## Screenshots

![Resume example](https://github.com/user-attachments/assets/24eabc4a-ec9e-43de-a2a0-00bcde55985a)

![Variables editor](https://github.com/user-attachments/assets/d16658ea-4d53-4dc2-8c74-696012c4ce9b)

## Install

To create your first htmldocs project, run the following command:

```sh
npx htmldocs@latest init
```

For further instructions or to integrate htmldocs into your existing project, refer to the [Getting Started](https://docs.htmldocs.com/getting-started) guide.

## Development Workflow

htmldocs supports a **zero-build development experience** for rapid template iteration. You can modify template files and see changes instantly without any build step.

### One-Click Development

For the fastest setup, use our development script:

```bash
# Start zero-build development (from project root)
./dev.sh

# Or using npm/pnpm script
pnpm dev:zero-build
```

This script will:
- ✅ Install tsx if needed
- ✅ Build core dependencies (one-time)
- ✅ Start development server with hot reload
- ✅ Open examples at http://localhost:3000

### Manual Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Build core dependencies (one-time only)
cd packages/react && pnpm build
cd ../render && pnpm build

# 3. Install TypeScript runner
npm install -g tsx

# 4. Start zero-build development
cd packages/htmldocs
tsx src/cli/index.ts dev --dir ../../apps/examples/documents
```

### What You Can Edit Without Building

- ✅ **Template files** (`*.tsx` documents) - hot reload enabled
- ✅ **Next.js app** (`packages/htmldocs/src/app/*`) - hot reload enabled  
- ✅ **CLI logic** (`packages/htmldocs/src/cli/*`) - restart to see changes
- ✅ **Styles** (CSS, Tailwind) - hot reload enabled

### What Requires Building

- ⚠️ **React components** (`packages/react/`) - run `pnpm build` after changes
- ⚠️ **Render engine** (`packages/render/`) - run `pnpm build` after changes

### Development Commands

```bash
# Start development with hot reload
tsx src/cli/index.ts dev --dir ../../apps/examples/documents

# Build core packages when needed
pnpm build

# Run tests
pnpm test

# Format code
pnpm format
```

This workflow enables you to modify templates and see changes instantly in your browser, providing a smooth development experience similar to modern web frameworks.

## Components

htmldocs comes with a standard set of components to help you layout and style your documents.

- [Document](https://docs.htmldocs.com/components/document)
- [Head](https://docs.htmldocs.com/components/head)
- [Page](https://docs.htmldocs.com/components/page)
- [Footer](https://docs.htmldocs.com/components/footer)
- [MarginBox](https://docs.htmldocs.com/components/margin-box)
- [Spacer](https://docs.htmldocs.com/components/spacer)

## How it works

htmldocs is built upon Chromium's rendering engine, which means it can render any HTML, CSS, and JavaScript. This is different from other tools like [wkhtmltopdf](https://wkhtmltopdf.org/), [WeasyPrint](https://weasyprint.org/), and [Prince](https://www.princexml.com/), which only support a subset of HTML and CSS.

htmldocs also uses the [Paged.js library](https://pagedjs.org/) under the hood. Paged.js is used for layout and chunking, as well as more modern features like margin boxes that aren't fully supported by the W3C's CSS standard.

## Comparison

| Feature | Traditional Documents<br/>(Word, Google Docs) | LaTeX Documents<br/>(Overleaf, TeXStudio) | Freeform Documents<br/>(Figma, Sketch) | Web Documents<br/>(htmldocs) |
|---------|:-------------------------------------------:|:----------------------------------------:|:-------------------------------------:|:---------------------------:|
| Content Structure | Semi-Structured | Structured | Freeform | Structured |
| Learning Curve | ✅ Simple | ❌ Complex | ✅ Simple | ✅ Simple |
| Template Variables | ❌ Limited | ❌ Limited | ❌ Limited | ✅ Supported |
| Styling | ✅ Basic | ❌ Complex | ✅ Advanced | ✅ Advanced |
| Version Control | ❌ Limited | ✅ Supported | ❌ Limited | ✅ Supported |
| External Libraries | ❌ Limited | ✅ Supported | ❌ Limited | ✅ Supported |
| Automation / API | ❌ Limited | ❌ Limited | ❌ Limited | ✅ Supported |
| Live Preview | ✅ Supported | ❌ Limited | ✅ Supported | ✅ Supported |
| CI/CD Integration | ❌ Limited | ⚠️ Partial | ❌ Limited | ✅ Supported |
| Type Safety | ❌ Limited | ❌ Limited | ❌ Limited | ✅ Supported |
| AI | ❌ Limited | ❌ Limited | ❌ Limited | ✅ Supported |

## Tech Stack

| <img src="https://github.com/user-attachments/assets/df03494d-44a1-4a74-9ae6-1ee9870c2ce2" width="48px" height="48px" alt="Next.js"> | <img src="https://www.typescriptlang.org/favicon-32x32.png" width="48px" height="48px" alt="TypeScript"> | <img src="https://user-images.githubusercontent.com/4060187/196936123-f6e1db90-784d-4174-b774-92502b718836.png" width="48px" height="48px" alt="Turborepo"> | <img src="https://pnpm.io/img/favicon.png" width="48px" height="48px" alt="pnpm"> |
|--------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| Next.js                                                                                                  | TypeScript                                                                                            | Turborepo                                                                                         | pnpm                                                                             |

## Monorepo Architecture

This project uses a monorepo structure with pnpm workspaces and Turbo for efficient development:

```
├── packages/
│   ├── htmldocs/          # Main CLI and Next.js app
│   ├── react/             # React components (@htmldocs/react)
│   ├── render/            # PDF rendering engine (@htmldocs/render)
│   ├── eslint-config/     # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
├── apps/
│   ├── examples/          # Example templates and documents
│   └── docs/              # Documentation site
```

### Package Dependencies

- `htmldocs` → depends on `@htmldocs/render`
- `examples` → depends on `htmldocs`, `@htmldocs/react`, `@htmldocs/render`
- All packages → share `@htmldocs/eslint-config` and `@htmldocs/typescript-config`

The monorepo uses `workspace:*` protocol for internal dependencies, enabling seamless development across packages with automatic linking.

## Contributing

We welcome contributions! Here's how to get started:

### Development Environment

1. **Clone and setup**:
   ```bash
   git clone https://github.com/htmldocs-js/htmldocs.git
   cd htmldocs
   pnpm install
   ```

2. **Start development**:
   ```bash
   ./dev.sh
   ```

3. **Make changes** to templates in `apps/examples/documents/templates/`

4. **See changes instantly** in your browser with hot reload

### Common Tasks

- **Add new templates**: Create `.tsx` files in `apps/examples/documents/templates/`
- **Modify components**: Edit `packages/react/components/` (requires `pnpm build`)
- **Update CLI**: Edit `packages/htmldocs/src/cli/` (restart dev server)
- **Fix rendering**: Edit `packages/render/src/` (requires `pnpm build`)

### Testing

```bash
pnpm test          # Run all tests
pnpm test:coverage # Run tests with coverage
pnpm lint          # Check code style
pnpm format        # Format code
```

## License

MIT License
