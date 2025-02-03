import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Spinner, DownloadSimple, Asterisk } from "@phosphor-icons/react";
import ContextEditor from "~/components/context-editor";
import { useDocumentContext } from "~/contexts/document-context";
import { toast } from "sonner";
import { renderDocumentByPath } from "~/actions/render-document-by-path";
import { renderDocumentToPDF } from "~/actions/render-document-to-pdf";
import { useDocuments } from '~/contexts/documents';

interface ContextEditorModalProps {
  documentSlug: string;
  documentPath: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContextEditorModal: React.FC<ContextEditorModalProps> = ({
  documentSlug,
  documentPath,
  isOpen,
  onOpenChange,
}) => {
  const { pageConfigs } = useDocuments();
  const { documentSchema, documentContext, resetDocumentContext } = useDocumentContext();
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    setGenerating(false);
  }, [documentSlug]);

  const isFormValid = useMemo(() => {
    if (!documentSchema || !documentSchema.properties) return true;
    
    const checkRequiredFields = (schema: any, context: any): boolean => {
      if (!schema.properties) return true;
      
      const requiredFields = schema.required || [];
      if (requiredFields.length === 0) return true;
      
      return requiredFields.every(field => {
        const fieldSchema = schema.properties[field];
        const value = context?.[field];

        if (fieldSchema.type === 'object') {
          return checkRequiredFields(fieldSchema, value);
        } else if (fieldSchema.type === 'array' && fieldSchema.items) {
          return Array.isArray(value) && (value.length === 0 || 
                 value.every(item => checkRequiredFields(fieldSchema.items, item)));
        } else {
          return value !== undefined && value !== null && value !== '';
        }
      });
    };

    return checkRequiredFields(documentSchema, documentContext.document);
  }, [documentSchema, documentContext]);

  const onGenerateDocument = async () => {
    setGenerating(true);
    try {
      // First render the document to HTML
      const renderResult = await renderDocumentByPath(
        documentPath,
        documentContext.document
      );

      if ('error' in renderResult) {
        throw new Error(`Failed to render document: ${renderResult.error.message}`);
      }

      // Then generate PDF from the rendered HTML
      const pdfBuffer = await renderDocumentToPDF({
        url: window.location.href,
        html: renderResult.markup,
        pageConfig: pageConfigs[documentPath]
      });

      if (pdfBuffer instanceof Error) {
        throw pdfBuffer;
      }

      const buffer = new Uint8Array(pdfBuffer);
      const blob = new Blob([buffer], { type: "application/pdf" });
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${documentSlug || 'document'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      
      setGenerating(false);
    } catch (error) {
      console.error('Error generating document:', error);
      toast.error("Failed to generate the document. Please try again.");
      setGenerating(false);
    }
  };

  const handleResetFields = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all fields? This action cannot be undone.')) {
      resetDocumentContext();
    }
  }, [resetDocumentContext]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Fill Document</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col flex-1 min-h-0 h-full">
          <div className="flex items-center justify-end bg-muted/50 -mx-6">
            <div className="px-6 py-2 text-sm text-muted-foreground">
              Want to generate documents via API?
              <a 
                href="https://htmldocs.com/signup" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline ml-1"
              >
                Sign up for an account
              </a>
            </div>
          </div>
          <div className="h-px bg-secondary w-full" />
          <div className="py-4 overflow-y-auto flex-1 min-h-0 h-full pr-4 w-[calc(100%+1rem)]">
            {documentSchema ? <ContextEditor /> : <p>Loading schema...</p>}
          </div>
          <div className="h-px bg-secondary w-full" />
        </div>
        <DialogFooter className="flex items-center sm:justify-between w-full">
          <div className="flex justify-start items-center text-xs text-muted-foreground mt-2">
            <sup>
              <Asterisk className="inline-block w-2 h-2 mr-1" />
            </sup>
            indicates required field
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={handleResetFields}
            >
              Reset
            </Button>
            <Button onClick={onGenerateDocument} disabled={generating || !isFormValid}>
              {generating ? (
                <>
                  <Spinner className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <DownloadSimple className="mr-2 h-4 w-4" weight="bold" />
                  Generate & Download
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContextEditorModal;
