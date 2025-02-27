"use client";

import React from "react";
import type { DocumentRenderingResult } from "~/actions/render-document-by-path";
import { useDocuments } from "~/contexts/documents";
import { useRenderingMetadata } from "~/hooks/use-rendering-metadata";

interface PreviewProps {
  slug: string;
  documentPath: string;
  renderingResult: DocumentRenderingResult;
}

const Preview = ({
  slug,
  documentPath,
  renderingResult: initialRenderingResult,
}: PreviewProps) => {
  const { useDocumentRenderingResult } = useDocuments();

  const renderingResult = useDocumentRenderingResult(
    documentPath,
    initialRenderingResult
  );

  const renderedDocumentMetadata = useRenderingMetadata(
    documentPath,
    renderingResult,
    initialRenderingResult
  );

  return (
    <div className="relative h-full">
      <iframe
        allow="same-origin"
        className="w-full h-full bg-white"
        srcDoc={renderedDocumentMetadata?.markup}
        title={slug}
      />
    </div>
  );
};

export default Preview;

