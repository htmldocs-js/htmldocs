import * as es from "esbuild";
import fs from "node:fs";
import vm from "node:vm";
import path from "path";
import { program } from "commander";
import { BuildFailure, type OutputFile } from "esbuild";
import { type RawSourceMap } from "source-map-js";

import { staticNodeModulesForVM } from "./utils/staticNodeModulesForVM";
import { improveErrorWithSourceMap } from "./utils/improveErrorWithSourceMap";
import { ErrorObject } from "./utils/types/errorObject";
import { renderAsync } from "@htmldocs/render";
import { renderResolver } from "./renderResolverEsbuildPlugin";
import postCssPlugin from 'esbuild-style-plugin';

export interface DocumentComponent {
  (props: Record<string, unknown> | Record<string, never>): React.ReactNode;
  PreviewProps?: Record<string, unknown>;
}

program
  .option("-i, --input-file <type>", "Input file", "./src/App.tsx") // Default input directory to ./src/App.tsx
  .option("-o, --output-dir <type>", "Output directory", "./dist"); // Default output directory to ./dist

program.parse(process.argv);

const options = program.opts();

export const getDocumentComponent = async (
  documentPath: string
): Promise<
  | {
      documentComponent: any;
      renderAsync: typeof renderAsync;
      sourceMapToOriginalFile: RawSourceMap;
    }
  | { error: ErrorObject }
> => {
  let outputFiles: OutputFile[];
  try {
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
      plugins: [renderResolver([documentPath])],
      loader: {
        ".ts": "ts",
        ".tsx": "tsx",
      },
      outdir: "stdout", // stub for esbuild, won't actually write to this folder
      sourcemap: "external",
    });
    outputFiles = buildData.outputFiles;
  } catch (exp) {
    const buildFailure = exp as BuildFailure;
    console.error({
      error: {
        message: buildFailure.message,
        stack: buildFailure.stack,
        name: buildFailure.name,
        cause: buildFailure.cause,
      },
    });
    process.exit(1);
  }

  const sourceMapFile = outputFiles[0]!;
  const bundledDocumentFile = outputFiles[1]!;
  const builtDocumentCode = bundledDocumentFile.text;

  const fakeContext = {
    ...global,
    console,
    Buffer,
    TextDecoder,
    TextDecoderStream,
    TextEncoder,
    TextEncoderStream,
    ReadableStream,
    URL,
    URLSearchParams,
    Headers,
    module: {
      exports: {
        default: undefined as unknown,
        renderAsync: undefined as unknown,
      },
    },
    __filename: documentPath,
    __dirname: path.dirname(documentPath),
    require: (module: string) => {
      if (module in staticNodeModulesForVM) {
        return staticNodeModulesForVM[
          module as keyof typeof staticNodeModulesForVM
        ];
      }

      // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-useless-template-literals
      return require(`${module}`) as unknown;
      // this stupid string templating was necessary to not have
      // webpack warnings like:
      //
      // Import trace for requested module:
      // ./src/utils/get-email-component.tsx
      // ./src/app/page.tsx
      //  ⚠ ./src/utils/get-email-component.tsx
      // Critical dependency: the request of a dependency is an expression
    },
    process,
  };

  const sourceMapToDocument = JSON.parse(sourceMapFile.text) as RawSourceMap;

  // because it will have a path like <tsconfigLocation>/stdout/email.js.map
  sourceMapToDocument.sourceRoot = path.resolve(sourceMapFile.path, "../..");
  sourceMapToDocument.sources = sourceMapToDocument.sources.map((source) =>
    path.resolve(sourceMapFile.path, "..", source)
  );
  try {
    vm.runInNewContext(builtDocumentCode, fakeContext, {
      filename: documentPath,
    });
  } catch (exception) {
    const error = exception as Error;

    error.stack &&= error.stack.split("at Script.runInContext (node:vm")[0];

    return {
      error: improveErrorWithSourceMap(
        error,
        documentPath,
        sourceMapToDocument
      ),
    };
  }

  if (fakeContext.module.exports.default === undefined) {
    return {
      error: improveErrorWithSourceMap(
        new Error(
          `The document component at ${documentPath} does not contain a default export`
        ),
        documentPath,
        sourceMapToDocument
      ),
    };
  }

  return {
    documentComponent: fakeContext.module.exports.default as DocumentComponent,
    renderAsync: fakeContext.module.exports.renderAsync as typeof renderAsync,
    sourceMapToOriginalFile: sourceMapToDocument,
  };
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

export const renderCSSBundle = async () => {
  const cssSrcPath = path.resolve(__dirname, "../src/css/index.css");
  const outputDirPath = path.resolve(process.cwd(), options.outputDir);
  await es.build({
    entryPoints: [cssSrcPath],
    outdir: outputDirPath,
    bundle: true,
    minify: true,
    plugins: [
      postCssPlugin({
        postcss: {
          plugins: [require('tailwindcss'), require('autoprefixer')],
        },
      })
    ]
  })
};

(async () => {
  try {
    const documentPath = options.inputFile;
    const result = await renderDocumentByPath(documentPath);

    if ("error" in result) {
      console.error("Error rendering document:", result.error);
    } else {
      console.log("Markup:", result.markup);
      console.log("React Markup:", result.reactMarkup);

      const outputFilePath = path.join(options.outputDir, "output.html");
      await fs.promises.writeFile(outputFilePath, result.markup, "utf-8");
    }

    // Render CSS bundle
    await renderCSSBundle();
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
})();
