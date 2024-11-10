import React from 'react';
import clsx from 'clsx';
import Head from './Head';

interface FooterProps {
  /**
   * Content to display in the footer
   */
  children?: React.ReactNode;
  
  /**
   * Custom page number render function
   */
  renderPageNumber?: (pageCounter: React.ReactElement) => React.ReactNode;
  
  /**
   * Whether to show page numbers
   */
  showPageNumbers?: boolean;
  
  /**
   * Footer position. Defaults to 'bottom-center'
   */
  position?: 'top-left-corner' | 'top-left' | 'top-center' | 'top-right' | 'top-right-corner' | 
    'left-top' | 'left-middle' | 'left-bottom' | 'right-top' | 'right-middle' | 'right-bottom' |
    'bottom-left-corner' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'bottom-right-corner';
  
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
}

export const Footer: React.FC<FooterProps> = ({
  children,
  renderPageNumber,
  showPageNumbers = false,
  position = 'bottom-center',
  pageType = 'all',
  className,
  style
}) => {
  // Default page number renderer
  const defaultPageNumber = (pageCounter: React.ReactElement) => (
    <span className="page-number">
      Page <span className="pagedjs-page-counter"></span> of <span className="pagedjs-pages-counter"></span>
    </span>
  );

  return (
    <>
      <Head>
        <style>
          {`
            /* Set up running footer element */
            .print-footer {
              position: running(footer);
            }

            /* Apply footer to specified margin box */
            @page {
              @${position} {
                content: element(footer);
              }
            }

            /* Page type specific styles */
            ${pageType === 'even' ? `
              @page:odd {
                @${position} { content: none; }
              }
            ` : pageType === 'odd' ? `
              @page:even {
                @${position} { content: none; }
              }
            ` : pageType === 'blank' ? `
              @page:blank {
                @${position} { content: none; }
              }
            ` : ''}

            /* Hide page numbers if not enabled */
            .print-footer .page-number {
              display: ${showPageNumbers ? 'inline' : 'none'};
            }

            /* Default margin box alignments based on position */
            .print-footer {
              ${position.includes('left') ? 'text-align: left;' : 
                position.includes('right') ? 'text-align: right;' : 
                'text-align: center;'}
              
              ${position.includes('top') ? 'vertical-align: top;' :
                position.includes('bottom') ? 'vertical-align: bottom;' :
                'vertical-align: middle;'}
            }

            /* Apply custom styles */
            .print-footer {
              ${Object.entries(style || {}).map(([key, value]) => 
                `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`
              ).join('\n')}
            }
          `}
        </style>
      </Head>

      <div className={clsx('print-footer', className)}>
        {children}
        {showPageNumbers && (
          (renderPageNumber || defaultPageNumber)(
            <span className="pagedjs-page-counter" />
          )
        )}
      </div>
    </>
  );
};

export default Footer;
