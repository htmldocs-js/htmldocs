"use client";
import * as React from "react";
import { Sidebar } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { useDocuments } from "~/contexts/documents";
import ContextEditorModal from "./context-editor-modal";
import { toast } from "sonner";

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
  const { renderDocumentToPDF, pageConfigs } = useDocuments();
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [isContextEditorOpen, setIsContextEditorOpen] = React.useState(false);

  const renderAndDownloadPDF = async () => {
    if (!markup) {
      toast.error("No markup available to generate PDF");
      return;
    }

    setIsDownloading(true);
    
    try {
      const pdfBuffer = await renderDocumentToPDF({ 
        url: window.location.href,
        html: markup,
        pageConfig: pageConfigs[documentPath]
      });
      
      if (pdfBuffer instanceof Error) {
        throw pdfBuffer;
      }

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
      toast.success("PDF downloaded successfully");
    } catch (error) {
      console.error("Error downloading document:", error);
      toast.error("Failed to generate PDF. Check the CLI logs for more details.");
    } finally {
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
        <Button 
          variant="secondary" 
          onClick={() => setIsContextEditorOpen(true)}
        >
          Fill & Generate
        </Button>
        <Button 
          variant="default" 
          onClick={renderAndDownloadPDF} 
          disabled={isDownloading}
        >
          {isDownloading ? "Downloading..." : "Download"}
        </Button>
      </div>

      <ContextEditorModal 
        documentPath={documentPath}
        documentSlug={currentDocumentOpenSlug}
        isOpen={isContextEditorOpen}
        onOpenChange={setIsContextEditorOpen}
      />
    </header>
  );
};
