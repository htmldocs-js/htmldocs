import * as es from 'esbuild';
import glob from 'glob';
import fs from 'fs-extra';
import path from 'path';
import { program } from 'commander';
import chokidar from "chokidar";
import chalk from 'chalk';

import { createUseValuePlugin } from './plugin';

const postCssPlugin = require('esbuild-style-plugin');

program
  .option('-i, --input-dir <type>', 'Input directory', './src') // Default input directory to ./src
  .option('-o, --output-dir <type>', 'Output directory', './.dist') // Default output directory to .lib
  .option('-f, --file <type>', 'Read data context from JSON file', './src/data.json')
  .option('-d, --data <data>', 'Pass context data directly as a JSON string')
  .option('-s, --serve', 'Serve the application in development mode');

program.parse(process.argv);

const options = program.opts();

const entryPoints = glob.sync(`${options.inputDir}/index.tsx`);
const OUTPUT_FOLDER_NAME = options.outputDir;

async function esbuild(): Promise<void> {
  const outputDirPath = path.resolve(process.cwd(), OUTPUT_FOLDER_NAME);
  const srcDataFilePath = path.resolve(process.cwd(), options.file);
  const dataFilePath = path.join(outputDirPath, 'data.json');
  await fs.emptyDir(outputDirPath);

  const ctx = await es.context({
    entryPoints,
    outdir: outputDirPath,
    platform: 'node',
    bundle: true,
    minify: true,
    external: [],
    define: {
      'process.env.NODE_ENV': '"development"',
    },
    plugins: [
      createUseValuePlugin(dataFilePath),
      postCssPlugin({
        postcss: {
          plugins: [require('tailwindcss'), require('autoprefixer')],
        },
      }),
    ],
    loader: {
      '.ts': 'ts',
      '.tsx': 'tsx',
    }, 
  });

  let dataFromCLI = options.data ? JSON.parse(options.data) : {};

  const sourcePath = path.resolve(process.cwd(), options.inputDir);
  const publicDirPath = path.resolve(process.cwd(), 'src/public');

  const writeDataFile = async () => {
    if (options.file) {
      try {
        const dataString = fs.readFileSync(srcDataFilePath, 'utf8');
        dataFromCLI = JSON.parse(dataString);
      } catch (error) {
        console.error('Error reading or parsing the data context JSON file:', error);
        process.exit(1);
      }
    }

    await fs.writeJson(dataFilePath, dataFromCLI, { spaces: 2 });
  }

  const copyPublicDir = async () => {
    await fs.copy(publicDirPath, outputDirPath);
  }

  await writeDataFile();
  await copyPublicDir();
  if (options.serve) {
    ctx.serve({ servedir: outputDirPath, port: 3000 }).then((result) => {
      console.log(chalk.greenBright("ready") + ` - started server on http://localhost:${result.port}`);
      console.warn(chalk.yellow("warning") + " - this server is intended for development only and should not be used in production.");
    });
  } else {
    await ctx.rebuild();
  }

  chokidar.watch(sourcePath, { ignored: /(^|[\/\\])\../, ignoreInitial: true }).on('all', async (event, path) => {
    // data.json changed
    if (path === srcDataFilePath) {
      await writeDataFile();
    }

    // public directory changed
    if (path.startsWith(publicDirPath)) {
      await fs.copy(path, outputDirPath + path.replace(publicDirPath, ''));
    }

    // Rebuild the project
    await ctx.rebuild();
  });
}

esbuild();