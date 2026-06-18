import { Suspense } from 'react';
import path from 'node:path';
import { redirect } from 'next/navigation';
import { getDocumentPathFromSlug } from '~/actions/get-document-path-from-slug';
import { getDocumentsDirectoryMetadata } from '~/actions/get-documents-directory-metadata';
import { renderDocumentByPath } from '~/actions/render-document-by-path';
import { documentsDirectoryAbsolutePath } from '../../../utils/documents-directory-absolute-path';
import Home from '../../page';
import Preview from './preview';
import { getDocumentSchema } from '~/actions/get-document-schema';

export const dynamicParams = true;

export interface PreviewParams {
  slug: string[];
}

interface PreviewPageProps {
  params: Promise<PreviewParams>;
}

// Force this to be server-side rendered and not statically generated
export const dynamic = "force-dynamic";

const Page = async ({ params }: PreviewPageProps) => {
  const { slug: slugSegments } = await params;
  // will come in here as segments of a relative path to the document
  // ex: ['authentication', 'verify-password.tsx']
  const slug = slugSegments.join('/');
  const documentsDirMetadata = await getDocumentsDirectoryMetadata(
    documentsDirectoryAbsolutePath,
  );

  if (typeof documentsDirMetadata === 'undefined') {
    throw new Error(
      `Could not find the documents directory specified under ${documentsDirectoryAbsolutePath}!

This is most likely not an issue with the preview server. Maybe there was a typo on the "--dir" flag?`,
    );
  }

  let documentPath: string;
  try {
    documentPath = await getDocumentPathFromSlug(slug);
  } catch (exception) {
    if (exception instanceof Error) {
      console.warn(exception.message);
      redirect('/');
    }
    throw exception;
  }

  const schema = await getDocumentSchema(documentPath);
  const documentRenderingResult = await renderDocumentByPath(documentPath);

  if (
    'error' in documentRenderingResult &&
    process.env.NEXT_PUBLIC_IS_BUILDING === 'true'
  ) {
    throw new Error(documentRenderingResult.error.message, {
      cause: documentRenderingResult.error,
    });
  }

  return (
    // This suspense is so that this page doesn't throw warnings
    // on the build of the preview server de-opting into
    // client-side rendering on build
    <Suspense fallback={<Home />}>
      <Preview
        documentPath={documentPath}
        pathSeparator={path.sep}
        renderingResult={documentRenderingResult}
        slug={slug}
        schema={schema}
      />
    </Suspense>
  );
};

export async function generateMetadata({ params }: PreviewPageProps) {
  const { slug } = await params;
  return { title: `${path.basename(slug.join('/'))} — htmldocs` };
}

export default Page;
