import { Suspense } from 'react';
import path from 'node:path';
import fs from 'node:fs';
import { redirect } from 'next/navigation';
import { getDocumentPathFromSlug } from '~/actions/get-document-path-from-slug';
import { getDocumentsDirectoryMetadata } from '~/actions/get-documents-directory-metadata';
import { renderDocumentByPath } from '~/actions/render-document-by-path';
import { documentsDirectoryAbsolutePath } from '../../../utils/documents-directory-absolute-path';
import Home from '../../page';
import Preview from './preview';
import { DOCUMENT_SCHEMAS_DIR } from '../../../utils/paths';

export const dynamicParams = true;

export interface PreviewParams {
  slug: string[];
}

// Force this to be server-side rendered and not statically generated
export const dynamic = "force-dynamic";

const Page = async ({ params }: { params: PreviewParams }) => {
  // will come in here as segments of a relative path to the document
  // ex: ['authentication', 'verify-password.tsx']
  const slug = params.slug.join('/');
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

  // Load schema if it exists
  const baseName = path.basename(documentPath, path.extname(documentPath));
  const schemaPath = path.join(
    DOCUMENT_SCHEMAS_DIR,
    baseName,
    `${baseName}.schema.json`
  );
  
  let schema = null;
  try {
    if (fs.existsSync(schemaPath)) {
      const rawSchema = JSON.parse(await fs.promises.readFile(schemaPath, 'utf-8'));
      schema = rawSchema?.definitions?.ComponentProps || null;
    }
  } catch (error) {
    console.warn('Failed to load schema:', error);
  }

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

export function generateMetadata({ params }: { params: PreviewParams }) {
  return { title: `${path.basename(params.slug.join('/'))} — htmldocs` };
}

export default Page;