import { build } from "./build";
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

export const publish = async (documentPath: string) => {
  const result = await build(documentPath, false);
  const outputFiles = result.outputFiles;

  if (!outputFiles) {
    console.log(chalk.red("No output files found"));
    return;
  }

  const documentId = await getDocumentId(documentPath, outputFiles);

  const zipPath = await zipDocumentFiles(outputFiles);
  const { team_id, token_id, token_secret } = await getToken();

  const formData = new FormData();
  formData.append("file", createReadStream(path.join(zipPath, "output.zip")));
  formData.append("teamId", team_id);
  formData.append("documentName", documentId);

  const spinner = ora({
    text: `Uploading document "${documentId}"...`,
    prefixText: " ",
  }).start();
  closeOraOnSIGINT(spinner);

  try {
    const response = await fetch("http://localhost:3001/api/documents/upload", {
      method: "POST",
      headers: {
        "X-Htmldocs-Token-Id": token_id,
        "X-Htmldocs-Token-Secret": token_secret,
      },
      body: formData,
    });

    if (!response.ok) {
      spinner.fail(
        chalk.red(`Failed to upload document: ${response.statusText}`)
      );
      return;
    }

    spinner.succeed(chalk.green(`Document "${documentId}" published`));
  } catch (error) {
    spinner.fail(
      chalk.red(
        "Could not connect to the server. Please check your internet connection and try again."
      )
    );
    return;
  }
};

const getDocumentId = async (
  documentPath: string,
  outputFiles: OutputFile[]
) => {
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
    console.log(chalk.red("Error building document"));
    console.log(documentComponent.error);
    return;
  }

  const documentId = documentComponent.documentId;
  if (!documentId) {
    console.log(
      chalk.red(
        "No document ID found. Please ensure documentId is set as a property on the default export."
      )
    );
    return;
  }

  return documentId;
};

const zipDocumentFiles = async (outputFiles: OutputFile[]) => {
  const zip = new AdmZip();
  outputFiles.forEach((file) => {
    zip.addLocalFile(file.path);
  });

  const tempDir = path.join(tmpdir(), `htmldocs-${Date.now()}`);
  await fs.mkdir(tempDir, { recursive: true });
  zip.writeZip(path.join(tempDir, "output.zip"));

  return tempDir;
};
