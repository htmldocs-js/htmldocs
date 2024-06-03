"use server"

import { LaunchOptions, chromium } from 'playwright';

interface RenderDocumentToPDFProps extends LaunchOptions {
    url: string;
}

export const renderDocumentToPDF = async ({ url, ...props }: RenderDocumentToPDFProps): Promise<Buffer | Error> => {
  const browser = await chromium.launch({
    ...props,
  });
  try {
    const page = await browser.newPage();
    await page.goto(url);
    const pdfBuffer = await page.pdf({
        format: 'A4',
    });
    await browser.close();

    return pdfBuffer;
  } catch (error) {
    await browser.close();
    return new Error(`Failed to generate PDF: ${error.message}`);
  }
};
