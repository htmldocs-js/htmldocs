import { DocumentContextProvider } from "./DocumentContext";

const sizes = ["A3", "A4", "A5", "letter", "legal"];
const orientations = ["portrait", "landscape"];

interface Props {
  size: (typeof sizes)[number];
  orientation: (typeof orientations)[number];
  margin?: React.CSSProperties["margin"];
  children: React.ReactNode;
}

const Document: React.FC<Props> = ({ size, orientation, margin, children }) => {
  return (
    <DocumentContextProvider defaults={{ pageSize: size, orientation, margin }}>
      <main
        className={`${size} ${orientation}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {children}
      </main>
    </DocumentContextProvider>
  );
};

export default Document;
