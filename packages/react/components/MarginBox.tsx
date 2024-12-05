import React from 'react';
import clsx from 'clsx';
import Head from './Head';

export type MarginBoxPosition = 
  'top-left-corner' | 'top-left' | 'top-center' | 'top-right' | 'top-right-corner' | 
  'left-top' | 'left-middle' | 'left-bottom' | 'right-top' | 'right-middle' | 'right-bottom' |
  'bottom-left-corner' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'bottom-right-corner';

interface MarginBoxProps {
  children: React.ReactNode;
  position: MarginBoxPosition;
  pageType?: 'all' | 'even' | 'odd' | 'blank';
  className?: string;
  style?: React.CSSProperties;
  marginBoxStyles?: React.CSSProperties;
  runningName: string;
}

export const MarginBox: React.FC<MarginBoxProps> = ({
  children,
  position,
  pageType = 'all',
  className,
  style,
  marginBoxStyles,
  runningName,
}) => {
  return (
    <>
      <Head>
        <style>
          {`
            /* Set up running element */
            .${runningName} {
              position: running(${runningName});
            }

            /* Apply to specified margin box */
            @page {
              @${position} {
                content: element(${runningName});
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

            /* Default alignments based on position */
            .${runningName} {
              ${position.includes('left') ? 'text-align: left;' : 
                position.includes('right') ? 'text-align: right;' : 
                'text-align: center;'}
              
              ${position.includes('top') ? 'vertical-align: top;' :
                position.includes('bottom') ? 'vertical-align: bottom;' :
                'vertical-align: middle;'}

              ${Object.entries(style || {}).map(([key, value]) => 
                `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`
              ).join('\n')}
            }
          `}
        </style>
      </Head>

      <div className={clsx(runningName, className)}>
        {children}
      </div>
    </>
  );
};

export default MarginBox; 