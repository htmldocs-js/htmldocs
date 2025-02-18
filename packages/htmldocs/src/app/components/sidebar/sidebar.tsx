'use client';

import * as React from 'react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { cn } from '~/lib/utils';
import { SidebarDirectoryChildren } from './sidebar-directory-children';
import { useDocuments } from '~/contexts/documents';
import { Logo } from '../logo';
import ThemeToggle from '../theme-toggle';
import { Button } from '../ui/button';
import { X } from '@phosphor-icons/react';
import { VERSION } from '~/lib/version';

const VERSION_CHECK_INTERVAL = 1000 * 60 * 60 * 24; // Check once per day

const compareVersions = (v1: string, v2: string): number => {
  // Split version string at '-' to separate main version from prerelease (if any)
  const [main1, pre1] = v1.split('-');
  const [main2, pre2] = v2.split('-');
  
  // Split main version into major, minor, patch numbers
  const parts1 = main1?.split('.').map(Number) ?? [];
  const parts2 = main2?.split('.').map(Number) ?? [];
  
  // Compare major, minor, and patch values
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const num1 = parts1[i] || 0;
    const num2 = parts2[i] || 0;
    if (num1 !== num2) {
      return num1 - num2;
    }
  }
  
  // If the numeric (stable) parts are equal, handle prerelease parts.
  // A version without a prerelease is considered greater than one with a prerelease.
  if (pre1 && !pre2) {
    return -1;
  } else if (!pre1 && pre2) {
    return 1;
  } else if (pre1 && pre2) {
    // Lexicographical comparison for prerelease strings.
    if (pre1 === pre2) return 0;
    return pre1 > pre2 ? 1 : -1;
  }
  
  return 0;
};

const useVersionCheck = () => {
  const [newVersion, setNewVersion] = React.useState<string | null>(null);

  React.useEffect(() => {
    const checkVersion = async () => {
      try {
        const response = await fetch('https://registry.npmjs.org/htmldocs/latest');
        const data = await response.json();
        const latestVersion = data.version;

        // If a latestVersion is available and it is greater than our current version, set it as new.
        if (latestVersion && compareVersions(latestVersion, VERSION) > 0) {
          setNewVersion(latestVersion);
        }
      } catch (error) {
        console.error('Failed to check for new version:', error);
      }
    };

    // Check immediately
    checkVersion();

    // Set up interval for periodic checks
    const interval = setInterval(checkVersion, VERSION_CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return newVersion;
};

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
  const newVersion = useVersionCheck();
  const [isDismissed, setIsDismissed] = React.useState(false);

  return (
    <aside
      className={cn('border-r flex flex-col border-slate-6', className)}
      style={{ ...style }}
    >
      <div className="p-4 h-[70px] w-full flex-shrink items-center justify-between hidden lg:flex">
        <Logo />
        <ThemeToggle />
      </div>
      <nav className="p-4 flex-grow lg:pt-0 pl-0 w-screen h-[calc(100vh_-_70px)] lg:w-full lg:min-w-[275px] lg:max-w-[275px] flex flex-col overflow-y-auto justify-between">
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
        {newVersion && !isDismissed && (
          <div className="ml-4 p-2 bg-secondary flex items-center justify-between border border-border rounded-md">
            <div>
              <p className="text-xs text-foreground">
                New version (
                <a 
                  href="https://www.npmjs.com/package/htmldocs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {newVersion}
                </a>
                ) available
              </p>
              <p className="text-xs text-muted-foreground">
                npm install -g htmldocs@latest
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsDismissed(true)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </nav>
    </aside>
  );
};