'use server';
import React from 'react';
import fs from 'node:fs';
import { getDocumentComponent } from '../../utils/get-document-component';
import type { ErrorObject } from '../../utils/types/error-object';
import { improveErrorWithSourceMap } from '../../utils/improve-error-with-sourcemap';

export interface RenderedDocumentMetadata {
  markup: string;
//   plainText: string;
  reactMarkup: string;
}

export type DocumentRenderingResult =
  | RenderedDocumentMetadata
  | {
      error: ErrorObject;
    };

export const renderDocumentByPath = async (
  documentPath: string,
): Promise<DocumentRenderingResult> => {
  const result = await getDocumentComponent(documentPath);

  if ('error' in result) {
    return { error: result.error };
  }

  const {
    documentComponent: Document,
    documentCss,
    renderAsync,
    sourceMapToOriginalFile,
  } = result;

  const previewProps = Document.PreviewProps || {};
  const DocumentComponent = Document as React.FC;
  try {
    const markup = await renderAsync(<DocumentComponent {...previewProps} />, documentCss);

    const reactMarkup = await fs.promises.readFile(documentPath, 'utf-8');

    return {
      markup,
    //   plainText,
      reactMarkup,
    };
  } catch (exception) {
    const error = exception as Error;

    return {
      error: improveErrorWithSourceMap(
        error,
        documentPath,
        sourceMapToOriginalFile,
      ),
    };
  }
};