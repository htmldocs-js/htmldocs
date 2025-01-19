import React from 'react';
import MarginBox, { MarginBoxPosition } from './MarginBox';
import Head from './Head';

interface FooterProps {
  /**
   * Content to render in the footer.
   * Can be either:
   * - A function that receives current page and total pages
   * - A ReactNode for static content
   */
  children?: ((params: { 
    currentPage: React.ReactElement, 
    totalPages: React.ReactElement 
  }) => React.ReactNode) | React.ReactNode;
  
  /**
   * Footer position. Defaults to 'bottom-center'
   */
  position?: MarginBoxPosition;
  
  /**
   * Whether to show footer on even/odd/blank pages
   */
  pageType?: 'all' | 'even' | 'odd' | 'blank';
  
  /**
   * Custom CSS classes
   */
  className?: string;
  
  /**
   * Custom styles
   */
  style?: React.CSSProperties;
  
  /**
   * Optional styling for the position element
   */
  marginBoxStyles?: React.CSSProperties;
}

export const Footer: React.FC<FooterProps> = ({
  children = ({ currentPage, totalPages }) => (
    <span className="page-number">
      Page {currentPage} of {totalPages}
    </span>
  ),
  position = 'bottom-center',
  pageType = 'all',
  className,
  style,
  marginBoxStyles,
}) => {
  const footerStyles = `
    ${style ? Object.entries(style).map(([key, value]) => 
      `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`
    ).join('\n') : ''}
    
    .page-counter::after {
      content: counter(page);
    }
    
    .pages-counter::after {
      content: counter(pages);
    }
    
    .page-number {
      display: ${typeof children === 'function' ? 'inline' : 'none'};
    }
  `;

  return (
    <>
      <Head>
        <style>
          {footerStyles}
        </style>
      </Head>
      <MarginBox
        position={position}
        pageType={pageType}
        className={className}
        marginBoxStyles={marginBoxStyles}
        runningName="print-footer"
      >
        {typeof children === 'function' 
          ? children({
              currentPage: <span className="page-counter" />,
              totalPages: <span className="pages-counter" />
            })
          : children}
      </MarginBox>
    </>
  );
};

export default Footer;
