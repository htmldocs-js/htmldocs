import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(packageDir, '../..');
const userProjectLocation = path.join(repoRoot, 'apps/examples');
const documentsDirRelativePath = 'documents';
const documentsDirAbsolutePath = path.join(
  userProjectLocation,
  documentsDirRelativePath,
);

const child = spawn('next', ['dev'], {
  cwd: packageDir,
  env: {
    ...process.env,
    NEXT_PUBLIC_DOCUMENTS_DIR_RELATIVE_PATH: documentsDirRelativePath,
    NEXT_PUBLIC_OS_PATH_SEPARATOR: path.sep,
    NEXT_PUBLIC_USER_PROJECT_LOCATION: userProjectLocation,
    DOCUMENTS_DIR_RELATIVE_PATH: documentsDirRelativePath,
    DOCUMENTS_STATIC_PATH: path.join(documentsDirAbsolutePath, 'static'),
    DOCUMENTS_DIR_ABSOLUTE_PATH: documentsDirAbsolutePath,
    USER_PROJECT_LOCATION: userProjectLocation,
  },
  shell: process.platform === 'win32',
  stdio: 'inherit',
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
