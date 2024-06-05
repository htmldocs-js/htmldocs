import { RawSourceMap } from "source-map-js";
import { renderAsync } from "@htmldocs/render";

export interface DocumentComponent {
  (props: Record<string, unknown> | Record<string, never>): React.ReactNode;
  PreviewProps?: Record<string, unknown>;
  documentId?: string;
}

export interface GetDocumentComponentResult {
  documentComponent: any;
  documentCss: string | undefined;
  renderAsync: typeof renderAsync;
  sourceMapToOriginalFile: RawSourceMap;
}

export interface RenderedDocumentMetadata {
  markup: string;
  reactMarkup: string;
}

export type DocumentRenderingResult = RenderedDocumentMetadata | { error: ErrorObject };

/**
 * An object that mimics the structure of the Error class,
 * we just can't use the Error class here because server actions can't
 * return classes
 */
export interface ErrorObject {
    name: string;
    stack: string | undefined;
    cause: unknown;
    message: string;
  }
  