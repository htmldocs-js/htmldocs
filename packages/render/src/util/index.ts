// utils.ts
import { OutputFile } from "esbuild";
import path from "node:path";
import vm from "node:vm";
import { RawSourceMap } from "source-map-js";
import { staticNodeModulesForVM } from "./static-node-modules-for-vm";
import { improveErrorWithSourceMap } from "./improve-error-with-sourcemap";
import { DocumentComponent, ErrorObject } from "../types";

export { improveErrorWithSourceMap } from "./improve-error-with-sourcemap";

export function createFakeContext(documentPath: string) {
  return {
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
        return staticNodeModulesForVM[module as keyof typeof staticNodeModulesForVM];
      }
      return require(module);
    },
    process,
  };
}

export function extractOutputFiles(outputFiles: OutputFile[]) {
  let sourceMapFile: OutputFile | undefined;
  let bundledDocumentFile: OutputFile | undefined;
  let cssFile: OutputFile | undefined;

  for (const file of outputFiles) {
    if (file.path.endsWith(".map")) {
      sourceMapFile = file;
    } else if (file.path.endsWith(".js")) {
      bundledDocumentFile = file;
    } else if (file.path.endsWith(".css")) {
      cssFile = file;
    }
  }

  if (!sourceMapFile || !bundledDocumentFile) {
    throw new Error("Expected output files not found");
  }

  return { sourceMapFile, bundledDocumentFile, cssFile };
}

export function configureSourceMap(sourceMapFile: OutputFile): RawSourceMap {
  const sourceMapToDocument = JSON.parse(sourceMapFile.text) as RawSourceMap;
  sourceMapToDocument.sourceRoot = path.resolve(sourceMapFile.path, "../..");
  sourceMapToDocument.sources = sourceMapToDocument.sources.map((source) =>
    path.resolve(sourceMapFile.path, "..", source)
  );
  return sourceMapToDocument;
}

export function executeBuiltCode(
  builtDocumentCode: string,
  fakeContext: any,
  documentPath: string,
  sourceMapToDocument: RawSourceMap
): DocumentComponent | { error: ErrorObject } {
  try {
    vm.runInNewContext(builtDocumentCode, fakeContext, { filename: documentPath });
  } catch (exception) {
    const error = exception as Error;
    error.stack &&= error.stack.split("at Script.runInContext (node:vm")[0];
    return { error: improveErrorWithSourceMap(error, documentPath, sourceMapToDocument) };
  }

  if (fakeContext.module.exports.default === undefined) {
    return {
      error: improveErrorWithSourceMap(
        new Error(`The document component at ${documentPath} does not contain a default export`),
        documentPath,
        sourceMapToDocument
      ),
    };
  }

  return fakeContext.module.exports.default as DocumentComponent;
}
