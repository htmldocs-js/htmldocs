import { build } from "./build";
import chalk from "chalk";
import {
  configureSourceMap,
  createFakeContext,
  executeBuiltCode,
  extractOutputFiles,
} from "@htmldocs/render";

export const publish = async (documentPath: string) => {
  const result = await build(documentPath, false);
  const outputFiles = result.outputFiles;

  if (!outputFiles) {
    console.log(chalk.red("No output files found"));
    return;
  }

  // Grab the documentId if specified
  const { sourceMapFile, bundledDocumentFile } =
    extractOutputFiles(outputFiles);
  const builtDocumentCode = bundledDocumentFile.text;

  const fakeContext = createFakeContext(documentPath);
  const sourceMapToDocument = configureSourceMap(sourceMapFile);

  const documentComponent = executeBuiltCode(
    builtDocumentCode,
    fakeContext,
    documentPath,
    sourceMapToDocument
  );

  if ("error" in documentComponent) {
    console.log(chalk.red("Error publishing document"));
    console.log(documentComponent.error);
    return;
  }

  const documentId = documentComponent.documentId;

  console.log(chalk.green(`Document published to ${documentId}`));
};
