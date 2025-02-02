"use server"

import { LaunchOptions, chromium } from 'playwright';
import logger from '~/lib/logger';
import { PageConfig, isStandardSize, parseCustomSize } from '~/lib/types';

export interface RenderDocumentToPDFProps extends LaunchOptions {
    url: string;
    html: string;
    pageConfig?: PageConfig;
}

export const renderDocumentToPDF = async ({ 
  url,
  html,
  pageConfig = { size: 'A4', orientation: 'portrait' }, 
  ...props 
}: RenderDocumentToPDFProps): Promise<Buffer | Error> => {
  const browser = await chromium.launch({
    ...props,
  });
  try {
    const page = await browser.newPage();

    // required due to support relative image paths
    await page.goto(url);

    // replace app contents with the html we want to render
    await page.setContent(html);
    await page.waitForLoadState('networkidle');

    logger.debug('pageConfig', pageConfig);

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
