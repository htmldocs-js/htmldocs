import { useState, useContext, createContext } from "react";

export type DocumentSettings = {
  pageSize: string;
  orientation: string;
  margin: React.CSSProperties["margin"];
  background: string;
};

export type TDocumentContextValue = {
  pageSize: string;
  setPageSize: (size: string) => void;
  orientation: string;
  setOrientation: (orientation: string) => void;
  margin: React.CSSProperties["margin"];
  setMargin: (margin: React.CSSProperties["margin"]) => void;
  background: string;
  setBackground: (background: string) => void;
};

const useDocumentSettings = (defaults?: Partial<DocumentSettings>): TDocumentContextValue => {
  const [pageSize, setPageSize] = useState<string>(defaults?.pageSize || 'A4');
  const [orientation, setOrientation] = useState<string>(defaults?.orientation || 'portrait');
  const [margin, setMargin] = useState<React.CSSProperties["margin"]>(defaults?.margin || '0.39in');
  const [background, setBackground] = useState<string>(defaults?.background || 'white');

  return {
    pageSize,
    setPageSize,
    orientation,
    setOrientation,
    margin,
    setMargin,
    background,
    setBackground,
  };
};

export const DocumentContext: React.Context<TDocumentContextValue> = createContext(
  undefined as unknown as TDocumentContextValue
);

export const DocumentContextProvider: React.FC<{ children: React.ReactNode, defaults?: Partial<DocumentSettings> }> = ({
  children,
  defaults,
}) => {
  const documentSettings: TDocumentContextValue = useDocumentSettings(defaults);

  return (
    <DocumentContext.Provider value={documentSettings}>{children}</DocumentContext.Provider>
  );
};

export const useDocumentSettingsContext = () => useContext(DocumentContext);
