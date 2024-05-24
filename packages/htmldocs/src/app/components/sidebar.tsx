"use client"

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { useDocuments } from "~/contexts/documents";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const { documentsDirectoryMetadata } = useDocuments();
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            htmldocs
          </h2>
          <div className="space-y-1">
            {documentsDirectoryMetadata.documentFilenames.map((filename) => (
              <Button
                key={filename}
                variant="secondary"
                className="w-full justify-start"
              >
                {filename}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
