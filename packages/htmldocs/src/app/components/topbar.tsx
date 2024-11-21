"use client";
import * as React from "react";
import { Sidebar } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { useDocuments } from "~/contexts/documents";

interface TopbarProps {
  documentPath: string;
  currentDocumentOpenSlug: string;
  pathSeparator: string;
  activeView?: string;
  markup?: string;
  onToggleSidebar?: () => void;
  setActiveView?: (view: string) => void;
}

export const Topbar: React.FC<Readonly<TopbarProps>> = ({
  documentPath,
  currentDocumentOpenSlug,
  pathSeparator,
  markup,
  activeView,
  setActiveView,
  onToggleSidebar,
}) => {
  const { renderDocumentToPDF, documentSizes } = useDocuments();
  const [isDownloading, setIsDownloading] = React.useState(false);

  const renderAndDownloadPDF = async () => {
    setIsDownloading(true);
    const pdfBuffer = await renderDocumentToPDF({ 
      url: window.location.href,
      size: documentSizes[documentPath]
    });
    if (pdfBuffer instanceof Error) {
      console.error("Error downloading document:", pdfBuffer.message);
      setIsDownloading(false);
    } else {
      // Ensure the buffer is in the correct type
      const buffer = new Uint8Array(pdfBuffer);
      const blob = new Blob([buffer], { type: "application/pdf" });
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "document.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
      setIsDownloading(false);
    }
  };

  return (
    <header className="flex relative items-center px-4 justify-between h-[70px] hidden lg:flex border-b border-border">
      <Button
        className="group"
        variant="ghost"
        size="icon"
        onClick={() => {
          if (onToggleSidebar) {
            onToggleSidebar();
          }
        }}
      >
        <Sidebar height={20} width={20} className="text-muted-foreground group-hover:text-foreground transition-colors duration-150"/>
      </Button>
      <div className="items-center overflow-hidden hidden lg:flex text-center absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
        <h2 className="truncate text-sm font-medium text-foreground">
          {currentDocumentOpenSlug.split(pathSeparator).pop()}
        </h2>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary">
          Fill & Generate
        </Button>
        <Button variant="default" onClick={renderAndDownloadPDF} disabled={isDownloading}>
          {isDownloading ? "Downloading..." : "Download"}
        </Button>
      </div>
    </header>
  );
};
