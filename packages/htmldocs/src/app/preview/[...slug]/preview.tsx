'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { Toaster } from 'sonner';
import { useHotreload } from '~/hooks/use-hot-reload';
import {
  renderDocumentByPath,
  type DocumentRenderingResult,
} from '~/actions/render-document-by-path';
import { useShellControls } from '~/components/shell';
import { Topbar } from '~/components/topbar';
import { useDocuments } from '~/contexts/documents';
import { useRenderingMetadata } from '~/hooks/use-rendering-metadata';
import { RenderingError } from './rendering-error';
import { DocumentSize } from '~/lib/types';
import {
  DocumentContextProvider,
  useDocumentContext,
} from '~/contexts/document-context';
import { JSONSchema7, JSONSchema7Definition } from 'json-schema';
import chalk from 'chalk';
import {
  MagnifyingGlassPlus,
  MagnifyingGlassMinus,
  ArrowClockwise,
} from '@phosphor-icons/react';

interface PreviewProps {
  slug: string;
  documentPath: string;
  pathSeparator: string;
  renderingResult: DocumentRenderingResult;
  schema: JSONSchema7Definition | null;
}

interface PreviewContentProps extends Omit<PreviewProps, 'schema'> {
  renderingResult: DocumentRenderingResult;
}

const LIVE_RENDER_DEBOUNCE_MS = 150;
const DOCUMENT_THEME_ATTRIBUTE_PATTERN =
  /data-theme=(["'])(dark|light)\1/g;
const DOCUMENT_THEME_CLASS_PATTERN = /\btheme-(dark|light)\b/g;

type DocumentTheme = 'dark' | 'light';

const getDocumentThemeFromMarkup = (
  markup: string,
): DocumentTheme | undefined => {
  const match = markup.match(/data-theme=["'](dark|light)["']/);
  return match?.[1] as DocumentTheme | undefined;
};

const normalizeDocumentThemeMarkup = (markup: string) =>
  markup
    .replace(DOCUMENT_THEME_ATTRIBUTE_PATTERN, 'data-theme=$1theme$1')
    .replace(DOCUMENT_THEME_CLASS_PATTERN, 'theme-theme');

const isThemeOnlyMarkupUpdate = (
  currentMarkup: string,
  nextMarkup: string,
) => {
  const currentTheme = getDocumentThemeFromMarkup(currentMarkup);
  const nextTheme = getDocumentThemeFromMarkup(nextMarkup);

  return (
    typeof currentTheme !== 'undefined' &&
    typeof nextTheme !== 'undefined' &&
    currentTheme !== nextTheme &&
    normalizeDocumentThemeMarkup(currentMarkup) ===
      normalizeDocumentThemeMarkup(nextMarkup)
  );
};

const useLiveDocumentRendering = (
  documentPath: string,
  sourceRenderingResult: DocumentRenderingResult,
) => {
  const { documentContext } = useDocumentContext();
  const documentProps = documentContext.document ?? {};
  const documentPropsKey = React.useMemo(
    () => JSON.stringify(documentProps),
    [documentProps],
  );
  const sourcePreviewProps =
    'previewProps' in sourceRenderingResult
      ? sourceRenderingResult.previewProps
      : {};
  const sourcePreviewPropsKey = React.useMemo(
    () => JSON.stringify(sourcePreviewProps),
    [sourcePreviewProps],
  );

  const [renderingResult, setRenderingResult] = React.useState(
    sourceRenderingResult,
  );
  const [isLiveRendering, setIsLiveRendering] = React.useState(false);
  const latestRequestIdRef = React.useRef(0);
  const lastRenderedPropsKeyRef = React.useRef(sourcePreviewPropsKey);
  const sourceRenderingResultRef = React.useRef(sourceRenderingResult);

  React.useEffect(() => {
    if (sourceRenderingResultRef.current === sourceRenderingResult) return;

    sourceRenderingResultRef.current = sourceRenderingResult;
    latestRequestIdRef.current += 1;
    lastRenderedPropsKeyRef.current = sourcePreviewPropsKey;
    setIsLiveRendering(false);

    React.startTransition(() => {
      setRenderingResult(sourceRenderingResult);
    });
  }, [sourcePreviewPropsKey, sourceRenderingResult]);

  React.useEffect(() => {
    if (documentPropsKey === lastRenderedPropsKeyRef.current) {
      setIsLiveRendering(false);
      return;
    }

    const requestId = latestRequestIdRef.current + 1;
    latestRequestIdRef.current = requestId;

    const timeoutId = window.setTimeout(async () => {
      setIsLiveRendering(true);

      try {
        const nextRenderingResult = await renderDocumentByPath(
          documentPath,
          documentProps,
        );

        if (latestRequestIdRef.current !== requestId) return;

        lastRenderedPropsKeyRef.current = documentPropsKey;
        React.startTransition(() => {
          setRenderingResult(nextRenderingResult);
        });
      } catch (error) {
        console.error('Failed to live render document:', error);
      } finally {
        if (latestRequestIdRef.current === requestId) {
          setIsLiveRendering(false);
        }
      }
    }, LIVE_RENDER_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);

      if (latestRequestIdRef.current === requestId) {
        latestRequestIdRef.current += 1;
      }
    };
  }, [documentPath, documentProps, documentPropsKey, sourceRenderingResult]);

  return { documentProps, isLiveRendering, renderingResult };
};

const PreviewContent = ({
  slug,
  documentPath,
  pathSeparator,
  renderingResult: sourceRenderingResult,
}: PreviewContentProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { toggleSidebar } = useShellControls();

  const activeView = searchParams.get('view') ?? 'desktop';
  const { setPageConfig } = useDocuments();
  const { documentProps, isLiveRendering, renderingResult } =
    useLiveDocumentRendering(documentPath, sourceRenderingResult);
  const documentTheme: DocumentTheme | undefined =
    typeof documentProps.darkMode === 'boolean'
      ? documentProps.darkMode
        ? 'dark'
        : 'light'
      : undefined;

  const renderedDocumentMetadata = useRenderingMetadata(
    documentPath,
    renderingResult,
    sourceRenderingResult,
  );

  const [activeIframeId, setActiveIframeId] = React.useState<string>('iframe1');
  const [iframes, setIframes] = React.useState<{
    [key: string]: string | undefined;
  }>({
    iframe1: renderedDocumentMetadata?.markup,
  });

  const [zoomLevel, setZoomLevel] = React.useState(1);
  const displayedMarkupRef = React.useRef<string | undefined>(undefined);

  const applyThemeToRenderedIframes = React.useCallback(
    (theme: DocumentTheme) => {
      const iframeTitlePrefix = `${slug}-`;
      const shouldReduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      document.querySelectorAll('iframe').forEach((element) => {
        if (
          !(element instanceof HTMLIFrameElement) ||
          !element.title.startsWith(iframeTitlePrefix)
        ) {
          return;
        }

        const iframeDocument = element.contentDocument;
        if (!iframeDocument) return;

        iframeDocument
          .querySelectorAll<HTMLElement>(
            '[data-theme="light"], [data-theme="dark"], .theme-light, .theme-dark',
          )
          .forEach((themedElement) => {
            if (shouldReduceMotion) {
              themedElement.style.transition = 'none';
              themedElement
                .querySelectorAll<HTMLElement>('*')
                .forEach((child) => {
                  child.style.transition = 'none';
                });
            }

            if (themedElement.hasAttribute('data-theme')) {
              themedElement.dataset.theme = theme;
            }

            if (
              themedElement.classList.contains('theme-light') ||
              themedElement.classList.contains('theme-dark')
            ) {
              themedElement.classList.toggle('theme-light', theme === 'light');
              themedElement.classList.toggle('theme-dark', theme === 'dark');
            }
          });
      });
    },
    [slug],
  );

  React.useEffect(() => {
    if (typeof documentTheme === 'undefined') return;
    applyThemeToRenderedIframes(documentTheme);
  }, [applyThemeToRenderedIframes, documentTheme]);

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

    const nextMarkup = renderedDocumentMetadata.markup;
    const currentMarkup = displayedMarkupRef.current;
    displayedMarkupRef.current = nextMarkup;

    console.debug('renderedDocumentMetadata.markup changed:', {
      length: nextMarkup.length,
      timestamp: new Date().toISOString(),
    });

    if (
      currentMarkup &&
      isThemeOnlyMarkupUpdate(currentMarkup, nextMarkup)
    ) {
      const nextTheme = getDocumentThemeFromMarkup(nextMarkup);
      if (nextTheme) applyThemeToRenderedIframes(nextTheme);
      return;
    }

    const newHash = generateHash(nextMarkup);

    // Prevent loading the same content again
    if (newHash === activeIframeId) return;

    // Set the new iframe content
    setIframes((prev) => ({
      ...prev,
      [newHash]: nextMarkup,
    }));

    // Store the hash of the iframe being loaded
    setNextIframeId(newHash);
  }, [
    activeIframeId,
    applyThemeToRenderedIframes,
    renderedDocumentMetadata?.markup,
  ]);

  const [nextIframeId, setNextIframeId] = React.useState<string | null>(null);

  const handleIframeLoad = React.useCallback(
    (iframeId: string) => {
      if (iframeId === nextIframeId) {
        setActiveIframeId(iframeId);
      }
    },
    [nextIframeId],
  );

  const handleMessage = React.useCallback(
    (event: MessageEvent) => {
      if (event.data.type === 'layoutComplete' && nextIframeId) {
        console.debug('Received layoutComplete message:', {
          documentSize: event.data.documentSize,
          documentOrientation: event.data.documentOrientation,
          timestamp: event.data.timestamp,
        });

        if (event.data.documentSize) {
          // Validate that the size matches our DocumentSize type
          const size = event.data.documentSize;
          const standardSizes = ['A3', 'A4', 'A5', 'letter', 'legal'];
          const sizeRegex = /^\d+(?:in|cm|mm|px)\s+\d+(?:in|cm|mm|px)$/;

          if (standardSizes.includes(size) || sizeRegex.test(size)) {
            const orientation =
              event.data.documentOrientation === 'landscape'
                ? 'landscape'
                : 'portrait';

            setPageConfig(documentPath, {
              size: size as DocumentSize,
              orientation,
            });
          } else {
            console.warn(`Invalid document size format: ${size}`);
          }
        }

        // Keep only the newly paginated iframe once layout is complete.
        setIframes((prev) => {
          const nextIframe = prev[nextIframeId];
          return nextIframe ? { [nextIframeId]: nextIframe } : prev;
        });

        setActiveIframeId(nextIframeId);
        setNextIframeId(null);
      }
    },
    [nextIframeId, documentPath, setPageConfig],
  );

  React.useEffect(() => {
    window.addEventListener('message', handleMessage);
    console.debug('Message event listener added');
    return () => {
      window.removeEventListener('message', handleMessage);
      console.debug('Message event listener removed');
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
          onLoad={() => handleIframeLoad(id)}
          srcDoc={content}
          title={`${slug}-${id}`}
        />
      </div>
    );
  };

  const handleZoom = (newZoom: number) => {
    setZoomLevel(newZoom);
    const iframe = document.querySelector(
      `iframe[title="${slug}-${activeIframeId}"]`,
    );
    if (iframe) {
      (iframe as HTMLIFrameElement).contentWindow?.postMessage(
        {
          type: 'zoom',
          level: newZoom,
        },
        '*',
      );
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

  const previewCanvas = (
    <div className="relative min-h-0 flex-1">
      {'error' in renderingResult ? (
        <RenderingError error={renderingResult.error} />
      ) : null}

      {hasNoErrors ? (
        <div className="relative h-full">
          {isLiveRendering || nextIframeId ? (
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-loading-bar z-30" />
          ) : null}
          {Object.keys(iframes).map((id) =>
            renderIframe(id, id === activeIframeId),
          )}
          <ZoomControls />
        </div>
      ) : null}
    </div>
  );

  return (
    <>
      <div className="flex h-full min-h-0 flex-col print-hide">
        <Topbar
          documentPath={documentPath}
          activeView={hasNoErrors ? activeView : undefined}
          currentDocumentOpenSlug={slug}
          markup={renderedDocumentMetadata?.markup}
          onToggleSidebar={toggleSidebar}
          pathSeparator={pathSeparator}
          setActiveView={hasNoErrors ? handleViewChange : undefined}
        />
        {previewCanvas}
        <Toaster richColors />
      </div>
      <div className="print-show h-screen">{previewCanvas}</div>
    </>
  );
};

const Preview = ({
  renderingResult: initialRenderingResult,
  schema: initialSchema,
  ...previewProps
}: PreviewProps) => {
  const { useDocumentRenderingResult, documentSchemas } = useDocuments();
  const renderingResult = useDocumentRenderingResult(
    previewProps.documentPath,
    initialRenderingResult,
  );
  const schema = documentSchemas[previewProps.documentPath] || initialSchema;
  const initialDocumentPreviewProps =
    'previewProps' in renderingResult ? renderingResult.previewProps : {};

  return (
    <DocumentContextProvider
      initialDocumentPreviewProps={initialDocumentPreviewProps}
      initialDocumentSchema={schema as JSONSchema7}
    >
      <PreviewContent {...previewProps} renderingResult={renderingResult} />
    </DocumentContextProvider>
  );
};

export default Preview;
