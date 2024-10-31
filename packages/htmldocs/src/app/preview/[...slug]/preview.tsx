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

interface PreviewProps {
  slug: string;
  documentPath: string;
  pathSeparator: string;
  renderingResult: DocumentRenderingResult;
}

const Preview = ({
  slug,
  documentPath,
  pathSeparator,
  renderingResult: initialRenderingResult,
}: PreviewProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeView = searchParams.get('view') ?? 'desktop';
  const activeLang = searchParams.get('lang') ?? 'jsx';
  const { useDocumentRenderingResult } = useDocuments();

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

    console.log("renderedDocumentMetadata.markup changed:", {
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
  }, [activeIframeId, nextIframeId]);

  React.useEffect(() => {
    window.addEventListener('message', handleMessage);
    console.log("Message event listener added");
    return () => {
      window.removeEventListener('message', handleMessage);
      console.log("Message event listener removed");
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
          className={`absolute top-0 left-0 w-full h-[calc(100vh_-_70px)] bg-white ${
            isActive ? 'z-20 opacity-100' : 'z-10 opacity-0'
          } ${activeView === 'mobile' ? 'w-[360px] mx-auto right-0' : ''}`}
          srcDoc={content}
          title={`${slug}-${id}`}
        />
      </div>
    );
  };

  return (
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
          </div>
        ) : null}
        <Toaster />
      </div>
    </Shell>
  );
};

export default Preview;