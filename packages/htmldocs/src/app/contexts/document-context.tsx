import React, { createContext, useContext, useState } from 'react';
import { JSONSchema7 } from 'json-schema';
import logger from '~/lib/logger';

interface DocumentContextValue {
  documentSchema: JSONSchema7;
  documentContext: Record<string, any>;
  setDocumentContext: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  updateDocumentContext: (path: string, value: any) => void;
  resetDocumentContext: () => void;
}

const DocumentContext = createContext<DocumentContextValue | undefined>(undefined);

export const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocumentContext must be used within a DocumentContextProvider');
  }
  return context;
};

interface DocumentContextProviderProps {
  children: React.ReactNode;
  initialDocumentPreviewProps: Record<string, any>;
  initialDocumentSchema: JSONSchema7;
}

export const DocumentContextProvider: React.FC<DocumentContextProviderProps> = ({ 
  children, 
  initialDocumentPreviewProps, 
  initialDocumentSchema,
}) => {
  const [documentContext, setDocumentContext] = useState<Record<string, any>>({ document: initialDocumentPreviewProps || {} });

  logger.debug("Initial document context:", documentContext);

  const updateDocumentContext = (path: string, newValue: any) => {
    const pathParts = path.split('.');
    const lastKey = pathParts.pop();
    let subContext = { ...documentContext };
    let current = subContext;

    for (const part of pathParts) {
      if (!current[part]) current[part] = {};
      current = current[part];
    }

    if (lastKey) {
      current[lastKey] = newValue;
    }

    setDocumentContext(subContext);
  };

  const resetDocumentContext = () => {
    setDocumentContext(() => ({ 
      document: JSON.parse(JSON.stringify(initialDocumentPreviewProps || {})) 
    }));
  };

  const value: DocumentContextValue = {
    documentSchema: initialDocumentSchema,
    documentContext,
    setDocumentContext,
    updateDocumentContext,
    resetDocumentContext,
  };

  return <DocumentContext.Provider value={value}>{children}</DocumentContext.Provider>;
};