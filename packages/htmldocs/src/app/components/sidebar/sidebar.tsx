'use client';

import * as React from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { cn } from '~/lib/utils';
import { SidebarDirectoryChildren } from './sidebar-directory-children';
import { useDocuments } from '~/contexts/documents';

interface SidebarProps {
  className?: string;
  currentDocumentOpenSlug?: string;
  style?: React.CSSProperties;
}

export const Sidebar = ({
  className,
  currentDocumentOpenSlug,
  style,
}: SidebarProps) => {
  const { documentsDirectoryMetadata } = useDocuments();

  return (
    <aside
      className={cn('border-r flex flex-col border-slate-6', className)}
      style={{ ...style }}
    >
      <div className="p-4 h-[70px] flex-shrink items-center hidden lg:flex">
        htmldocs
      </div>
      <nav className="p-4 flex-grow lg:pt-0 pl-0 w-screen h-[calc(100vh_-_70px)] lg:w-full lg:min-w-[275px] lg:max-w-[275px] flex flex-col overflow-y-auto">
        <Collapsible.Root>
          <React.Suspense>
            <SidebarDirectoryChildren
              currentDocumentOpenSlug={currentDocumentOpenSlug}
              documentsDirectoryMetadata={documentsDirectoryMetadata}
              isRoot
              open
            />
          </React.Suspense>
        </Collapsible.Root>
      </nav>
    </aside>
  );
};