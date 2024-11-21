"use server"

import { LaunchOptions, chromium } from 'playwright';
import { PageConfig, isStandardSize, parseCustomSize } from '~/lib/types';

export interface RenderDocumentToPDFProps extends LaunchOptions {
    url: string;
    pageConfig?: PageConfig;
}

export const renderDocumentToPDF = async ({ 
  url, 
  pageConfig = { size: 'A4', orientation: 'portrait' }, 
  ...props 
}: RenderDocumentToPDFProps): Promise<Buffer | Error> => {
  const browser = await chromium.launch({
    ...props,
  });
  try {
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForLoadState('networkidle');

    console.debug('pageConfig', pageConfig);

    const pdfOptions = {
        printBackground: true,
        ...(isStandardSize(pageConfig.size) 
            ? { format: pageConfig.size } 
            : parseCustomSize(pageConfig.size)),
        landscape: pageConfig.orientation === 'landscape'
    };

    const pdfBuffer = await page.pdf(pdfOptions);
    await browser.close();

    return pdfBuffer;
  } catch (error) {
    await browser.close();
    return new Error(`Failed to generate PDF: ${error.message}`);
  }
};
