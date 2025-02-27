import fs from 'node:fs';
import { startDevServer, setupHotreloading } from '../utils';
import logger from '~/lib/logger';

interface Args {
  dir: string;
  port: string;
}

export const dev = async ({ dir: documentsDirRelativePath, port }: Args) => {
  try {
    if (!fs.existsSync(documentsDirRelativePath)) {
      logger.error(`Missing ${documentsDirRelativePath} folder`);
      throw new Error(`Missing ${documentsDirRelativePath} folder`);
    }

    logger.debug(`Starting dev server for ${documentsDirRelativePath} on port ${port}`);
    const devServer = await startDevServer(
      documentsDirRelativePath,
      documentsDirRelativePath, // defaults to ./documents/static for the static files that are served to the preview
      parseInt(port),
    );

    logger.debug('Setting up hot reloading');
    await setupHotreloading(devServer, documentsDirRelativePath);
    logger.debug('Dev server started successfully');
  } catch (error) {
    logger.error('Error starting dev server', { error });
    process.exit(1);
  }
};