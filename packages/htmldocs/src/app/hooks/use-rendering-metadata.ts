import { useEffect } from 'react';
import type {
  DocumentRenderingResult,
  RenderedDocumentMetadata,
} from '~/actions/render-document-by-path';

const lastRenderingMetadataPerDocumentPath = {} as Record<
  string,
  RenderedDocumentMetadata
>;

/**
 * Returns the rendering metadata if the given `renderingResult`
 * does not error. If it does error it returns the last value it had for the hook.
 */
export const useRenderingMetadata = (
  documentPath: string,
  renderingResult: DocumentRenderingResult,
  initialRenderingMetadata?: DocumentRenderingResult,
): RenderedDocumentMetadata | undefined => {
  useEffect(() => {
    if (renderingResult && 'markup' in renderingResult) {
      lastRenderingMetadataPerDocumentPath[documentPath] = renderingResult;
    } else if (
      typeof initialRenderingMetadata !== 'undefined' &&
      'markup' in initialRenderingMetadata &&
      typeof lastRenderingMetadataPerDocumentPath[documentPath] === 'undefined'
    ) {
      lastRenderingMetadataPerDocumentPath[documentPath] = initialRenderingMetadata;
    }
  }, [renderingResult, documentPath, initialRenderingMetadata]);

  return renderingResult && 'error' in renderingResult
    ? lastRenderingMetadataPerDocumentPath[documentPath]
    : renderingResult;
};