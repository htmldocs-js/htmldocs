import type http from 'node:http';
import path from 'node:path';
import { Server as SocketServer, type Socket } from 'socket.io';
import { watch } from 'chokidar';
import debounce from 'debounce';
import type { HotReloadChange } from '../../../../utils/types/hot-reload-change';
import { createDependencyGraph } from './create-dependency-graph';
import logger from '~/lib/logger';
import chalk from 'chalk';

export const setupHotreloading = async (
  devServer: http.Server,
  emailDirRelativePath: string,
) => {
  let clients: Socket[] = [];
  const io = new SocketServer(devServer);

  io.on('connection', (client) => {
    clients.push(client);

    client.on('disconnect', () => {
      clients = clients.filter((item) => item !== client);
    });
  });

  const absolutePathToDocumentsDirectory = path.resolve(
    process.cwd(),
    emailDirRelativePath,
  );

  logger.info(`Watching ${absolutePathToDocumentsDirectory}`);

  const watcher = watch('', {
    ignoreInitial: true,
    cwd: absolutePathToDocumentsDirectory,
  });

  const exit = () => {
    void watcher.close();
  };
  process.on('SIGINT', exit);
  // process.on('uncaughtException', exit);

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

    // Log changes only once, not per client
    uniqueChanges.forEach(change => {
      logger.info(`${chalk.yellow('!')} ${chalk.gray(`Changes detected in ${path.basename(change.filename)}, reloading...`)}`);
    });

    // Send changes to all clients
    clients.forEach((client) => {
      logger.debug(`Emitting reload to ${client.id}`);
      client.emit('reload', uniqueChanges);
    });

    changes = [];
  }, 150);

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

  watcher.on('all', async (event, relativePathToChangeTarget) => {
    const file = relativePathToChangeTarget.split(path.sep);
    if (file.length === 0) {
      return;
    }

    logger.debug(`Detected ${event} in ${relativePathToChangeTarget}`);

    const pathToChangeTarget = path.resolve(
      absolutePathToDocumentsDirectory,
      relativePathToChangeTarget,
    );
    await updateDependencyGraph(event, pathToChangeTarget);

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