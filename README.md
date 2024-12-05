![HTMLDocs Cover](https://placehold.co/1200x600/e4e4e7/ffffff?text=HTMLDocs)

<div align="center"><strong>HTMLDocs</strong></div>
<div align="center">The modern approach to documentation generation.<br />High-quality, customizable components for creating beautiful documentation.</div>
<br />
<div align="center">
<a href="https://htmldocs.dev">Website</a> 
<span> · </span>
<a href="https://github.com/yourusername/htmldocs">GitHub</a> 
<span> · </span>
<a href="https://discord.gg/htmldocs">Discord</a>
</div>

## Introduction

A powerful monorepo built with Turborepo for creating and managing documentation with React components. It simplifies the process of building beautiful, responsive documentation with modern web technologies and takes care of complex styling and layout concerns.

## Why

Documentation should be as dynamic and modern as the applications we build. HTMLDocs brings documentation into the modern era with component-based architecture, real-time previews, and a developer-first approach. Stop wrestling with static site generators and embrace a more powerful way to create documentation.

## Install

Install HTMLDocs using your preferred package manager.

#### With pnpm

```sh
pnpm create turbo@latest
```

#### With yarn

```sh
yarn create turbo
```

#### With npm

```sh
npx create-turbo@latest
```

## Getting Started

Create your first documentation page with HTMLDocs:

```jsx
import { Document, Section, Code } from "@htmldocs/react";

const Documentation = () => {
  return (
    <Document title="Getting Started">
      <Section>
        <h1>Welcome to HTMLDocs</h1>
        <Code language="typescript">
          console.log("Hello, Documentation!");
        </Code>
      </Section>
    </Document>
  );
};
```

## Packages

The monorepo includes the following packages:

- `@htmldocs/react`: React component library for documentation
- `@htmldocs/render`: Documentation rendering engine
- `@htmldocs/htmldocs`: Core documentation package
- `@htmldocs/eslint-config`: Shared ESLint configurations
- `@htmldocs/typescript-config`: Shared TypeScript configurations

## Apps

- `docs`: Documentation site built with Next.js
- `app`: Main application
- `examples`: Example implementations and use cases

## Development

#### Install dependencies

```sh
pnpm install
```

#### Start development environment

```sh
pnpm dev
```

#### Build all packages and apps

```sh
pnpm build
```

## Tech Stack

| <img src="https://nextjs.org/static/favicon/favicon-32x32.png" width="48px" height="48px" alt="Next.js"> | <img src="https://www.typescriptlang.org/favicon-32x32.png" width="48px" height="48px" alt="TypeScript"> | <img src="https://turbo.build/images/favicon-32x32.png" width="48px" height="48px" alt="Turborepo"> | <img src="https://pnpm.io/img/favicon.png" width="48px" height="48px" alt="pnpm"> |
|--------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| Next.js                                                                                                  | TypeScript                                                                                            | Turborepo                                                                                         | pnpm                                                                             |

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License
