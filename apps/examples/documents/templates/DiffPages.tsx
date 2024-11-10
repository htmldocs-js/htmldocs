import { Document, Head, Page } from "@htmldocs/react";

export default function DiffPages() {
  return (
    <Document size="A4" orientation="landscape">
      <Head>
        <title>Different Page Sizes</title>
      </Head>

      {/* Default A4 Portrait page */}
      <Page className="flex items-center justify-center">
        <h1 className="text-2xl">Default A4 Portrait Page</h1>
      </Page>

      {/* A4 Landscape page */}
      <Page className="flex items-center justify-center">
        <h1 className="text-2xl">A4 Landscape Page</h1>
      </Page>

      {/* A5 Portrait page with custom margin */}
      <Page className="flex items-center justify-center">
        <h1 className="text-2xl">A5 Portrait Page with 1 inch margins</h1>
      </Page>

      {/* Letter size landscape page */}
      <Page className="flex items-center justify-center">
        <h1 className="text-2xl">Letter Size Landscape Page</h1>
      </Page>
    </Document>
  );
}
