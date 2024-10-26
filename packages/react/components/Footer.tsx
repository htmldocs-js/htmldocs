import React from 'react';
import { useDocumentSettingsContext } from './DocumentContext';
import clsx from 'clsx';

interface FooterProps {
  /**
   * Content to display in the footer
   */
  children?: React.ReactNode;
  
  /**
   * Custom page number render function
   * Returns a React node that will receive the page counter element
   */
  renderPageNumber?: (pageCounter: React.ReactElement) => React.ReactNode;
  
  /**
   * Whether to show page numbers
   */
  showPageNumbers?: boolean;
  
  /**
   * Footer position. Defaults to 'bottom'
   */
  position?: 'bottom' | 'top';
  
  /**
   * Alignment of the footer content
   */
  align?: 'left' | 'center' | 'right';
  
  /**
   * Whether to show footer on even/odd pages only
   */
  pageType?: 'all' | 'even' | 'odd';
  
  /**
   * Custom CSS classes
   */
  className?: string;
  
  /**
   * Custom styles
   */
  style?: React.CSSProperties;
}

export const Footer: React.FC<FooterProps> = ({
  children,
  renderPageNumber,
  showPageNumbers = false,
  position = 'bottom',
  align = 'center',
  pageType = 'all',
  className,
  style
}) => {
  const { margin } = useDocumentSettingsContext();

  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    left: margin,
    right: margin,
    textAlign: align,
    ...style
  };

  if (position === 'bottom') {
    baseStyles.bottom = margin;
  } else {
    baseStyles.top = margin;
  }

  const defaultPageNumber = (pageCounter: React.ReactElement) => (
    <span className="page-number">
      Page {pageCounter}
    </span>
  );

  return (
    <div
      className={clsx('print-footer', className)}
      style={baseStyles}
    >
      <style>
        {`
          .print-footer {
            display: block !important;
          }
          
          .print-footer .page-number {
            display: ${showPageNumbers ? 'inline' : 'none'};
          }

          /* Print-specific styles */
          @media print {
            ${pageType === 'even' ? `
              @page:odd {
                .print-footer {
                  display: none !important;
                }
              }
            ` : pageType === 'odd' ? `
              @page:even {
                .print-footer {
                  display: none !important;
                }
              }
            ` : ''}
          }

          /* Screen preview shows page 1 */
          @media screen {
            .print-footer .page-counter::after {
              content: '1';
            }
          }

          /* Print mode uses actual page counter */
          @media print {
            .print-footer .page-counter::after {
              content: counter(page);
            }
          }
        `}
      </style>
      {children}
      {showPageNumbers && (
        (renderPageNumber || defaultPageNumber)(
          <span className="page-counter" />
        )
      )}
    </div>
  );
};

export default Footer;
