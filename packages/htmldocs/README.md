![htmldocs](https://github.com/user-attachments/assets/6f8e8ef2-022d-4418-8e86-c9663587f92f)

<div align="center"><strong>htmldocs</strong></div>
<div align="center">Build beautiful, reactive documents with modern web technologies <br /> and generate them at scale. Batteries included.</div>
<br />
<div align="center">
<a href="https://htmldocs.com">Website</a> 
<span> · </span>
<a href="https://github.com/htmldocs-js/htmldocs">GitHub</a> 
<span> · </span>
<a href="https://join.slack.com/t/htmldocs/shared_invite/zt-29hw1bnmu-ShX6Jo1KNc_XeF~gFQJH_Q">Slack</a>
</div>

## Introduction
PDF document creation is stuck in the past - from clunky Word docs to complex LaTeX to outdated tools. htmldocs brings document generation into 2025 with a modern developer experience using the tools you already love: <b>React</b>, <b>TypeScript</b>, and <b>Tailwind</b>.

## Why

htmldocs is a modern toolkit for building documents with the web:

- **Styling**: Use modern CSS properties to create visually stunning documents with web-like flexibility.

- **Structure**: Create clean layouts using HTML's powerful tools like flexbox, grid, and tables.

- **External Libraries**: Seamlessly integrate web libraries like FontAwesome, Bootstrap, and KaTeX

- **Dynamic Templates**: Leverage JSX to create reusable document templates with dynamic content:
  ```jsx
  function Invoice({ customer, items, total }) {
    return (
      <Document>
        <Page>
          <h1>Invoice for {customer.name}</h1>
          {items.map(item => (
            <LineItem {...item} />
          ))}
          <Total amount={total} />
        </Page>
      </Document>
    );
  }
  ```

- **Data-Driven Documents**: Generate documents programmatically by passing data through props or fetching from APIs. Perfect for invoices, contracts, and reports that need dynamic content.

- **Version Control**: Track document changes using Git and other version control systems

- **Consistency**: Maintain uniform document styling across your organization through shared stylesheets.

## Install

To create your first htmldocs project, run the following command:

```sh
npx htmldocs@latest init
```

For further instructions or to integrate htmldocs into your existing project, refer to the [Getting Started](https://docs.htmldocs.com/getting-started) guide.

## Getting Started

Create your first document with htmldocs:

```jsx
import { Document, Page } from "@htmldocs/react";

export default function MyDocument() {
  return (
    <Document size="A4" orientation="portrait" margin="0.5in">
        <Page style={{ backgroundColor: "#000", color: "#fff" }}>
            <h1>Hello from the dark side</h1>
        </Page>
    </Document>
  );
}
```

## Components

htmldocs comes with a standard set of components to help you layout and style your documents.

- [Document](https://docs.htmldocs.com/components/document)
- [Head](https://docs.htmldocs.com/components/head)
- [Page](https://docs.htmldocs.com/components/page)
- [Footer](https://docs.htmldocs.com/components/footer)
- [MarginBox](https://docs.htmldocs.com/components/margin-box)
- [Spacer](https://docs.htmldocs.com/components/spacer)

## How it works

htmldocs is a modern toolkit for building documents with web technologies. It automatically handles the layout and chunking of your document into pages, templating variables using JSX, and hot-reloading your document.

htmldocs is built upon Chromium's rendering engine, which means it can render any HTML, CSS, and JavaScript. This is different from other tools like [wkhtmltopdf](https://wkhtmltopdf.org/), [WeasyPrint](https://weasyprint.org/), and [Prince](https://www.princexml.com/), which only support a subset of HTML and CSS.

htmldocs also uses the [Paged.js library](https://pagedjs.org/) under the hood. Paged.js is used for layout and chunking, as well as more modern features like margin boxes that aren't fully supported by the W3C's CSS standard.

## Tech Stack

| <img src="https://nextjs.org/static/favicon/favicon-32x32.png" width="48px" height="48px" alt="Next.js"> | <img src="https://www.typescriptlang.org/favicon-32x32.png" width="48px" height="48px" alt="TypeScript"> | <img src="https://user-images.githubusercontent.com/4060187/196936123-f6e1db90-784d-4174-b774-92502b718836.png" width="48px" height="48px" alt="Turborepo"> | <img src="https://pnpm.io/img/favicon.png" width="48px" height="48px" alt="pnpm"> |
|--------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| Next.js                                                                                                  | TypeScript                                                                                            | Turborepo                                                                                         | pnpm                                                                             |

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License
