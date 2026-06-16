import fs from 'node:fs';
import path from 'node:path';
import { startDevServer, setupHotreloading } from '../utils';
import logger from '~/lib/logger';
import { getEnvVariablesForPreviewApp } from '../utils/preview/get-env-variables-for-preview-app';
import { cliPackageLocation } from '../utils';

interface Args {
  dir: string;
  port: string;
}

export const dev = async ({ dir: documentsDirRelativePath, port }: Args) => {
  try {
    const normalizedDocumentsDirRelativePath = path.normalize(
      documentsDirRelativePath,
    );

    if (!fs.existsSync(normalizedDocumentsDirRelativePath)) {
      logger.error(`Missing ${normalizedDocumentsDirRelativePath} folder`);
      throw new Error(`Missing ${normalizedDocumentsDirRelativePath} folder`);
    }

    process.env = {
      ...process.env,
      ...getEnvVariablesForPreviewApp(
        normalizedDocumentsDirRelativePath,
        cliPackageLocation,
        process.cwd(),
      ),
    };

    logger.debug(`Starting dev server for ${normalizedDocumentsDirRelativePath} on port ${port}`);
    const devServer = await startDevServer(
      normalizedDocumentsDirRelativePath,
      normalizedDocumentsDirRelativePath, // defaults to ./documents/static for the static files that are served to the preview
      parseInt(port),
    );

    logger.debug('Setting up hot reloading');
    await setupHotreloading(devServer, normalizedDocumentsDirRelativePath);
    logger.debug('Dev server started successfully');
  } catch (error) {
    logger.error('Error starting dev server', { error });
    process.exit(1);
  }
};
