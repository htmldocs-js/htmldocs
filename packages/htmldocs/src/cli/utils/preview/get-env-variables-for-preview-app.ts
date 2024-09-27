import path from 'path';

export const getEnvVariablesForPreviewApp = (
  relativePathToDocumentsDirectory: string,
  cliPackageLocation: string,
  cwd: string,
) => {
  return {
    NEXT_PUBLIC_DOCUMENTS_DIR_RELATIVE_PATH: relativePathToDocumentsDirectory,
    NEXT_PUBLIC_CLI_PACKAGE_LOCATION: cliPackageLocation,
    NEXT_PUBLIC_OS_PATH_SEPARATOR: path.sep,
    NEXT_PUBLIC_USER_PROJECT_LOCATION: cwd,
    // new vars
    DOCUMENTS_DIR_RELATIVE_PATH: relativePathToDocumentsDirectory,
    DOCUMENTS_DIR_ABSOLUTE_PATH: path.resolve(cwd, relativePathToDocumentsDirectory),
    USER_PROJECT_LOCATION: cwd,
  } as const;
};