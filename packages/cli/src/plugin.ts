import fs from "fs-extra";
import path from "path";

// used to extract types from useValue calls
import ts from "typescript";

// used to replace useValue calls with the actual value
import * as babelParser from "@babel/parser";
import traverse from "@babel/traverse";
import * as t from "@babel/types";
import generate from "@babel/generator";

interface UseValueCall {
  variableName: string;
  type: string;
  key: string;
}

interface UseValueCallWithValue extends UseValueCall {
  value: any;
}

export const PLUGIN_NAME = "useValuePlugin";

// create a temporary file in the same directory for type checking after replacing useValue calls
function createTempFilePath(filePath: string): string {
  const baseName = path.basename(filePath, path.extname(filePath));
  const dirName = path.dirname(filePath);
  const tempFileName = `.${baseName}.ts`;
  const tempFilePath = path.join(dirName, tempFileName);
  return tempFilePath;
}

export function createUseValuePlugin(dataFilePath: string) {
  return {
    name: PLUGIN_NAME,
    setup(build: any) {
      build.onLoad({ filter: /\.(tsx?|jsx?)$/ }, async (args: any) => {
        const filePath = args.path;
        const source = await fs.promises.readFile(filePath, "utf8");

        // Read data from JSON file
        let data: Record<string, any> = {};
        try {
          data = JSON.parse(await fs.promises.readFile(dataFilePath, "utf8"));
        } catch (error) {
          console.error(
            "Error reading or parsing the data context JSON file:",
            error
          );
          process.exit(1);
        }

        // Determine script kind and default type based on file extension
        let scriptKind = ts.ScriptKind.TS;
        let defaultType = "any"; // Default type for JS files
        let loader = "js"; // Default loader for JS files
        if (filePath.endsWith(".tsx") || filePath.endsWith(".jsx")) {
          scriptKind = ts.ScriptKind.TSX;
        }
        if (filePath.endsWith(".js") || filePath.endsWith(".jsx")) {
          defaultType = "any"; // Use 'any' for JavaScript files
        }

        // define loader
        if (filePath.endsWith(".tsx")) {
          loader = "tsx";
        } else if (filePath.endsWith(".jsx")) {
          loader = "jsx";
        } else if (filePath.endsWith(".ts")) {
          loader = "ts";
        } else if (filePath.endsWith(".js")) {
          loader = "js";
        }

        const sourceFile = ts.createSourceFile(
          filePath,
          source,
          ts.ScriptTarget.ES2015,
          /*setParentNodes */ true,
          scriptKind
        );

        function findUseValueCalls(sourceFile: ts.SourceFile) {
          const useValueCalls: UseValueCall[] = [];

          function visit(node: ts.Node) {
            if (ts.isCallExpression(node)) {
              const expression = node.expression;
              if (
                ts.isIdentifier(expression) &&
                expression.text === "useValue"
              ) {
                const typeArg = node.typeArguments?.[0];
                const firstArg = node.arguments[0];
                let type = defaultType; // Default to 'any' for JS files or if no type argument is provided
                if (typeArg) {
                  type = typeArg.getText(sourceFile); // Extract type for TS files
                }
                if (firstArg && ts.isStringLiteral(firstArg)) {
                  const key = firstArg.text;

                  let variableName = "";
                  if (
                    ts.isVariableDeclaration(node.parent) &&
                    ts.isIdentifier(node.parent.name)
                  ) {
                    variableName = node.parent.name.text;
                  }
                  useValueCalls.push({ type, key, variableName });
                }
              }
            }
            ts.forEachChild(node, visit);
          }

          visit(sourceFile);

          return useValueCalls;
        }

        const createASTNodeFromValue = (
          call: UseValueCallWithValue
        ): t.Expression => {
          if (Array.isArray(call.value)) {
            return t.arrayExpression(
              call.value.map((item) =>
                createASTNodeFromValue({
                  ...call,
                  type: typeof item,
                  value: item,
                })
              )
            );
          } else if (typeof call.value === "object") {
            return t.objectExpression(
              Object.entries(call.value).map(([key, value]) =>
                t.objectProperty(
                  t.identifier(key),
                  createASTNodeFromValue({
                    type: typeof value,
                    key,
                    value,
                    variableName: call.variableName,
                  })
                )
              )
            );
          } else if (call.type === "string") {
            if (typeof call.value !== "string") {
              throw TypeError(`useValue key "${call.key}" is not a string`);
            }
            return t.stringLiteral(call.value);
          } else if (call.type === "number") {
            if (typeof call.value !== "number") {
              throw TypeError(`useValue key "${call.key}" is not a number`);
            }
            return t.numericLiteral(call.value);
          } else if (call.type === "boolean") {
            if (typeof call.value !== "boolean") {
              throw TypeError(`useValue key "${call.key}" is not a boolean`);
            }
            return t.booleanLiteral(call.value);
          } else if (call.type === "Date") {
            if (typeof call.value === "string") {
              return t.callExpression(t.identifier("Date"), [
                t.stringLiteral(call.value),
              ]);
            } else if (typeof call.value === "number") {
              return t.newExpression(t.identifier("Date"), [
                t.numericLiteral(call.value),
              ]);
            } else {
              throw TypeError(
                `useValue key "${call.key}" is not a valid date type`
              );
            }
          } else if (call.type === "any") {
            // if any, default to runtime type checking
            return createASTNodeFromValue({
              ...call,
              type: typeof call.value,
            });
          } else {
            // handle custom types
            if (typeof call.value !== "object") {
              throw TypeError(
                `Expected an object for type '${call.type}', but got ${typeof call.value}`
              );
            }

            return t.objectExpression(
              Object.entries(call.value).map(([key, value]) =>
                t.objectProperty(
                  t.identifier(key),
                  createASTNodeFromValue({
                    type: typeof value,
                    key,
                    value,
                    variableName: call.variableName,
                  })
                )
              )
            );
          }
        };

        const calls = findUseValueCalls(sourceFile);
        if (calls.length > 0) {
          // run babel to traverse and replace useValue calls with the actual value
          const ast = babelParser.parse(source, {
            sourceType: "module",
            plugins: ["jsx", "typescript"],
          });

          // @ts-ignore
          traverse.default(ast, {
            // @ts-ignore
            VariableDeclarator(path) {
              if (
                path.node.init &&
                t.isCallExpression(path.node.init) &&
                t.isIdentifier(path.node.init.callee) &&
                path.node.init.callee.name === "useValue"
              ) {
                if (t.isIdentifier(path.node.id)) {
                  const variableName = path.node.id.name;
                  const callExpression = path.node.init;

                  // TODO: support destructuring
                  if (!variableName) {
                    throw Error(
                      "Variable name expected on LHS of useValue call"
                    );
                  }

                  if (
                    callExpression.arguments.length > 0 &&
                    callExpression.arguments[0] &&
                    callExpression.arguments[0].type === "StringLiteral"
                  ) {
                    const key = callExpression.arguments[0].value;
                    let value = calls.find(
                      (call) => call.variableName === variableName
                    );

                    if (!data[key]) {
                      throw Error(
                        `No value provided for useValue key "${key}"`
                      );
                    }

                    if (!value) {
                      throw Error(
                        `Failed to parse useValue key "${key}", no type found.`
                      );
                    }

                    const augmentedValue: UseValueCallWithValue = {
                      ...value,
                      value: data[key],
                    };

                    const replacementNode =
                      createASTNodeFromValue(augmentedValue);

                    if (replacementNode) {
                      path.node.init = replacementNode;
                      if (augmentedValue.type !== "any") {
                        // Add type annotation to variable declarator
                        path.node.id.typeAnnotation = t.tsTypeAnnotation(
                          t.tsTypeReference(t.identifier(augmentedValue.type))
                        );
                      }
                    }
                  }
                }
              }
            },
          });

          const useValueAST = t.file(t.program([])); // Start with an empty program

          // @ts-ignore
          traverse.default(ast, {
            // @ts-ignore
            ImportDeclaration(path) {
              if (path.node.source.value !== "@htmldocs/react") {
                useValueAST.program.body.push(path.node);
              }
            },
            // @ts-ignore
            TSInterfaceDeclaration(path) {
              useValueAST.program.body.push(path.node);
            },
            // @ts-ignore
            TSTypeAliasDeclaration(path) {
              useValueAST.program.body.push(path.node);
            },
          });

          calls.forEach((call) => {
            const valueNode = createASTNodeFromValue({
              ...call,
              value: data[call.key],
            });

            const variableDeclaration = t.variableDeclaration("const", [
              t.variableDeclarator(t.identifier(call.variableName), valueNode),
            ]);

            if (
              call.type !== "any" &&
              variableDeclaration.declarations[0] &&
              t.isIdentifier(variableDeclaration.declarations[0].id)
            ) {
              variableDeclaration.declarations[0].id.typeAnnotation =
                t.tsTypeAnnotation(t.tsTypeReference(t.identifier(call.type)));
            }

            useValueAST.program.body.push(variableDeclaration);
          });

          // @ts-ignore
          const output = generate.default(ast);
          // @ts-ignore
          const flattenedUseValueOutput = generate.default(useValueAST);

          // perform typecheck on replaced types
          const tempFilePath = createTempFilePath(filePath);

          fs.writeFileSync(tempFilePath, flattenedUseValueOutput.code);
          const tscCommand = `tsc --noEmit --jsx react-jsx --esModuleInterop --skipLibCheck ${tempFilePath}`;
          const { execSync } = require("child_process");
          try {
            execSync(tscCommand);
          } catch (error: any) {
            console.error(
              "TypeScript compilation error:",
              error.stdout.toString().replace(tempFilePath, filePath)
            );
          }
          fs.unlinkSync(tempFilePath);

          return {
            contents: output.code,
            loader: loader,
          };
        }

        return null;
      });
    },
  };
}
