import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "~/lib/utils";
import { ThemeProvider } from "~/components/theme-provider";
import { getDocumentsDirectoryMetadata } from '~/actions/get-documents-directory-metadata';
import { documentsDirectoryAbsolutePath } from '../utils/documents-directory-absolute-path';
import { DocumentsProvider } from '../contexts/documents';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "htmldocs",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const documentsDirectoryMetadata = await getDocumentsDirectoryMetadata(
    documentsDirectoryAbsolutePath,
  );

  if (typeof documentsDirectoryMetadata === 'undefined') {
    throw new Error(
      `Could not find the documents directory specified under ${documentsDirectoryAbsolutePath}!`,
    );
  }

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DocumentsProvider
            initialDocumentsDirectoryMetadata={documentsDirectoryMetadata}
          >
            {children}
          </DocumentsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;