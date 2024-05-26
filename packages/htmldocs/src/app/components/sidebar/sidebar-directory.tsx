'use client';
import * as Collapsible from '@radix-ui/react-collapsible';
import * as React from 'react';
import { cn } from '~/lib/utils';
import {
  documentsDirectoryAbsolutePath,
  pathSeparator,
} from '../../../utils/documents-directory-absolute-path';
import { type DocumentsDirectory } from '~/actions/get-documents-directory-metadata';
import { IconFolder } from '../icons/icon-folder';
import { IconFolderOpen } from '../icons/icon-folder-open';
import { IconArrowDown } from '../icons/icon-arrow-down';
import { SidebarDirectoryChildren } from './sidebar-directory-children';

interface SidebarDirectoryProps {
  documentsDirectoryMetadata: DocumentsDirectory;
  className?: string;
  currentDocumentOpenSlug?: string;
}

const persistedOpenDirectories = new Set<string>();

export const SidebarDirectory = ({
  documentsDirectoryMetadata: directoryMetadata,
  className,
  currentDocumentOpenSlug,
}: SidebarDirectoryProps) => {
  const isBaseDocumentsDirectory =
    directoryMetadata.absolutePath === documentsDirectoryAbsolutePath;
  const directoryPathRelativeToBaseDocumentsDirectory =
    directoryMetadata.absolutePath
      .replace(`${documentsDirectoryAbsolutePath}${pathSeparator}`, '')
      .replace(documentsDirectoryAbsolutePath, '')
      .trim();
  const doesDirectoryContainCurrentDocumentOpen = currentDocumentOpenSlug
    ? currentDocumentOpenSlug.includes(directoryPathRelativeToBaseDocumentsDirectory)
    : false;

  const isEmpty =
    directoryMetadata.documentFilenames.length > 0 ||
    directoryMetadata.subDirectories.length > 0;

  const [open, setOpen] = React.useState(
    persistedOpenDirectories.has(directoryMetadata.absolutePath) ||
      isBaseDocumentsDirectory ||
      doesDirectoryContainCurrentDocumentOpen,
  );

  return (
    <Collapsible.Root
      className={cn('group', className)}
      data-root={isBaseDocumentsDirectory}
      onOpenChange={(isOpening) => {
        if (isOpening) {
          persistedOpenDirectories.add(directoryMetadata.absolutePath);
        } else {
          persistedOpenDirectories.delete(directoryMetadata.absolutePath);
        }

        setOpen(isOpening);
      }}
      open={open}
    >
      <Collapsible.Trigger
        className={cn(
          'text-[14px] flex items-center font-medium gap-2 justify-between w-full my-1',
          {
            'cursor-pointer': !isEmpty,
          },
        )}
      >
        <div className="flex items-center text-slate-11 transition ease-in-out duration-200 hover:text-slate-12 gap-1">
          {open ? (
            <IconFolderOpen height="24" width="24" />
          ) : (
            <IconFolder height="24" width="24" />
          )}
          <h3 className="transition ease-in-out duration-200 hover:text-slate-12">
            {directoryMetadata.directoryName}
          </h3>
        </div>
        {isEmpty ? (
          <IconArrowDown
            className="data-[open=true]:rotate-180 transition-transform opacity-60 justify-self-end"
            data-open={open}
          />
        ) : null}
      </Collapsible.Trigger>

      {isEmpty ? (
        <SidebarDirectoryChildren
          currentDocumentOpenSlug={currentDocumentOpenSlug}
          documentsDirectoryMetadata={directoryMetadata}
          open={open}
        />
      ) : null}
    </Collapsible.Root>
  );
};