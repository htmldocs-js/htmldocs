'use server';
import React from 'react';
import fs from 'node:fs';
import { getDocumentComponent } from '../../utils/get-document-component';
import { ErrorObject, improveErrorWithSourceMap } from '@htmldocs/render';

export interface RenderedDocumentMetadata {
  markup: string;
  reactMarkup: string;
  previewProps: Record<string, any>;
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
  props: Record<string, any> = {}
): Promise<DocumentRenderingResult> => {
  const isDev = process.env.NODE_ENV === 'development';
  isDev && console.debug(`[render] Starting render for document: ${documentPath}`);
  const startTime = performance.now();
  
  isDev && console.debug('[render] Loading component...');
  const result = await getDocumentComponent(documentPath);
  const componentLoadTime = performance.now() - startTime;
  isDev && console.debug(`[render] Component loaded in ${componentLoadTime.toFixed(2)}ms`);

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

  const renderProps = Object.keys(props).length !== 0 ? props : Document.PreviewProps || {};
  const DocumentComponent = Document as React.FC;
  
  try {
    isDev && console.debug('[render] Starting rendering...');
    const renderStart = performance.now();
    const markup = await renderAsync(<DocumentComponent {...renderProps} />, documentCss);
    const renderTime = performance.now() - renderStart;
    isDev && console.debug(`[render] Rendering completed in ${renderTime.toFixed(2)}ms`);

    isDev && console.debug('[render] Reading file...');
    const fileReadStart = performance.now();
    const reactMarkup = await fs.promises.readFile(documentPath, 'utf-8');
    const fileReadTime = performance.now() - fileReadStart;
    isDev && console.debug(`[render] File read in ${fileReadTime.toFixed(2)}ms`);

    const totalTime = performance.now() - startTime;
    isDev && console.debug(`[render] Completed in ${totalTime.toFixed(2)}ms`);

    return {
      markup,
      reactMarkup,
      previewProps: Document.PreviewProps,
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