import { Suspense } from 'react';
import path from 'node:path';
import { renderDocumentByPath } from '~/actions/render-document-by-path';
import { documentsDirectoryAbsolutePath } from "../utils/documents-directory-absolute-path";
import { getDocumentSchema } from '~/actions/get-document-schema';
import Preview from './preview/[...slug]/preview';

// Force this to be server-side rendered and not statically generated
export const dynamic = "force-dynamic";

const Home = async () => {
  // 直接渲染 Index.tsx 文件
  const indexPath = path.join(documentsDirectoryAbsolutePath, 'templates', 'Index.tsx');
  
  try {
    const schema = await getDocumentSchema(indexPath);
    const documentRenderingResult = await renderDocumentByPath(indexPath);

    if ('error' in documentRenderingResult) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error rendering Index.tsx</h2>
            <p className="text-gray-600 mb-4">{documentRenderingResult.error.message}</p>
            <p className="text-sm text-gray-500">Please check your Index.tsx file for syntax errors.</p>
          </div>
        </div>
      );
    }

    return (
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">Loading Index.tsx...</div>
        </div>
      }>
        <Preview
          documentPath={indexPath}
          pathSeparator={path.sep}
          renderingResult={documentRenderingResult}
          slug="templates/Index.tsx"
          schema={schema}
          isSimplified={true}
        />
      </Suspense>
    );
  } catch (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Index.tsx not found</h2>
          <p className="text-gray-600 mb-4">Please create an Index.tsx file in the templates directory.</p>
          <p className="text-sm text-gray-500">Path: {indexPath}</p>
        </div>
      </div>
    );
  }
}

export default Home;

