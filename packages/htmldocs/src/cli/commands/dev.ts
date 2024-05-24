import fs from 'node:fs';
import { startDevServer, setupHotreloading } from '../utils';

interface Args {
  dir: string;
  port: string;
}

export const dev = async ({ dir: documentsDirRelativePath, port }: Args) => {
  try {
    if (!fs.existsSync(documentsDirRelativePath)) {
      throw new Error(`Missing ${documentsDirRelativePath} folder`);
    }

    const devServer = await startDevServer(
      documentsDirRelativePath,
      documentsDirRelativePath, // defaults to ./documents/static for the static files that are served to the preview
      parseInt(port),
    );

    await setupHotreloading(devServer, documentsDirRelativePath);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};