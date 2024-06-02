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
  renderingResult: DocumentRenderingResult;
}

const Preview = ({
  slug,
  documentPath,
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

  return (
    <Shell
      documentPath={documentPath}
      activeView={hasNoErrors ? activeView : undefined}
      currentDocumentOpenSlug={slug}
      markup={renderedDocumentMetadata?.markup}
      setActiveView={hasNoErrors ? handleViewChange : undefined}
    >
      {/* This relative is so that when there is any error the user can still switch between documents */}
      <div className="relative h-full">
        {'error' in renderingResult ? (
          <RenderingError error={renderingResult.error} />
        ) : null}

        {/* If this is undefined means that the initial server render of the document had errors */}
        {hasNoErrors ? (
          <>
            {activeView === 'desktop' && (
              <iframe
                className="w-full bg-white h-[calc(100vh_-_70px)]"
                srcDoc={renderedDocumentMetadata.markup}
                title={slug}
              />
            )}

            {activeView === 'mobile' && (
              <iframe
                className="w-[360px] bg-white h-[calc(100vh_-_70px)] mx-auto"
                srcDoc={renderedDocumentMetadata.markup}
                title={slug}
              />
            )}
          </>
        ) : null}
        <Toaster />
      </div>
    </Shell>
  );
};

export default Preview;