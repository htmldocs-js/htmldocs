import { PluginBuild, OnLoadArgs, OnLoadResult } from "esbuild";
import { Documentation, parse } from "react-docgen";
import { randomBytes } from "crypto";
import fs from "fs";
import path from "path";
import * as tsj from "ts-json-schema-generator";
import { DOCUMENT_SCHEMAS_DIR } from "./paths";

export const propsToSchemaPlugin = (
  documentTemplates: string[]
): { name: string; setup: (build: PluginBuild) => void } => {
  return {
    name: "props-to-schema",
    setup(build: PluginBuild) {
      build.onLoad(
        { filter: new RegExp(documentTemplates.join("|")) },
        async (args: OnLoadArgs): Promise<OnLoadResult> => {
          const contents = await fs.promises.readFile(args.path, "utf8");
          const componentProps = await parseFileToProps(contents, args.path);
          const randomSuffix = randomBytes(4).toString("hex");
          const componentInterfaceName = `ComponentProps_${randomSuffix}`;
          let interfaceContent = `export interface ${componentInterfaceName} {\n`;

          for (const propName in componentProps) {
            const prop = componentProps[propName];
            if (!prop || !prop.tsType) continue;
            const required = prop.required ? "" : "?";
            const tsType =
              "raw" in prop.tsType ? prop.tsType.raw : prop.tsType?.name;
            interfaceContent += `  ${propName}${required}: ${tsType};\n`;
          }

          interfaceContent += `}\n`;
          const fileContents = contents + "\n" + interfaceContent;
          const tempFilePath = createTempFilePath(args.path);

          fs.writeFileSync(tempFilePath, fileContents);
          const config = {
            path: tempFilePath,
            tsconfig:
              process.env.NEXT_PUBLIC_USER_PROJECT_LOCATION + "/tsconfig.json",
            type: componentInterfaceName,
          };

          const schema = tsj.createGenerator(config).createSchema(config.type);
          const schemaString = JSON.stringify(schema, null, 2);
          console.log(schemaString);

          if (!fs.existsSync(DOCUMENT_SCHEMAS_DIR)) {
            fs.mkdirSync(DOCUMENT_SCHEMAS_DIR, { recursive: true });
          }
          const schemaFilePath = path.join(DOCUMENT_SCHEMAS_DIR, `${path.basename(args.path)}.json`);
          fs.writeFileSync(schemaFilePath, schemaString);
          console.log(`Schema saved to ${schemaFilePath}`);

          return {
            contents: contents,
            loader: "tsx",
          };
        }
      );
    },
  };
};

function createTempFilePath(filePath: string): string {
  const baseName = path.basename(filePath, path.extname(filePath));
  const dirName = path.dirname(filePath);
  const extension = path.extname(filePath).replace(".", "");
  const tempFileName = `.${baseName}.${extension}`;
  const tempFilePath = path.join(dirName, tempFileName);
  return tempFilePath;
}

const parseFileToProps = async (
  contents: string,
  filePath: string
): Promise<Documentation["props"] | undefined> => {
  const componentsInfo = parse(contents, {
    babelOptions: {
      filename: filePath,
      babelrc: false,
    },
  });

  if (componentsInfo.length > 0 && componentsInfo[0]) {
    return componentsInfo[0].props;
  } else {
    return undefined;
  }
};
