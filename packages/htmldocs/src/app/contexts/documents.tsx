"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getDocumentsDirectoryMetadata,
  type DocumentsDirectory,
} from "~/actions/get-documents-directory-metadata";
import { useHotreload } from "~/hooks/use-hot-reload";
import {
  renderDocumentByPath,
  type DocumentRenderingResult,
} from "~/actions/render-document-by-path";
import { getDocumentPathFromSlug } from "~/actions/get-document-path-from-slug";
import { renderDocumentToPDF, RenderDocumentToPDFProps } from "~/actions/render-document-to-pdf";
import { PageConfig } from "~/lib/types";
import logger from "~/lib/logger";

const DocumentsContext = createContext<
  | {
      documentsDirectoryMetadata: DocumentsDirectory;
      /**
       * Uses the hot reloaded bundled build and rendering document result
       */
      useDocumentRenderingResult: (
        documentPath: string,
        serverDocumentRenderedResult: DocumentRenderingResult
      ) => DocumentRenderingResult;
      renderDocumentToPDF: ({ url, ...props }: RenderDocumentToPDFProps) => Promise<Buffer | Error>;
      pageConfigs: Record<string, PageConfig>;
      setPageConfig: (documentPath: string, config: PageConfig) => void;
    }
  | undefined
>(undefined);

export const useDocuments = () => {
  const providerValue = useContext(DocumentsContext);

  if (typeof providerValue === "undefined") {
    throw new Error(
      "Cannot call `useDocument()` outside of a DocumentsContext provider!"
    );
  }

  return providerValue;
};

export const DocumentsProvider = (props: {
  initialDocumentsDirectoryMetadata: DocumentsDirectory;
  children: React.ReactNode;
}) => {
  const [documentsDirectoryMetadata, setDocumentsDirectoryMetadata] =
    useState<DocumentsDirectory>(props.initialDocumentsDirectoryMetadata);

  const [renderingResultPerDocumentPath, setRenderingResultPerDocumentPath] =
    useState<Record<string, DocumentRenderingResult>>({});

  const [pageConfigs, setPageConfigs] = useState<Record<string, PageConfig>>({});

  const setPageConfig = (documentPath: string, config: PageConfig) => {
    setPageConfigs(prev => ({
      ...prev,
      [documentPath]: config
    }));
  };

  if (process.env.NEXT_PUBLIC_IS_BUILDING !== "true") {
    // this will not change on runtime so it doesn't violate
    // the rules of hooks
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useHotreload(async (changes) => {
      const metadata = await getDocumentsDirectoryMetadata(
        props.initialDocumentsDirectoryMetadata.absolutePath,
      );

      if (metadata) {
        setDocumentsDirectoryMetadata(metadata);
      } else {
        throw new Error(
          "Hot reloading: unable to find the documents directory to update the sidebar"
        );
      }

      for await (const change of changes) {
        if (!change.filename.match(/\.(js|jsx|ts|tsx)$/)) {
          return;
        }

        // If the document is being deleted, don't try to render it
        if (change.event === 'unlink') {
          continue;
        }

        const slugForChangedDocument =
          // filename ex: documents/apple-receipt.tsx
          // so we need to remove the "documents/" because it isn't used
          // on the slug parameter for the preview page
          change.filename;

        const pathForChangedDocument = await getDocumentPathFromSlug(
          slugForChangedDocument
        );

        const lastResult =
          renderingResultPerDocumentPath[pathForChangedDocument];

        if (typeof lastResult !== "undefined") {
          logger.debug("pathForChangedDocument", pathForChangedDocument);
          const renderingResult = await renderDocumentByPath(
            pathForChangedDocument
          );

          setRenderingResultPerDocumentPath((map) => ({
            ...map,
            [pathForChangedDocument]: renderingResult,
          }));
        }
      }
    });
  }

  return (
    <DocumentsContext.Provider
      value={{
        documentsDirectoryMetadata,
        useDocumentRenderingResult: (
          documentPath,
          serverDocumentRenderedResult
        ) => {
          useEffect(() => {
            if (
              typeof renderingResultPerDocumentPath[documentPath] ===
              "undefined"
            ) {
              setRenderingResultPerDocumentPath((map) => ({
                ...map,
                [documentPath]: serverDocumentRenderedResult,
              }));
            }
          }, [serverDocumentRenderedResult, documentPath]);

          if (
            typeof renderingResultPerDocumentPath[documentPath] !== "undefined"
          ) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return renderingResultPerDocumentPath[documentPath]!;
          }

          return serverDocumentRenderedResult;
        },
        renderDocumentToPDF,
        pageConfigs,
        setPageConfig,
      }}
    >
      {props.children}
    </DocumentsContext.Provider>
  );
};
