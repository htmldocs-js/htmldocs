
import { program } from 'commander';
import packageJson from '../../package.json';
import { dev } from './commands/dev';
import { build } from './commands/build';
import { publish } from './commands/publish';
import { login } from './commands/login';
import logger from './utils/log';

const PACKAGE_NAME = 'htmldocs';
const noop = () => {};

// Silence Node.js deprecation warnings
process.removeAllListeners('warning');

program
  .name(PACKAGE_NAME)
  .description('A live preview of your documents right in your browser')
  .version(packageJson.version)
  .option('-v, --verbose', 'Enable verbose logging')
  .hook('preAction', (thisCommand) => {
    if (thisCommand.opts().verbose) {
      logger.level = 'debug';
    }
  });

program
  .command('dev')
  .description('Starts the preview server')
  .option('-d, --dir <path>', 'Directory with your document templates', './documents')
  .option('-p --port <port>', 'Port to run dev server on', '3000')
  .action(dev);

program
  .command('build <file>')
  .description('Builds the document component')
  .action((file) => build(file).then(noop));

program
  .command('publish <file>')
  .description('Publishes the document to the cloud for API use')
  .action((file) => publish(file));

program
  .command('login')
  .description('Authenticates the CLI with the cloud')
  .action(login);

program.parse();