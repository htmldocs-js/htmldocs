import fs from 'node:fs';
import path from 'node:path';
import { startDevServer, setupHotreloading } from '../utils';
import { getEnvVariablesForPreviewApp } from '../utils/preview/get-env-variables-for-preview-app';
import logger from '~/lib/logger';

interface Args {
  dir: string;
  port: string;
}

export const dev = async ({ dir: documentsDirRelativePath, port }: Args) => {

  console.log("路径地址：", documentsDirRelativePath);

  try {
    if (!fs.existsSync(documentsDirRelativePath)) {
      logger.error(`Missing ${documentsDirRelativePath} folder`);
      throw new Error(`Missing ${documentsDirRelativePath} folder`);
    }

    // 动态更新环境变量以使用正确的文档目录路径
    const documentsDir = path.resolve(documentsDirRelativePath);
    const envVars = getEnvVariablesForPreviewApp(
      path.relative(process.cwd(), documentsDir),
      process.env.NEXT_PUBLIC_CLI_PACKAGE_LOCATION!,
      process.cwd()
    );
    
    // 更新环境变量
    Object.assign(process.env, envVars);
    
    // 启用Index模式
    process.env.NEXT_PUBLIC_INDEX_ONLY_MODE = 'true';
    
    logger.debug(`Documents directory absolute path: ${envVars.DOCUMENTS_DIR_ABSOLUTE_PATH}`);

    logger.debug(`Starting dev server for ${documentsDirRelativePath} on port ${port}`);
    const devServer = await startDevServer(
      documentsDirRelativePath,
      documentsDirRelativePath, // defaults to ./documents/static for the static files that are served to the preview
      parseInt(port),
    );

    logger.debug('Setting up hot reloading in Index-only mode');
    await setupHotreloading(devServer, documentsDirRelativePath, true); // 启用Index模式
    logger.debug('Dev server started successfully');
  } catch (error) {
    logger.error('Error starting dev server', { error });
    process.exit(1);
  }
};