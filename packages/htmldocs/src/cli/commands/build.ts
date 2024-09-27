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

export const BUILD_DIR = path.join(
  process.env.NEXT_PUBLIC_USER_PROJECT_LOCATION || process.cwd(),
  "dist"
);

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

    const removeForceDynamic = async (filePath: string) => {
      const contents = await fs.promises.readFile(filePath, 'utf8');
      await fs.promises.writeFile(
        filePath,
        contents.replace("export const dynamic = 'force-dynamic';", ''),
        'utf8',
      );
    };

    const builtPreviewAppPath = path.resolve(process.cwd(), 'dist');
    await removeForceDynamic(
      path.resolve(builtPreviewAppPath, './src/app/layout.tsx'),
    );
    await removeForceDynamic(
      path.resolve(builtPreviewAppPath, './src/app/preview/[...slug]/page.tsx'),
    );

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
        outdir: BUILD_DIR,
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
