import Head from "./Head";
import Footer from "./Footer";
import React from "react";

const sizes = ["A3", "A4", "A5", "letter", "legal"] as const;
const orientations = ["portrait", "landscape"] as const;
type Unit = 'in' | 'cm' | 'mm' | 'px';
type SizeType = (typeof sizes)[number] | 
  `${number}${Unit} ${number}${Unit}`;

interface Props {
  size: SizeType;
  orientation: (typeof orientations)[number];
  margin?: React.CSSProperties["margin"];
  children: React.ReactNode;
}

const Document: React.FC<Props> = ({ size, orientation, margin, children }) => {
  const formatMargin = (value: React.CSSProperties["margin"]) => 
    typeof value === 'string' ? value : `${value}px`;

  // Format size to handle both preset and custom sizes
  const formatSize = (size: SizeType) => {
    return sizes.includes(size as typeof sizes[number]) ? size : `${size}`;
  };

  // Convert children to array for manipulation
  const childrenArray = React.Children.toArray(children);
  
  // Find footer and non-footer children
  const footerChild = childrenArray.find(
    child => React.isValidElement(child) && child.type === Footer
  );
  const otherChildren = childrenArray.filter(
    child => !(React.isValidElement(child) && child.type === Footer)
  );

  // Reorder children with footer first if it exists
  // @see https://stackoverflow.com/questions/68588367/paged-js-paged-content-footer-appears-only-on-the-last-page-top-title-works
  const reorderedChildren = footerChild 
    ? [footerChild, ...otherChildren]
    : childrenArray;

  return (
    <>
      <Head>
        <style>
          {`
            @page {
              size: ${formatSize(size)} ${orientation};
              margin: ${formatMargin(margin || '0.39in')};
            }
          `}
        </style>
      </Head>
      {reorderedChildren}
    </>
  );
};

export default Document;
