import fs from "node:fs";
import chalk from "chalk";
import * as es from "esbuild";
import path from "node:path";
import postCssPlugin from "esbuild-style-plugin";
import ora from "ora";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { htmldocsPlugin } from "../../utils/htmldocs-esbuild-plugin";
import { closeOraOnSIGINT } from "../utils/close-ora-on-sigint";
import AdmZip from "adm-zip";

export const BUILD_DIR = path.join(
  process.env.NEXT_PUBLIC_USER_PROJECT_LOCATION || process.cwd(),
  "dist"
);

const cleanDistFolder = () => {
  if (fs.existsSync(BUILD_DIR)) {
    fs.rmSync(BUILD_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(BUILD_DIR, { recursive: true });
};

export const build = async (fileName: string, write: boolean = true) => {
  const spinner = ora({
    text: `Building ${fileName}...\n`,
    prefixText: " ",
  }).start();

  closeOraOnSIGINT(spinner);
  try {
    if (!fs.existsSync(fileName)) {
      spinner.fail(chalk.red(`Missing file: ${fileName}`));
      process.exit(1);
    }

    spinner.text = "Cleaning dist folder...";
    cleanDistFolder();
    
    spinner.text = "Zipping static assets...";
    const staticPath = path.join(process.env.DOCUMENTS_DIR_ABSOLUTE_PATH!, 'static');
    
    if (fs.existsSync(staticPath)) {
      const zip = new AdmZip();
      zip.addLocalFolder(staticPath, 'static');
      zip.writeZip(path.join(BUILD_DIR, 'static.zip'));
      spinner.succeed("Static assets zipped");
    }

    spinner.text = `Building ${fileName}...\n`;

    const baseName = path.basename(fileName, path.extname(fileName));
    const documentBuildDir = path.join(BUILD_DIR, baseName);

    try {
      const result = await es.build({
        entryPoints: [fileName],
        bundle: true,
        minify: true,
        write: write,
        format: "cjs",
        jsx: "automatic",
        platform: "node",
        define: {
          "process.env.NODE_ENV": '"development"',
        },
        loader: {
          ".ts": "ts",
          ".tsx": "tsx",
          ".css": "css",
        },
        plugins: [
          htmldocsPlugin([fileName], true),
          postCssPlugin({
            postcss: {
              plugins: [tailwindcss, autoprefixer],
            },
          }),
        ],
        outdir: documentBuildDir,
        sourcemap: "external",
      });
      spinner.succeed("Build completed");
      return result;
    } catch (error) {
      spinner.fail("Build failed");
      const buildFailure = error as es.BuildFailure;
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
  } catch (error) {
    spinner.fail("Build failed");
    console.error(error);
    process.exit(1);
  } finally {
    spinner.stop();
  }
};
