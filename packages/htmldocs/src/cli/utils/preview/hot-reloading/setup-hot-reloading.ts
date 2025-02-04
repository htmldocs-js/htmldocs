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

  const projectRoot = process.cwd();
  const absolutePathToDocumentsDirectory = path.resolve(
    projectRoot,
    emailDirRelativePath,
  );

  logger.info(`Watching project root at ${projectRoot}`);

  const watcher = watch('**/*', {
    ignoreInitial: true,
    cwd: projectRoot,
    ignored: [
      '**/node_modules/**',
      '**/.git/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/coverage/**',
    ],
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

    // Convert the path to be relative to the documents directory if it's within it
    const absolutePathToChangeTarget = path.resolve(projectRoot, relativePathToChangeTarget);
    const isInDocumentsDirectory = absolutePathToChangeTarget.startsWith(absolutePathToDocumentsDirectory);
    
    if (isInDocumentsDirectory) {
      const pathRelativeToDocuments = path.relative(absolutePathToDocumentsDirectory, absolutePathToChangeTarget);
      
      await updateDependencyGraph(event, absolutePathToChangeTarget);

      changes.push({
        event,
        filename: pathRelativeToDocuments,
      });

      for (const dependentPath of resolveDependentsOf(absolutePathToChangeTarget)) {
        changes.push({
          event: 'change' as const,
          filename: path.relative(absolutePathToDocumentsDirectory, dependentPath),
        });
      }
    } else {
      // For files outside documents directory, just notify of the change relative to project root
      changes.push({
        event,
        filename: relativePathToChangeTarget,
      });
    }
    
    reload();
  });

  return watcher;
};