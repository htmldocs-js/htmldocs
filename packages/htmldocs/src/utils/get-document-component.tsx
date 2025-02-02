import * as es from "esbuild";
import fs from "node:fs";
import { BuildFailure, type OutputFile } from "esbuild";

import {
  ErrorObject,
  configureSourceMap,
  createFakeContext,
  executeBuiltCode,
  extractOutputFiles,
  improveErrorWithSourceMap,
  renderAsync,
} from "@htmldocs/render";
import { htmldocsPlugin } from "./htmldocs-esbuild-plugin";
import postCssPlugin from "esbuild-style-plugin";
import { RawSourceMap } from "source-map-js";
import logger from "~/lib/logger";

export const getDocumentComponent = async (
  documentPath: string
): Promise<
  | {
      documentComponent: any;
      documentCss: string | undefined;
      renderAsync: typeof renderAsync;
      sourceMapToOriginalFile: RawSourceMap;
    }
  | { error: ErrorObject }
> => {
  logger.debug(`[getDocumentComponent] Starting build for: ${documentPath}`);
  const startTime = performance.now();
  
  let outputFiles: OutputFile[];
  try {
    logger.debug('Starting esbuild');
    const buildStart = performance.now();
    const buildData = await es.build({
      entryPoints: [documentPath],
      platform: "node",
      bundle: true,
      minify: true,
      write: false,
      format: "cjs",
      jsx: "automatic",
      define: {
        "process.env.NODE_ENV": '"development"',
      },
      plugins: [
        htmldocsPlugin([documentPath], false),
        postCssPlugin({
          postcss: {
            plugins: [require("tailwindcss"), require("autoprefixer")],
          },
        }),
      ],
      loader: {
        ".ts": "ts",
        ".tsx": "tsx",
        ".css": "css",
      },
      outdir: "stdout", // stub for esbuild, won't actually write to this folder
      sourcemap: "external",
    });
    const buildTime = performance.now() - buildStart;
    logger.debug('esbuild completed');
    logger.debug(`[getDocumentComponent] Build completed in ${buildTime.toFixed(2)}ms`);
    
    outputFiles = buildData.outputFiles;
  } catch (exp) {
    const buildFailure = exp as BuildFailure;
    logger.error('[getDocumentComponent] Build failed:', {
      error: {
        message: buildFailure.message,
        stack: buildFailure.stack,
        name: buildFailure.name,
        cause: buildFailure.cause,
      },
    });
    return {
      error: {
        message: buildFailure.message,
        stack: buildFailure.stack || new Error().stack,
        name: buildFailure.name,
        cause: buildFailure.cause,
      }
    };
  }

  try {
    logger.debug('Starting post-build processing');
    const postBuildStart = performance.now();
    
    logger.debug('Extracting files');
    const { sourceMapFile, bundledDocumentFile, cssFile } =
      extractOutputFiles(outputFiles);
    logger.debug('Files extracted');
    
    const builtDocumentCode = bundledDocumentFile.text;
    const documentCss = cssFile?.text;
    
    logger.debug('Creating context');
    const fakeContext = createFakeContext(documentPath);
    logger.debug('Context created');
    
    logger.debug('Configuring source map');
    const sourceMapToDocument = configureSourceMap(sourceMapFile);
    logger.debug('Source map configured');

    logger.debug('Executing code');
    const executionResult = executeBuiltCode(
      builtDocumentCode,
      fakeContext,
      documentPath,
      sourceMapToDocument
    );
    logger.debug('Code executed');

    const postBuildTime = performance.now() - postBuildStart;
    logger.debug('Post-build completed');
    logger.debug(`[getDocumentComponent] Post-build processing completed in ${postBuildTime.toFixed(2)}ms`);

    if ("error" in executionResult) {
      logger.error('[getDocumentComponent] Execution failed:', executionResult.error);
      return { error: executionResult.error };
    }

    const totalTime = performance.now() - startTime;
    logger.debug(`[getDocumentComponent] Total processing completed in ${totalTime.toFixed(2)}ms`);

    return {
      documentComponent: executionResult.DocumentComponent,
      documentCss,
      renderAsync: executionResult.renderAsync,
      sourceMapToOriginalFile: sourceMapToDocument,
    };
  } catch (error) {
    logger.error('[getDocumentComponent] Processing error:', error);
    return {
      error: {
        message: error.message,
        stack: new Error().stack,
        name: "Error",
        cause: error.cause,
      },
    };
  }
};

export interface RenderedDocumentMetadata {
  markup: string;
  reactMarkup: string;
}

export type DocumentRenderingResult =
  | RenderedDocumentMetadata
  | {
      error: ErrorObject;
    };

export const renderDocumentByPath = async (
  documentPath: string
): Promise<DocumentRenderingResult> => {
  const result = await getDocumentComponent(documentPath);

  if ("error" in result) {
    return { error: result.error };
  }

  const {
    documentComponent: Document,
    renderAsync,
    sourceMapToOriginalFile,
  } = result;

  const previewProps = Document.PreviewProps || {};
  const DocumentComponent = Document as React.FC;
  try {
    const markup = await renderAsync(<DocumentComponent {...previewProps} />);

    const reactMarkup = await fs.promises.readFile(documentPath, "utf-8");

    return {
      markup,
      reactMarkup,
    };
  } catch (exception) {
    const error = exception as Error;

    return {
      error: improveErrorWithSourceMap(
        error,
        documentPath,
        sourceMapToOriginalFile
      ),
    };
  }
};

// export const renderCSSBundle = async () => {
//   const cssSrcPath = path.resolve(__dirname, "../src/css/index.css");
//   const outputDirPath = path.resolve(process.cwd(), options.outputDir);
//   await es.build({
//     entryPoints: [cssSrcPath],
//     outdir: outputDirPath,
//     bundle: true,
//     minify: true,
//     plugins: [
//       postCssPlugin({
//         postcss: {
//           plugins: [require('tailwindcss'), require('autoprefixer')],
//         },
//       })
//     ]
//   })
// };

// (async () => {
//   try {
//     const documentPath = options.inputFile;
//     const result = await renderDocumentByPath(documentPath);

//     if ("error" in result) {
//       console.error("Error rendering document:", result.error);
//     } else {
//       console.log("Markup:", result.markup);
//       console.log("React Markup:", result.reactMarkup);

//       const outputFilePath = path.join(options.outputDir, "output.html");
//       await fs.promises.writeFile(outputFilePath, result.markup, "utf-8");
//     }

//     // Render CSS bundle
//     await renderCSSBundle();
//   } catch (error) {
//     console.error("An unexpected error occurred:", error);
//   }
// })();
