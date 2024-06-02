"use server"

import { chromium } from 'playwright';

export const renderDocumentToPDF = async (url: string): Promise<Buffer | Error> => {
  const browser = await chromium.launch();
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
