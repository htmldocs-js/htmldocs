'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { Toaster } from 'sonner';
import { useHotreload } from '~/hooks/use-hot-reload';
import type { DocumentRenderingResult } from '~/actions/render-document-by-path';
import { Shell } from '~/components/shell';
import { useDocuments } from '~/contexts/documents';
import { useRenderingMetadata } from '~/hooks/use-rendering-metadata';
import { RenderingError } from './rendering-error';
import { DocumentSize } from "~/lib/types";
import { DocumentContextProvider } from '~/contexts/document-context';
import { JSONSchema7, JSONSchema7Definition } from 'json-schema';
import chalk from 'chalk';
import { MagnifyingGlassPlus, MagnifyingGlassMinus, ArrowClockwise } from '@phosphor-icons/react';

interface PreviewProps {
  slug: string;
  documentPath: string;
  pathSeparator: string;
  renderingResult: DocumentRenderingResult;
  schema: JSONSchema7Definition | null;
}

const Preview = ({
  slug,
  documentPath,
  pathSeparator,
  renderingResult: initialRenderingResult,
  schema,
}: PreviewProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeView = searchParams.get('view') ?? 'desktop';
  const { useDocumentRenderingResult, setPageConfig } = useDocuments();

  const renderingResult = useDocumentRenderingResult(
    documentPath,
    initialRenderingResult,
  );

  const renderedDocumentMetadata = useRenderingMetadata(
    documentPath,
    renderingResult,
    initialRenderingResult,
  );

  const [activeIframeId, setActiveIframeId] = React.useState<string>('iframe1');
  const [iframes, setIframes] = React.useState<{
    [key: string]: string | undefined;
  }>({
    iframe1: renderedDocumentMetadata?.markup,
  });

  const [zoomLevel, setZoomLevel] = React.useState(1);

  // Utility function to generate a simple hash from the markup
  const generateHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return `iframe-${Math.abs(hash)}`;
  };

  React.useEffect(() => {
    if (!renderedDocumentMetadata?.markup) return;

    console.debug("renderedDocumentMetadata.markup changed:", {
      length: renderedDocumentMetadata.markup.length,
      timestamp: new Date().toISOString(),
    });

    const newHash = generateHash(renderedDocumentMetadata.markup);

    // Prevent loading the same content again
    if (newHash === activeIframeId) return;

    // Set the new iframe content
    setIframes((prev) => ({
      ...prev,
      [newHash]: renderedDocumentMetadata.markup,
    }));

    // Store the hash of the iframe being loaded
    setNextIframeId(newHash);
  }, [renderedDocumentMetadata?.markup, activeIframeId]);

  const [nextIframeId, setNextIframeId] = React.useState<string | null>(null);

  const handleMessage = React.useCallback((event: MessageEvent) => {
    if (event.data.type === 'layoutComplete' && nextIframeId) {
      console.debug("Received layoutComplete message:", {
        documentSize: event.data.documentSize,
        documentOrientation: event.data.documentOrientation,
        timestamp: event.data.timestamp
      });


      if (event.data.documentSize) {
        // Validate that the size matches our DocumentSize type
        const size = event.data.documentSize;
        const standardSizes = ["A3", "A4", "A5", "letter", "legal"];
        const sizeRegex = /^\d+(?:in|cm|mm|px)\s+\d+(?:in|cm|mm|px)$/;
        
        if (standardSizes.includes(size) || sizeRegex.test(size)) {
          const orientation = event.data.documentOrientation === 'landscape' ? 'landscape' : 'portrait';
          
          setPageConfig(documentPath, {
            size: size as DocumentSize,
            orientation
          });
        } else {
          console.warn(`Invalid document size format: ${size}`);
        }
      }

      // Remove the previous iframe from state
      setIframes((prev) => {
        const updated = { ...prev };
        delete updated[activeIframeId];
        return updated;
      });

      // Update the active iframe ID
      setActiveIframeId(nextIframeId);
      setNextIframeId(null);
    }
  }, [activeIframeId, nextIframeId, documentPath, setPageConfig]);

  React.useEffect(() => {
    window.addEventListener('message', handleMessage);
    console.debug("Message event listener added");
    return () => {
      window.removeEventListener('message', handleMessage);
      console.debug("Message event listener removed");
    };
  }, [handleMessage]);

  if (process.env.NEXT_PUBLIC_IS_BUILDING !== 'true') {
    // this will not change on runtime so it doesn't violate
    // the rules of hooks
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useHotreload((changes) => {
      const changeForThisDocument = changes.find((change) =>
        change.filename.includes(slug),
      );

      if (typeof changeForThisDocument !== 'undefined') {
        if (changeForThisDocument.event === 'unlink') {
          router.push('/');
        }
      }
    });
  }

  const handleViewChange = (view: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('view', view);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleLangChange = (lang: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('view', 'source');
    params.set('lang', lang);
    router.push(`${pathname}?${params.toString()}`);
  };

  const hasNoErrors = typeof renderedDocumentMetadata !== 'undefined';

  const renderIframe = (id: string, isActive: boolean) => {
    const content = iframes[id];
    if (!content) return null;

    return (
      <div key={id} className="relative h-full">
        <iframe
          allow="same-origin"
          className={`absolute top-0 left-0 w-full h-[calc(100vh_-_70px)] print:h-[100vh] bg-white ${
            isActive ? 'z-20 opacity-100' : 'z-10 opacity-0'
          } ${activeView === 'mobile' ? 'w-[360px] mx-auto right-0' : ''}`}
          srcDoc={content}
          title={`${slug}-${id}`}
        />
      </div>
    );
  };

  const previewProps = 'previewProps' in renderingResult ? renderingResult.previewProps : {};

  const handleZoom = (newZoom: number) => {
    setZoomLevel(newZoom);
    const iframe = document.querySelector(`iframe[title="${slug}-${activeIframeId}"]`);
    if (iframe) {
      (iframe as HTMLIFrameElement).contentWindow?.postMessage({
        type: 'zoom',
        level: newZoom
      }, '*');
    }
  };

  const ZoomControls = () => (
    <div className="absolute top-4 right-6 z-30 flex gap-1 bg-background/80 backdrop-blur-sm p-1.5 rounded-lg shadow-md border border-border">
      <button
        onClick={() => handleZoom(Math.max(0.75, zoomLevel - 0.25))}
        className="p-1.5 hover:bg-muted rounded-md transition-colors"
        title="Zoom Out"
      >
        <MagnifyingGlassMinus className="text-foreground" size={16} />
      </button>
      <span className="flex items-center min-w-[3.5rem] justify-center text-sm text-foreground">
        {Math.round(zoomLevel * 100)}%
      </span>
      <button
        onClick={() => handleZoom(Math.min(4, zoomLevel + 0.25))}
        className="p-1.5 hover:bg-muted rounded-md transition-colors"
        title="Zoom In"
      >
        <MagnifyingGlassPlus className="text-foreground" size={16} />
      </button>
      <button
        onClick={() => handleZoom(1)}
        className="p-1.5 hover:bg-muted rounded-md transition-colors"
        title="Reset Zoom"
      >
        <ArrowClockwise className="text-foreground" size={16} />
      </button>
    </div>
  );

  return (
    <DocumentContextProvider
      initialDocumentPreviewProps={previewProps}
      initialDocumentSchema={schema as JSONSchema7}
    >
      <Shell
        documentPath={documentPath}
        activeView={hasNoErrors ? activeView : undefined}
        currentDocumentOpenSlug={slug}
        markup={renderedDocumentMetadata?.markup}
        pathSeparator={pathSeparator}
        setActiveView={hasNoErrors ? handleViewChange : undefined}
      >
          <div className="relative h-full">
            {'error' in renderingResult ? (
              <RenderingError error={renderingResult.error} />
            ) : null}

            {hasNoErrors ? (
              <div className="relative h-full">
                {nextIframeId && (
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-loading-bar z-30" />
                )}
                {Object.keys(iframes).map((id) =>
                  renderIframe(id, id === activeIframeId)
                )}
                <ZoomControls />
              </div>
            ) : null}
            <Toaster />
          </div>
      </Shell>
    </DocumentContextProvider>
  );
};

export default Preview;