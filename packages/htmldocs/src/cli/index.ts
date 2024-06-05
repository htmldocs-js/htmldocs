
import { program } from 'commander';
import packageJson from '../../package.json';
import { dev } from './commands/dev';
import { build } from './commands/build';
import { publish } from './commands/publish';

const PACKAGE_NAME = 'htmldocs';
const noop = () => {};

program
  .name(PACKAGE_NAME)
  .description('A live preview of your documents right in your browser')
  .version(packageJson.version);

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

program.parse();

process.on('uncaughtException', function (err) {
  console.error('Unhandled Exception:', err);
});

process.on('unhandledRejection', function (reason, promise) {
  console.error('Unhandled Rejection:', reason);
});