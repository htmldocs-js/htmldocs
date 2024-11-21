"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getDocumentsDirectoryMetadata,
  type DocumentsDirectory,
} from "~/actions/get-documents-directory-metadata";
import { useHotreload } from "~/hooks/use-hot-reload";
import {
  documentsDirectoryAbsolutePath,
} from "../../utils/documents-directory-absolute-path";
import {
  renderDocumentByPath,
  type DocumentRenderingResult,
} from "~/actions/render-document-by-path";
import { getDocumentPathFromSlug } from "~/actions/get-document-path-from-slug";
import { renderDocumentToPDF, RenderDocumentToPDFProps, DocumentSize } from "~/actions/render-document-to-pdf";

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
      documentSizes: Record<string, DocumentSize>;
      setDocumentSize: (documentPath: string, size: DocumentSize) => void;
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

  const [documentSizes, setDocumentSizes] = useState<Record<string, DocumentSize>>({});

  const setDocumentSize = (documentPath: string, size: DocumentSize) => {
    setDocumentSizes(prev => ({
      ...prev,
      [documentPath]: size
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
          console.log("pathForChangedDocument", pathForChangedDocument);
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
        documentSizes,
        setDocumentSize,
      }}
    >
      {props.children}
    </DocumentsContext.Provider>
  );
};
