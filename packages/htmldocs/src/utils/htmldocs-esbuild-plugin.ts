import path from "node:path";
import fs from "node:fs";
import type { Loader, PluginBuild, ResolveOptions } from "esbuild";
// import { Documentation, parse } from "react-docgen";
// import { randomBytes } from "crypto";
// import * as tsj from "ts-json-schema-generator";
// import { DOCUMENT_SCHEMAS_DIR } from "./paths";

/**
 * Made to export the `renderAsync` function out of the user's email template
 * so that issues like https://github.com/resend/react-email/issues/649 don't
 * happen.
 *
 * This avoids multiple versions of React being involved, i.e., the version
 * in the CLI vs. the version the user has on their document.
 *
 * Also, this plugin generates the schema for document components and saves it to .next
 */
export const htmldocsPlugin = (documentTemplates: string[], isBuild: boolean) => ({
  name: "htmldocs-plugin",
  setup: (b: PluginBuild) => {
    b.onLoad(
      { filter: new RegExp(documentTemplates.join("|")) },
      async ({ path: pathToFile }) => {
        let contents = await fs.promises.readFile(pathToFile, "utf8");
        // await generateAndWriteSchema(contents, pathToFile);
        if (isBuild) {
          // Replace all occurrences of /static with ./static
          contents = contents.replace(/\/static/g, './static');
        }
        return {
          contents: `${contents};
          export { renderAsync } from 'htmldocs-module-that-will-export-render'
        `,
          loader: path.extname(pathToFile).slice(1) as Loader,
        };
      }
    );

    b.onResolve(
      { filter: /^htmldocs-module-that-will-export-render$/ },
      async (args) => {
        const options: ResolveOptions = {
          kind: "import-statement",
          importer: args.importer,
          resolveDir: args.resolveDir,
          namespace: args.namespace,
        };
        let result = await b.resolve("@htmldocs/render", options);
        if (result.errors.length === 0) {
          return result;
        }

        if (result.errors.length > 0 && result.errors[0]) {
          result.errors[0].text =
            "Failed trying to import `renderAsync` from `@htmldocs/render` to be able to render your document template.\n Maybe you don't have `@htmldocs/render` installed?";
        }
        return result;
      }
    );
  },
});

// async function generateAndWriteSchema(contents: string, filePath: string): Promise<void> {
//   const componentProps = await parseFileToProps(contents, filePath);
//   const randomSuffix = randomBytes(4).toString("hex");
//   const componentInterfaceName = `ComponentProps_${randomSuffix}`;
//   let interfaceContent = `export interface ${componentInterfaceName} {\n`;

//   for (const propName in componentProps) {
//     const prop = componentProps[propName];
//     if (!prop || !prop.tsType) continue;
//     const required = prop.required ? "" : "?";
//     const tsType = "raw" in prop.tsType ? prop.tsType.raw : prop.tsType?.name;
//     interfaceContent += `  ${propName}${required}: ${tsType};\n`;
//   }

//   interfaceContent += `}\n`;
//   const fileContents = contents + "\n" + interfaceContent;
//   const tempFilePath = createTempFilePath(filePath);

//   await fs.writeFileSync(tempFilePath, fileContents);
//   const config = {
//     path: tempFilePath,
//     tsconfig: process.env.NEXT_PUBLIC_USER_PROJECT_LOCATION + "/tsconfig.json",
//     type: componentInterfaceName,
//   };

//   const schema = tsj.createGenerator(config).createSchema(config.type);
//   fs.unlinkSync(tempFilePath);

//   const schemaString = JSON.stringify(schema, null, 2);

//   if (!fs.existsSync(DOCUMENT_SCHEMAS_DIR)) {
//     fs.mkdirSync(DOCUMENT_SCHEMAS_DIR, { recursive: true });
//   }
//   const schemaFilePath = path.join(
//     DOCUMENT_SCHEMAS_DIR,
//     `${path.basename(filePath)}.json`
//   );
//   fs.writeFileSync(schemaFilePath, schemaString);
// }

// function createTempFilePath(filePath: string): string {
//   const baseName = path.basename(filePath, path.extname(filePath));
//   const dirName = path.dirname(filePath);
//   const extension = path.extname(filePath).replace(".", "");
//   const tempFileName = `.${baseName}.${extension}`;
//   const tempFilePath = path.join(dirName, tempFileName);
//   return tempFilePath;
// }

// const parseFileToProps = async (
//   contents: string,
//   filePath: string
// ): Promise<Documentation["props"] | undefined> => {
//   const componentsInfo = parse(contents, {
//     babelOptions: {
//       filename: filePath,
//       babelrc: false,
//     },
//   });

//   if (componentsInfo.length > 0 && componentsInfo[0]) {
//     return componentsInfo[0].props;
//   } else {
//     return undefined;
//   }
// };
