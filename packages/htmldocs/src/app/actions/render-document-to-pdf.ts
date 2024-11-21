"use server"

import { LaunchOptions, chromium } from 'playwright';

const standardSizes = ["A3", "A4", "A5", "letter", "legal"] as const;
type StandardSize = typeof standardSizes[number];
type Unit = 'in' | 'cm' | 'mm' | 'px';
type CustomSize = `${number}${Unit} ${number}${Unit}`;
export type DocumentSize = StandardSize | CustomSize;

export interface RenderDocumentToPDFProps extends LaunchOptions {
    url: string;
    size?: DocumentSize;
}

const isStandardSize = (size: string): size is StandardSize => {
    return standardSizes.includes(size as StandardSize);
};

const parseCustomSize = (size: string) => {
    const [width, height] = size.split(' ');
    return { width, height };
};

export const renderDocumentToPDF = async ({ url, size = 'A4', ...props }: RenderDocumentToPDFProps): Promise<Buffer | Error> => {
  const browser = await chromium.launch({
    ...props,
  });
  try {
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForLoadState('networkidle');

    const pdfOptions = {
        printBackground: true,
        ...(isStandardSize(size) 
            ? { format: size } 
            : parseCustomSize(size))
    };

    const pdfBuffer = await page.pdf(pdfOptions);
    await browser.close();

    return pdfBuffer;
  } catch (error) {
    await browser.close();
    return new Error(`Failed to generate PDF: ${error.message}`);
  }
};
