import React from 'react';
import clsx from 'clsx';
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
                ${Object.entries(marginBoxStyles || {}).map(([key, value]) =>
                  `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`
                ).join('\n')}
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

            /* Page counter styles */
            .print-footer .page-counter::after {
              content: counter(page);
            }
            
            .print-footer .pages-counter::after {
              content: counter(pages);
            }

            /* Hide page numbers if not using function children */
            .print-footer .page-number {
              display: ${typeof children === 'function' ? 'inline' : 'none'};
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
        {typeof children === 'function' 
          ? children({
              currentPage: <span className="page-counter" />,
              totalPages: <span className="pages-counter" />
            })
          : children}
      </div>
    </>
  );
};

export default Footer;
