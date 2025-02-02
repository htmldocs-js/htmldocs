import { program } from 'commander';
import packageJson from '../../package.json';
import { dev } from './commands/dev';
import { build } from './commands/build';
import { publish } from './commands/publish';
import { login } from './commands/login';
import { init } from './commands/init';
import logger from '~/lib/logger';
import inquirer from 'inquirer';
import { getEnvVariablesForPreviewApp } from './utils/preview/get-env-variables-for-preview-app';
import path from 'path';
import { documentsDirRelativePath } from '../utils/documents-directory-absolute-path';
import { cliPackageLocation } from './utils';

const PACKAGE_NAME = 'htmldocs';
const noop = () => {};

// Silence Node.js deprecation warnings
process.removeAllListeners('warning');

// these environment variables are used on the next app
// this is the most reliable way of communicating these paths through
process.env = {
  ...process.env,
  ...getEnvVariablesForPreviewApp(
    // If we don't do normalization here, stuff like https://github.com/resend/react-email/issues/1354 happens.
    path.normalize(documentsDirRelativePath),
    cliPackageLocation,
    process.cwd(),
  ),
};

program
  .name(PACKAGE_NAME)
  .description('A live preview of your documents right in your browser')
  .version(packageJson.version)
  .option('-v, --verbose', 'Enable verbose logging')
  .hook('preAction', (thisCommand) => {
    if (thisCommand.opts().verbose) {
      logger.setLevel('debug');
    }
  });

program
  .command('dev')
  .description('Starts the preview server')
  .option('-d, --dir <path>', 'Directory with your document templates', './documents')
  .option('-p --port <port>', 'Port to run dev server on', '3000')
  .action(dev);

program
  .command('build <file>', { hidden: true })
  .description('Builds the document component')
  .action((file) => build(file).then(noop))

program
  .command('publish <file>')
  .description('Publishes the document to the cloud for API use')
  .action((file) => publish(file));

program
  .command('login')
  .description('Authenticates the CLI with the cloud')
  .action(login);

program
  .command('init [name]')
  .description('Initialize a new HTMLDocs project')
  .action(async (name) => {
    if (!name) {
      const answer = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'What is the name of your project?',
          default: 'htmldocs'
        }
      ]);
      name = answer.projectName;
    }
    await init(name);
  });

program.parse();