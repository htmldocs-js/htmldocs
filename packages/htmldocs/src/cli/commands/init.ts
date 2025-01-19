import path from "node:path";
import fse from "fs-extra";
import logSymbols from "log-symbols";
import ora from "ora";
import { exec } from "child_process";
import chalk from "chalk";
import logger from "../utils/log";
import { cliPackageLocation } from "../utils";

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

  const templatePath = path.resolve(cliPackageLocation, "cli/template");
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

  spinner.text = "Installing dependencies...";

  try {
    await new Promise<void>((resolve, reject) => {
      spinner.text = "Installing dependencies...";
      exec("npm install", { cwd: resolvedProjectPath }, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    spinner.succeed(chalk.green(`Created project "${projectName}" and installed dependencies`));
    
    // Add colorized instructions for the user
    console.log("\n" + chalk.blue(logSymbols.info) + chalk.bold(" To start your project:"));
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan("  npm run dev"));
  } catch (error) {
    spinner.fail(chalk.red("Failed to install dependencies"));
    logger.error("Error installing dependencies:", error);
    process.exit(1);
  }
};
