'use client';

import { usePathname } from 'next/navigation';
import { Shell } from '~/components/shell';

const PREVIEW_PATH_PREFIX = '/preview/';

const PreviewLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const currentDocumentOpenSlug = pathname.startsWith(PREVIEW_PATH_PREFIX)
    ? decodeURIComponent(pathname.slice(PREVIEW_PATH_PREFIX.length))
    : undefined;

  return (
    <Shell
      currentDocumentOpenSlug={currentDocumentOpenSlug}
      pathSeparator="/"
      preserveChildrenState
    >
      {children}
    </Shell>
  );
};

export default PreviewLayout;
