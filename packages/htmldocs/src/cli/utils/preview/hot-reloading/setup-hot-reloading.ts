import type http from 'node:http';
import path from 'node:path';
import { watch } from 'chokidar';
import debounce from 'debounce';
import { type Socket, Server as SocketServer } from 'socket.io';
import type { HotReloadChange } from '../../../../utils/types/hot-reload-change';
import { createDependencyGraph } from './create-dependency-graph';
import logger from '~/lib/logger';
import chalk from 'chalk';

export const setupHotreloading = async (
  devServer: http.Server,
  documentsDirRelativePath: string,
) => {
  let clients: Socket[] = [];
  const io = new SocketServer(devServer);

  io.on('connection', (client) => {
    clients.push(client);

    client.on('disconnect', () => {
      clients = clients.filter((item) => item !== client);
    });
  });

  // used to keep track of all changes
  // and send them at once to the preview app through the web socket
  let changes = [] as HotReloadChange[];

  const reload = debounce(() => {
    // Filter out files starting with . and deduplicate changes based on filename and event type
    const uniqueChanges = changes
      .filter(change => !path.basename(change.filename).startsWith('.'))
      .filter((change, index, self) =>
        index === self.findIndex((c) => 
          c.filename === change.filename && c.event === change.event
        )
      );

    if (uniqueChanges.length > 0) {
      logger.info(`${chalk.yellow('!')} ${chalk.gray(`Changes detected, reloading...`)}`);
      
      // Send changes to all clients
      clients.forEach((client) => {
        logger.debug(`Emitting reload to ${client.id}`);
        client.emit('reload', uniqueChanges);
      });
    }

    changes = [];

  }, 150);

  const absolutePathToDocumentsDirectory = path.resolve(
    process.cwd(),
    documentsDirRelativePath,
  );

  const [dependencyGraph, updateDependencyGraph] = await createDependencyGraph(
    absolutePathToDocumentsDirectory,
  );

  const resolveDependentsOf = (pathToChangeTarget: string) => {
    const moduleEntry = dependencyGraph[pathToChangeTarget];
    const dependentPaths: Array<string> = [];

    if (moduleEntry) {
      for (const dependentPath of moduleEntry.dependentPaths) {
        const dependentsOfDependent = resolveDependentsOf(dependentPath);
        dependentPaths.push(...dependentsOfDependent);
        dependentPaths.push(dependentPath);
      }
    }

    return dependentPaths;
  };

  const getFilesOutsideDocumentsDirectory = () =>
    Object.keys(dependencyGraph).filter((p) =>
      path.relative(absolutePathToDocumentsDirectory, p).startsWith('..'),
    );
  let filesOutsideDocumentsDirectory = getFilesOutsideDocumentsDirectory();

  const watcher = watch('', {
    ignoreInitial: true,
    cwd: absolutePathToDocumentsDirectory,
    ignored: [
      '**/node_modules/**',
      '**/.git/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/coverage/**',
    ],
  });

  // adds in to be watched separately all of the files that are outside of
  // the user's documents directory
  for (const p of filesOutsideDocumentsDirectory) {
    watcher.add(p);
  }

  const exit = async () => {
    await watcher.close();
  };
  process.on('SIGINT', exit);
  process.on('uncaughtException', exit);

  watcher.on('all', async (event, relativePathToChangeTarget) => {
    const file = relativePathToChangeTarget.split(path.sep);
    if (file.length === 0) {
      return;
    }
    const pathToChangeTarget = path.resolve(
      absolutePathToDocumentsDirectory,
      relativePathToChangeTarget,
    );

    await updateDependencyGraph(event, pathToChangeTarget);

    const newFilesOutsideDocumentsDirectory = getFilesOutsideDocumentsDirectory();
    // updates the files outside of the user's documents directory by unwatching
    // the inexistant ones and watching the new ones
    //
    // this is necessary to avoid missing dependencies that are imported from outside
    // the documents directory
    for (const p of filesOutsideDocumentsDirectory) {
      if (!newFilesOutsideDocumentsDirectory.includes(p)) {
        watcher.unwatch(p);
      }
    }
    for (const p of newFilesOutsideDocumentsDirectory) {
      if (!filesOutsideDocumentsDirectory.includes(p)) {
        watcher.add(p);
      }
    }
    filesOutsideDocumentsDirectory = newFilesOutsideDocumentsDirectory;

    changes.push({
      event,
      filename: relativePathToChangeTarget,
    });

    // These dependents are dependents resolved recursively, so even dependents of dependents
    // will be notified of this change so that we ensure that things are updated in the preview.
    for (const dependentPath of resolveDependentsOf(pathToChangeTarget)) {
      changes.push({
        event: 'change' as const,
        filename: path.relative(absolutePathToDocumentsDirectory, dependentPath),
      });
    }
    reload();
  });

  return watcher;
};