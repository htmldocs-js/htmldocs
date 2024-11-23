'use server';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import fs from 'node:fs';
import path from 'node:path';

const isFileADocument = (fullPath: string): boolean => {
  const stat = fs.statSync(fullPath);

  if (stat.isDirectory()) return false;

  const { ext } = path.parse(fullPath);

  if (!['.js', '.tsx', '.jsx'].includes(ext)) return false;

  // This is to avoid a possible race condition where the file doesn't exist anymore
  // once we are checking if it is an actual document, this could cause issues that
  // would be very hard to debug and find out the why of it happening.
  if (!fs.existsSync(fullPath)) {
    return false;
  }

  // check with a heuristic to see if the file has at least
  // a default export
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  return /\bexport\s+default\b/gm.test(fileContents);
};

export interface DocumentsDirectory {
  absolutePath: string;
  relativePath: string;
  directoryName: string;
  documentFilenames: string[];
  subDirectories: DocumentsDirectory[];
}

const mergeDirectoriesWithSubDirectories = (
  documentsDirectoryMetadata: DocumentsDirectory,
): DocumentsDirectory => {
  let currentResultingMergedDirectory: DocumentsDirectory =
    documentsDirectoryMetadata;

  while (
    currentResultingMergedDirectory.documentFilenames.length === 0 &&
    currentResultingMergedDirectory.subDirectories.length === 1
  ) {
    const onlySubDirectory = currentResultingMergedDirectory.subDirectories[0]!;
    currentResultingMergedDirectory = {
      ...onlySubDirectory,
      directoryName: path.join(
        currentResultingMergedDirectory.directoryName,
        onlySubDirectory.directoryName,
      ),
    };
  }

  return currentResultingMergedDirectory;
};

export const getDocumentsDirectoryMetadata = async (
  absolutePathToDocumentsDirectory: string,
  keepFileExtensions = false,
  isSubDirectory = false,
  baseDirectoryPath = absolutePathToDocumentsDirectory,
): Promise<DocumentsDirectory | undefined> => {
  if (!fs.existsSync(absolutePathToDocumentsDirectory)) return;

  const dirents = await fs.promises.readdir(absolutePathToDocumentsDirectory, {
    withFileTypes: true,
  });

  const documentFilenames = dirents
    .filter((dirent) =>
      isFileADocument(path.join(absolutePathToDocumentsDirectory, dirent.name)),
    )
    .map((dirent) =>
      keepFileExtensions
        ? dirent.name
        : dirent.name.replace(path.extname(dirent.name), ''),
    );

  const subDirectories = await Promise.all(
    dirents
      .filter(
        (dirent) =>
          dirent.isDirectory() &&
          !dirent.name.startsWith('_') &&
          dirent.name !== 'static',
      )
      .map((dirent) => {
        const direntAbsolutePath = path.join(
          absolutePathToDocumentsDirectory,
          dirent.name,
        );
        return getDocumentsDirectoryMetadata(
          direntAbsolutePath,
          keepFileExtensions,
          true,
          baseDirectoryPath,
        ) as Promise<DocumentsDirectory>;
      }),
  );

  const documentsMetadata = {
    absolutePath: absolutePathToDocumentsDirectory,
    relativePath: path.relative(
      baseDirectoryPath,
      absolutePathToDocumentsDirectory,
    ),
    directoryName: absolutePathToDocumentsDirectory.split(path.sep).pop()!,
    documentFilenames,
    subDirectories,
  } satisfies DocumentsDirectory;

  return isSubDirectory
    ? mergeDirectoriesWithSubDirectories(documentsMetadata)
    : documentsMetadata;
};