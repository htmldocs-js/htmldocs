import Head from "./Head";

const sizes = ["A3", "A4", "A5", "letter", "legal"];
const orientations = ["portrait", "landscape"];

interface Props {
  size: (typeof sizes)[number];
  orientation: (typeof orientations)[number];
  margin?: React.CSSProperties["margin"];
  children: React.ReactNode;
}

const Document: React.FC<Props> = ({ size, orientation, margin, children }) => {
  const formatMargin = (value: React.CSSProperties["margin"]) => 
    typeof value === 'string' ? value : `${value}px`;

  return (
    <>
      <Head>
        <style>
          {`
            @page {
              size: ${size} ${orientation};
              margin: ${formatMargin(margin || '0.39in')};
            }
          `}
        </style>
      </Head>
      {children}
    </>
  );
};

export default Document;
