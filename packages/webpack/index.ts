import fs from "fs-extra";
import path from "path";
// import ts from "typescript";
// import * as babelParser from "@babel/parser";
// import traverse from "@babel/traverse";
// import * as t from "@babel/types";
// import generate from "@babel/generator";
import { Compilation, Compiler } from "webpack";

interface UseValueCall {
  variableName: string;
  type: string;
  key: string;
}

interface UseValueCallWithValue extends UseValueCall {
  value: any;
}

export const PLUGIN_NAME = 'useValuePlugin';

function createTempFilePath(filePath: string): string {
  const baseName = path.basename(filePath, path.extname(filePath));
  const dirName = path.dirname(filePath);
  const tempFileName = `.${baseName}.ts`;
  const tempFilePath = path.join(dirName, tempFileName);
  return tempFilePath;
}

class UseValuePlugin {
  dataFilePath: string;

  constructor(dataFilePath: string) {
    this.dataFilePath = dataFilePath;
  }

  apply(compiler: Compiler) {
    const { webpack } = compiler;
    const { RawSource } = webpack.sources;

    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation: Compilation) => {
      compilation.hooks.processAssets.tapPromise(
        {
          name: PLUGIN_NAME,
          stage: Compilation.PROCESS_ASSETS_STAGE_DEV_TOOLING,
        },
        async (assets: { [key: string]: any }) => {
          console.log("assets", assets);
          // await Promise.all(
          //   Object.keys(assets).map(async (fileName) => {
          //     if (/\.(tsx?|jsx?)$/.test(fileName)) {
          //       const filePath = path.join(compiler.outputPath, fileName);
          //       const source = await fs.promises.readFile(filePath, "utf8");

          //       let data: { [key: string]: any } = {};
          //       try {
          //         data = JSON.parse(await fs.promises.readFile(this.dataFilePath, "utf8"));
          //       } catch (error) {
          //         console.error('Error reading or parsing the data context JSON file:', error);
          //         return;
          //       }

          //       let scriptKind = ts.ScriptKind.TS;
          //       let defaultType = "any";
          //       let loader = "js";
          //       if (filePath.endsWith(".tsx") || filePath.endsWith(".jsx")) {
          //         scriptKind = ts.ScriptKind.TSX;
          //       }
          //       if (filePath.endsWith(".js") || filePath.endsWith(".jsx")) {
          //         defaultType = "any";
          //       }
          //       if (filePath.endsWith(".tsx")) {
          //         loader = "tsx";
          //       } else if (filePath.endsWith(".jsx")) {
          //         loader = "jsx";
          //       } else if (filePath.endsWith(".ts")) {
          //         loader = "ts";
          //       } else if (filePath.endsWith(".js")) {
          //         loader = "js";
          //       }

          //       const sourceFile = ts.createSourceFile(
          //         filePath,
          //         source,
          //         ts.ScriptTarget.ES2015,
          //         true,
          //         scriptKind
          //       );

          //       function findUseValueCalls(sourceFile: ts.SourceFile) {
          //         const useValueCalls: UseValueCall[] = [];

          //         function visit(node: ts.Node) {
          //           if (ts.isCallExpression(node)) {
          //             const expression = node.expression;
          //             if (ts.isIdentifier(expression) && expression.text === "useValue") {
          //               const typeArg = node.typeArguments?.[0];
          //               const firstArg = node.arguments[0];
          //               let type = defaultType;
          //               if (typeArg) {
          //                 type = typeArg.getText(sourceFile);
          //               }
          //               if (firstArg && ts.isStringLiteral(firstArg)) {
          //                 const key = firstArg.text;
          //                 let variableName = "";
          //                 if (ts.isVariableDeclaration(node.parent) && ts.isIdentifier(node.parent.name)) {
          //                   variableName = node.parent.name.text;
          //                 }
          //                 useValueCalls.push({ type, key, variableName });
          //               }
          //             }
          //           }
          //           ts.forEachChild(node, visit);
          //         }

          //         visit(sourceFile);
          //         return useValueCalls;
          //       }

          //       const createASTNodeFromValue = (
          //         call: UseValueCallWithValue
          //       ): t.Expression => {
          //         if (Array.isArray(call.value)) {
          //           return t.arrayExpression(
          //             call.value.map(item => createASTNodeFromValue({
          //               ...call,
          //               type: typeof item,
          //               value: item
          //             }))
          //           );
          //         } else if (typeof call.value === "object") {
          //           return t.objectExpression(
          //             Object.entries(call.value).map(([key, value]) =>
          //               t.objectProperty(
          //                 t.identifier(key),
          //                 createASTNodeFromValue({
          //                   type: typeof value,
          //                   key,
          //                   value,
          //                   variableName: call.variableName
          //                 })
          //               )
          //             )
          //           );
          //         } else if (call.type === "string") {
          //           if (typeof call.value !== "string") {
          //             throw TypeError(
          //               `useValue key "${call.key}" is not a string`
          //             );
          //           }
          //           return t.stringLiteral(call.value);
          //         } else if (call.type === "number") {
          //           if (typeof call.value !== "number") {
          //             throw TypeError(
          //               `useValue key "${call.key}" is not a number`
          //             );
          //           }
          //           return t.numericLiteral(call.value);
          //         } else if (call.type === "boolean") {
          //           if (typeof call.value !== "boolean") {
          //             throw TypeError(
          //               `useValue key "${call.key}" is not a boolean`
          //             );
          //           }
          //           return t.booleanLiteral(call.value);
          //         } else if (call.type === "Date") {
          //           if (typeof call.value === "string") {
          //             return t.callExpression(t.identifier("Date"), [
          //               t.stringLiteral(call.value),
          //             ]);
          //           } else if (typeof call.value === "number") {
          //             return t.newExpression(t.identifier("Date"), [
          //               t.numericLiteral(call.value),
          //             ]);
          //           } else {
          //             throw TypeError(
          //               `useValue key "${call.key}" is not a valid date type`
          //             );
          //           }
          //         } else if (call.type === "any") {
          //             return createASTNodeFromValue({
          //                 ...call,
          //                 type: typeof call.value
          //             });
          //         } else {
          //           if (typeof call.value !== "object") {
          //             throw TypeError(`Expected an object for type '${call.type}', but got ${typeof call.value}`);
          //           }
          //           return t.objectExpression(
          //             Object.entries(call.value).map(([key, value]) =>
          //               t.objectProperty(
          //                 t.identifier(key),
          //                 createASTNodeFromValue({
          //                   type: typeof value,
          //                   key,
          //                   value,
          //                   variableName: call.variableName
          //                 })
          //               )
          //             )
          //           );
          //         }
          //       };

          //       const calls = findUseValueCalls(sourceFile);
          //       if (calls.length > 0) {
          //         const ast = babelParser.parse(source, {
          //           sourceType: "module",
          //           plugins: ["jsx", "typescript"],
          //         });

          //         traverse(ast, {
          //           VariableDeclarator(path) {
          //             if (
          //               path.node.init &&
          //               t.isCallExpression(path.node.init) &&
          //               t.isIdentifier(path.node.init.callee) &&
          //               path.node.init.callee.name === "useValue"
          //             ) {
          //               if (t.isIdentifier(path.node.id)) {
          //                 const variableName = path.node.id.name;
          //                 const callExpression = path.node.init;

          //                 if (!variableName) {
          //                   throw Error("Variable name expected on LHS of useValue call");
          //                 }

          //                 if (
          //                   callExpression.arguments.length > 0 &&
          //                   callExpression.arguments[0] &&
          //                   callExpression.arguments[0].type === "StringLiteral"
          //                 ) {
          //                   const key = callExpression.arguments[0].value;
          //                   let value = calls.find((call) => call.variableName === variableName);

          //                   if (!data[key]) {
          //                     throw Error(`No value provided for useValue key "${key}"`);
          //                   }

          //                   if (!value) {
          //                     throw Error(`Failed to parse useValue key "${key}", no type found.`);
          //                   }

          //                   const augmentedValue: UseValueCallWithValue = {
          //                     ...value,
          //                     value: data[key],
          //                   };

          //                   const replacementNode = createASTNodeFromValue(augmentedValue);

          //                   if (replacementNode) {
          //                     path.node.init = replacementNode;
          //                     if (augmentedValue.type !== "any") {
          //                       path.node.id.typeAnnotation = t.tsTypeAnnotation(
          //                         t.tsTypeReference(t.identifier(augmentedValue.type))
          //                       );
          //                     }
          //                   }
          //                 }
          //               }
          //             }
          //           },
          //         });

          //         const useValueAST = t.file(t.program([]));

          //         traverse(ast, {
          //           ImportDeclaration(path) {
          //             if (path.node.source.value !== "@htmldocs/react") {
          //               useValueAST.program.body.push(path.node);
          //             }
          //           },
          //           TSInterfaceDeclaration(path) {
          //             useValueAST.program.body.push(path.node);
          //           },
          //           TSTypeAliasDeclaration(path) {
          //             useValueAST.program.body.push(path.node);
          //           },
          //         });

          //         calls.forEach(call => {
          //           const valueNode = createASTNodeFromValue({
          //             ...call,
          //             value: data[call.key]
          //           });

          //           const variableDeclaration = t.variableDeclaration("const", [
          //             t.variableDeclarator(t.identifier(call.variableName), valueNode)
          //           ]);

          //           if (call.type !== "any" && variableDeclaration.declarations[0]?.id && t.isIdentifier(variableDeclaration.declarations[0].id)) {
          //               variableDeclaration.declarations[0].id.typeAnnotation = t.tsTypeAnnotation(
          //                   t.tsTypeReference(t.identifier(call.type))
          //               );
          //           }

          //           useValueAST.program.body.push(variableDeclaration);
          //         });

          //         const output = generate(ast);
          //         const flattenedUseValueOutput = generate(useValueAST);

          //         const tempFilePath = createTempFilePath(filePath);

          //         fs.writeFileSync(tempFilePath, flattenedUseValueOutput.code);
          //         const tscCommand = `tsc --noEmit --jsx react-jsx --esModuleInterop --skipLibCheck ${tempFilePath}`;
          //         const { execSync } = require('child_process');
          //         try {
          //           execSync(tscCommand);
          //         } catch (error: any) {
          //           console.error('TypeScript compilation error:', error.stdout.toString().replace(tempFilePath, filePath));
          //         }
          //         fs.unlinkSync(tempFilePath);

          //         compilation.updateAsset(fileName, new RawSource(output.code));
          //       }
          //     }
          //   })
          // );
        }
      );
    });
  }
}

export default UseValuePlugin;
