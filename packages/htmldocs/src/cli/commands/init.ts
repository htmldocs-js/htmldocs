import path from "node:path";
import fse from "fs-extra";
import logSymbols from "log-symbols";
import ora from "ora";
import logger from "../utils/log";

export const init = async (projectName: string) => {
  logger.debug("CLI package location", process.env.NEXT_PUBLIC_CLI_PACKAGE_LOCATION);
  if (!process.env.NEXT_PUBLIC_CLI_PACKAGE_LOCATION) {
    logger.error("NEXT_PUBLIC_CLI_PACKAGE_LOCATION is not set");
    process.exit(1);
  }

  const spinner = ora("Preparing files...\n").start();

  let projectPath = projectName;

  if (!projectPath) {
    projectPath = path.join(process.cwd(), "htmldocs-starter");
  }

  if (typeof projectPath === "string") {
    projectPath = projectPath.trim();
  }

  const templatePath = path.resolve(process.env.NEXT_PUBLIC_CLI_PACKAGE_LOCATION!, "src/cli/template");
  const resolvedProjectPath = path.resolve(projectPath);

  fse.copySync(templatePath, resolvedProjectPath, {
    recursive: true,
  });

  const templatePackageJsonPath = path.resolve(resolvedProjectPath, "./package.json");
  const templatePackageJson = JSON.parse(fse.readFileSync(templatePackageJsonPath, "utf8"));

  for (const key in templatePackageJson.dependencies) {
    templatePackageJson.dependencies[key] = templatePackageJson.dependencies[key].replace("workspace:", "");
  }

  fse.writeFileSync(templatePackageJsonPath, JSON.stringify(templatePackageJson, null, 2), "utf8");

  spinner.stopAndPersist({
    symbol: logSymbols.success,
    text: `Created project "${projectName}"`,
  });
};