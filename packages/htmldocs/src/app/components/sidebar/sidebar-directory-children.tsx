import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import * as Collapsible from '@radix-ui/react-collapsible';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { DocumentsDirectory } from '~/actions/get-documents-directory-metadata';
import {
  documentsDirectoryAbsolutePath,
  pathSeparator,
} from '../../../utils/documents-directory-absolute-path';
import { cn } from '~/lib/utils';
import { IconFile } from '../icons/icon-file';
import { SidebarDirectory } from './sidebar-directory';

export const SidebarDirectoryChildren = (props: {
  documentsDirectoryMetadata: DocumentsDirectory;
  currentDocumentOpenSlug?: string;
  open: boolean;
  isRoot?: boolean;
}) => {
  const searchParams = useSearchParams();
  const directoryPathRelativeToDocumentsDirectory =
    props.documentsDirectoryMetadata.absolutePath
      .replace(`${documentsDirectoryAbsolutePath}${pathSeparator}`, '')
      .replace(documentsDirectoryAbsolutePath, '')
      .trim();
  const isBaseDocumentsDirectory =
    props.documentsDirectoryMetadata.absolutePath === documentsDirectoryAbsolutePath;

  return (
    <AnimatePresence initial={false}>
      {props.open ? (
        <Collapsible.Content
          asChild
          className="relative data-[root=true]:mt-2 overflow-y-hidden pl-1"
          forceMount
        >
          <motion.div
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
          >
            {props.isRoot ? null : (
              <div className="line absolute left-2.5 w-px h-full bg-slate-6" />
            )}

            <div className="data-[root=true]:py-2 flex flex-col truncate">
              <LayoutGroup id="sidebar">
                {props.documentsDirectoryMetadata.subDirectories.map(
                  (subDirectory) => (
                    <SidebarDirectory
                      className="pl-4 py-0"
                      currentDocumentOpenSlug={props.currentDocumentOpenSlug}
                      documentsDirectoryMetadata={subDirectory}
                      key={subDirectory.absolutePath}
                    />
                  ),
                )}

                {props.documentsDirectoryMetadata.documentFilenames.map(
                  (documentFilename, index) => {
                    const documentSlug = `${directoryPathRelativeToDocumentsDirectory}${
                      !isBaseDocumentsDirectory ? pathSeparator : ''
                    }${documentFilename}`;
                    const removeExtensionFrom = (path: string) => {
                      if (
                        path.split('.').pop() === 'tsx' ||
                        path.split('.').pop() === 'jsx' ||
                        path.split('.').pop() === 'js'
                      ) {
                        return path.split('.').slice(0, -1).join('.');
                      }

                      return path;
                    };
                    const isCurrentPage = props.currentDocumentOpenSlug
                      ? removeExtensionFrom(props.currentDocumentOpenSlug) ===
                        documentSlug
                      : false;

                    return (
                      <Link
                        href={{
                          pathname: `/preview/${documentSlug}`,
                          search: searchParams.toString(),
                        }}
                        key={documentSlug}
                      >
                        <motion.span
                          animate={{ x: 0, opacity: 1 }}
                          className={cn(
                            'text-[14px] flex items-center align-middle pl-3 h-8 max-w-full rounded-md text-slate-11 relative transition-colors',
                            {
                              'text-cyan-11': isCurrentPage,
                              'hover:text-slate-12':
                                props.currentDocumentOpenSlug !== documentSlug,
                            },
                          )}
                          initial={{ x: -10 + -index * 1.5, opacity: 0 }}
                          transition={{
                            x: { delay: 0.03 * index, duration: 0.2 },
                            opacity: { delay: 0.03 * index, duration: 0.2 },
                          }}
                        >
                          {isCurrentPage ? (
                            <motion.span
                              animate={{ opacity: 1 }}
                              className="absolute left-0 right-0 top-0 bottom-0 rounded-md bg-cyan-5 opacity-0"
                              exit={{ opacity: 0 }}
                              initial={{ opacity: 0 }}
                            >
                              {!props.isRoot && (
                                <div className="bg-cyan-11 w-px absolute top-1 left-1.5 h-6" />
                              )}
                            </motion.span>
                          ) : null}
                          <IconFile
                            className="absolute left-4 w-[24px] h-[24px]"
                            height="24"
                            width="24"
                          />
                          <span className="truncate pl-8">{documentFilename}</span>
                        </motion.span>
                      </Link>
                    );
                  },
                )}
              </LayoutGroup>
            </div>
          </motion.div>
        </Collapsible.Content>
      ) : null}
    </AnimatePresence>
  );
};