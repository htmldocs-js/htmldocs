import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "htmldocs examples",
  description: "Sample development environment for htmldocs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.3.0/paper.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
