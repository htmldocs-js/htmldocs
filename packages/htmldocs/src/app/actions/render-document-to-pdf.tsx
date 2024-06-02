"use server"

import { renderDocumentByPath } from './render-document-by-path';
import { chromium } from 'playwright';

export const renderDocumentToPDF = async (documentPath: string): Promise<Buffer | Error> => {
  const renderResult = await renderDocumentByPath(documentPath);

  if ('error' in renderResult) {
    return new Error(`Failed to render document: ${renderResult.error.message}`);
  }

  const { markup } = renderResult;

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.setContent(markup);
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
