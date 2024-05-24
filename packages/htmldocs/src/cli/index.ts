
import { program } from 'commander';
import packageJson from '../../package.json';
import { dev } from './commands/dev';

const PACKAGE_NAME = 'htmldocs';

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

program.parse();
