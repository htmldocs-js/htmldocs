import { build, BUILD_DIR } from "./build";
import chalk from "chalk";
import { tmpdir } from "os";
import { promises as fs, createReadStream } from "fs";
import path from "path";
import { OutputFile } from "esbuild";
import AdmZip from "adm-zip";
import FormData from "form-data";
import fetch from "node-fetch";
import { getToken } from "../utils/token";
import {
  configureSourceMap,
  createFakeContext,
  executeBuiltCode,
  extractOutputFiles,
} from "@htmldocs/render";
import ora from "ora";
import { closeOraOnSIGINT } from "../utils/close-ora-on-sigint";
import logger from "../utils/log";

export const publish = async (documentPath: string) => {
  logger.debug(`Starting publish process for document: ${documentPath}`);
  const result = await build(documentPath, false);
  const outputFiles = result.outputFiles;

  if (!outputFiles) {
    logger.error("No output files found");
    return;
  }

  const baseName = path.basename(documentPath, path.extname(documentPath));
  const documentBuildDir = path.join(BUILD_DIR, baseName);

  logger.debug(`Found ${outputFiles.length} output files`);
  logger.debug("Writing output files...");
  
  // Create document-specific directory
  await fs.mkdir(documentBuildDir, { recursive: true });
  
  for (const outputFile of outputFiles) {
    const filePath = path.join(documentBuildDir, path.basename(outputFile.path));
    await fs.writeFile(filePath, outputFile.contents);
    logger.debug(`Wrote file: ${filePath}`);
  }
  logger.debug("Finished writing output files");

  const { documentId, defaultProps } = await getDocumentIdAndDefaultProps(documentPath, outputFiles);
  logger.debug(`Document ID: ${documentId}`);

  const zipPath = await zipDocumentFiles(documentBuildDir);
  logger.debug(`Zipped document files to: ${zipPath}`);

  const { team_id, token_id, token_secret } = await getToken();
  logger.debug(`Retrieved token for team: ${team_id}`);

  const formData = new FormData();
  formData.append("file", createReadStream(path.join(zipPath, "output.zip")));
  formData.append("teamId", team_id);
  formData.append("documentName", documentId);
  formData.append("defaultProps", JSON.stringify(defaultProps));
  logger.debug("Form data prepared for upload");

  const spinner = ora({
    text: `Uploading document "${documentId}"...`,
    prefixText: " ",
  }).start();
  closeOraOnSIGINT(spinner);

  try {
    logger.debug("Sending upload request to server");
    const response = await fetch("http://localhost:3000/api/documents/upload", {
      method: "POST",
      headers: {
        "X-Htmldocs-Token-Id": token_id,
        "X-Htmldocs-Token-Secret": token_secret,
      },
      body: formData,
    });

    if (!response.ok) {
      logger.error(`Upload failed with status: ${response.status}`);
      spinner.fail(
        chalk.red(`Failed to upload document: ${response.statusText}`)
      );
      return;
    }

    logger.debug("Upload successful");
    spinner.succeed(chalk.green(`Document "${documentId}" published`));
  } catch (error) {
    logger.error("Error during upload:", error);
    spinner.fail(
      chalk.red(
        "Could not connect to the server. Please check your internet connection and try again."
      )
    );
    return;
  }
};

const getDocumentIdAndDefaultProps = async (
  documentPath: string,
  outputFiles: OutputFile[]
): Promise<{ documentId: string | null; defaultProps: Record<string, any> }> => {
  logger.debug("Extracting document ID");
  const { sourceMapFile, bundledDocumentFile } =
    extractOutputFiles(outputFiles);
  const builtDocumentCode = bundledDocumentFile.text;

  const fakeContext = createFakeContext(documentPath);
  const sourceMapToDocument = configureSourceMap(sourceMapFile);

  logger.debug("Executing built code to extract document ID");
  const executionResult = executeBuiltCode(
    builtDocumentCode,
    fakeContext,
    documentPath,
    sourceMapToDocument
  );

  if ("error" in executionResult) {
    logger.error("Error building document");
    logger.error(executionResult.error);
    return { documentId: null, defaultProps: {} };
  }

  const documentId = executionResult.DocumentComponent.documentId;
  if (!documentId) {
    logger.error(
      "No document ID found. Please ensure documentId is set as a property on the default export."
    );
    return { documentId: null, defaultProps: {} };
  }

  const defaultProps = executionResult.DocumentComponent.PreviewProps || {};
  logger.debug(`Extracted document ID: ${documentId}`);
  logger.debug(`Extracted default props: ${JSON.stringify(defaultProps, null, 2)}`);
  return { documentId, defaultProps: defaultProps };
};

const zipDocumentFiles = async (documentBuildDir: string) => {
  logger.debug("Starting to zip document files");
  const zip = new AdmZip();

  // Add files from document-specific directory
  const files = await fs.readdir(documentBuildDir);
  for (const file of files) {
    const filePath = path.join(documentBuildDir, file);
    logger.debug(`Adding file to zip: ${filePath}`);
    zip.addLocalFile(filePath);
    logger.debug(`File added to zip: ${filePath}`);
  }

  // Add static.zip if it exists
  const staticZipPath = path.join(BUILD_DIR, 'static.zip');
  if (await fs.access(staticZipPath).then(() => true).catch(() => false)) {
    logger.debug('Adding static.zip to bundle');
    zip.addLocalFile(staticZipPath);
  }

  const tempDir = path.join(tmpdir(), `htmldocs-${Date.now()}`);
  logger.debug(`Creating temporary directory: ${tempDir}`);
  await fs.mkdir(tempDir, { recursive: true });
  const zipFilePath = path.join(tempDir, "output.zip");
  logger.debug(`Writing zip file to: ${zipFilePath}`);
  zip.writeZip(zipFilePath);

  logger.debug("Zip process completed");
  return tempDir;
};
