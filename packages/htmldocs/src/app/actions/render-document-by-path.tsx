'use server';
import React from 'react';
import fs from 'node:fs';
import { getDocumentComponent } from '../../utils/get-document-component';
import { ErrorObject, improveErrorWithSourceMap } from '@htmldocs/render';

export interface RenderedDocumentMetadata {
  markup: string;
  reactMarkup: string;
  timing?: {
    total: number;
    componentLoad: number;
    rendering: number;
    fileRead: number;
  };
}

export type DocumentRenderingResult =
  | RenderedDocumentMetadata
  | {
      error: ErrorObject;
    };

export const renderDocumentByPath = async (
  documentPath: string,
): Promise<DocumentRenderingResult> => {
  console.log(`[render] Starting render for document: ${documentPath}`);
  const startTime = performance.now();
  
  console.time('componentLoad');
  const result = await getDocumentComponent(documentPath);
  const componentLoadTime = performance.now() - startTime;
  console.timeEnd('componentLoad');

  if ('error' in result) {
    console.error('[render] Error loading component:', result.error);
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
    console.time('rendering');
    const renderStart = performance.now();
    const markup = await renderAsync(<DocumentComponent {...previewProps} />, documentCss);
    const renderTime = performance.now() - renderStart;
    console.timeEnd('rendering');

    console.time('fileRead');
    const fileReadStart = performance.now();
    const reactMarkup = await fs.promises.readFile(documentPath, 'utf-8');
    const fileReadTime = performance.now() - fileReadStart;
    console.timeEnd('fileRead');

    const totalTime = performance.now() - startTime;
    console.log(`[render] Completed in ${totalTime.toFixed(2)}ms`);

    return {
      markup,
      reactMarkup,
      timing: {
        total: totalTime,
        componentLoad: componentLoadTime,
        rendering: renderTime,
        fileRead: fileReadTime
      }
    };
  } catch (exception) {
    const error = exception as Error;
    console.error('[render] Error during rendering:', error);

    return {
      error: improveErrorWithSourceMap(
        error,
        documentPath,
        sourceMapToOriginalFile,
      ),
    };
  }
};