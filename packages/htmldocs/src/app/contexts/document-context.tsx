import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { JSONSchema7 } from 'json-schema';
import logger from '~/lib/logger';

interface DocumentContextValue {
  documentSchema: JSONSchema7;
  documentContext: Record<string, any>;
  setDocumentContext: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  updateDocumentContext: (path: string, value: any) => void;
  resetDocumentContext: () => void;
}

const DocumentContext = createContext<DocumentContextValue | undefined>(
  undefined,
);

const updateValueAtPath = (
  source: Record<string, any> | any[],
  path: string[],
  value: any,
): Record<string, any> | any[] => {
  const [key, ...remainingPath] = path;

  if (typeof key === 'undefined') {
    return source;
  }

  const copy: any = Array.isArray(source) ? [...source] : { ...source };

  if (remainingPath.length === 0) {
    copy[key] = value;
    return copy;
  }

  const child = copy[key];
  const childSource =
    child && typeof child === 'object'
      ? child
      : /^\d+$/.test(remainingPath[0] ?? '')
        ? []
        : {};

  copy[key] = updateValueAtPath(childSource, remainingPath, value);
  return copy;
};

export const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error(
      'useDocumentContext must be used within a DocumentContextProvider',
    );
  }
  return context;
};

interface DocumentContextProviderProps {
  children: React.ReactNode;
  initialDocumentPreviewProps: Record<string, any>;
  initialDocumentSchema: JSONSchema7;
}

export const DocumentContextProvider: React.FC<
  DocumentContextProviderProps
> = ({ children, initialDocumentPreviewProps, initialDocumentSchema }) => {
  const [documentContext, setDocumentContext] = useState<Record<string, any>>(
    () => ({ document: initialDocumentPreviewProps || {} }),
  );

  useEffect(() => {
    logger.debug('Document context updated:', documentContext);
  }, [documentContext]);

  const updateDocumentContext = useCallback((path: string, newValue: any) => {
    const pathParts = path.split('.').filter(Boolean);

    if (pathParts.length === 0) return;

    setDocumentContext((currentContext) =>
      updateValueAtPath(currentContext, pathParts, newValue),
    );
  }, []);

  const resetDocumentContext = useCallback(() => {
    setDocumentContext({
      document: JSON.parse(JSON.stringify(initialDocumentPreviewProps || {})),
    });
  }, [initialDocumentPreviewProps]);

  const value = useMemo<DocumentContextValue>(
    () => ({
      documentSchema: initialDocumentSchema,
      documentContext,
      setDocumentContext,
      updateDocumentContext,
      resetDocumentContext,
    }),
    [
      documentContext,
      initialDocumentSchema,
      resetDocumentContext,
      updateDocumentContext,
    ],
  );

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};
