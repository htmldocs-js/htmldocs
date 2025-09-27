#!/usr/bin/env node
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _async_iterator(iterable) {
    var method, async, sync, retry = 2;
    for("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;){
        if (async && null != (method = iterable[async])) return method.call(iterable);
        if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable));
        async = "@@asyncIterator", sync = "@@iterator";
    }
    throw new TypeError("Object is not async iterable");
}
function AsyncFromSyncIterator(s) {
    function AsyncFromSyncIteratorContinuation(r) {
        if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object."));
        var done = r.done;
        return Promise.resolve(r.value).then(function(value) {
            return {
                value: value,
                done: done
            };
        });
    }
    return AsyncFromSyncIterator = function(s) {
        this.s = s, this.n = s.next;
    }, AsyncFromSyncIterator.prototype = {
        s: null,
        n: null,
        next: function() {
            return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments));
        },
        return: function(value) {
            var ret = this.s.return;
            return void 0 === ret ? Promise.resolve({
                value: value,
                done: !0
            }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments));
        },
        throw: function(value) {
            var thr = this.s.return;
            return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments));
        }
    }, new AsyncFromSyncIterator(s);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
// src/cli/index.ts
import { program } from "commander";
// package.json
var package_default = {
    name: "htmldocs",
    keywords: [
        "pdf",
        "document",
        "generator",
        "react",
        "typescript",
        "tailwind",
        "jsx",
        "template",
        "invoice",
        "resume",
        "report",
        "contract",
        "pdf-generator",
        "pdf-template",
        "pdf-document",
        "pdf-editor",
        "pdf-creator",
        "latex",
        "pagedjs",
        "react-pdf",
        "typst",
        "invoice-generator",
        "resume-generator",
        "report-generator",
        "contract-generator"
    ],
    version: "0.2.30",
    homepage: "https://htmldocs.com",
    repository: {
        type: "git",
        url: "https://github.com/htmldocs-js/htmldocs"
    },
    bin: {
        htmldocs: "./dist/cli/index.mjs"
    },
    scripts: {
        init: "npx playwright install",
        build: "node build-preview-server.mjs && pnpm build-cli",
        "build:dev": "node build-preview-server.mjs && pnpm build-cli:dev",
        "build-cli": "API_URL=https://htmldocs.com tsup-node",
        "build-cli:dev": "API_URL=http://localhost:3000 tsup-node && pnpm link --global",
        dev: "next dev",
        start: "next start",
        lint: "next lint",
        tsc: "tsc",
        test: "vitest",
        "test:coverage": "vitest run --coverage"
    },
    dependencies: {
        "@babel/core": "^7.24.6",
        "@babel/parser": "^7.24.5",
        "@babel/preset-typescript": "^7.24.6",
        "@htmldocs/render": "workspace:*",
        "@next/bundle-analyzer": "^15.1.6",
        "@phosphor-icons/react": "^2.1.5",
        "@radix-ui/react-collapsible": "^1.0.3",
        "@radix-ui/react-dialog": "^1.1.1",
        "@radix-ui/react-dropdown-menu": "^2.0.6",
        "@radix-ui/react-icons": "^1.3.0",
        "@radix-ui/react-label": "^2.1.0",
        "@radix-ui/react-scroll-area": "^1.0.5",
        "@radix-ui/react-slot": "^1.0.2",
        "@radix-ui/react-switch": "^1.1.0",
        "@radix-ui/react-tabs": "^1.0.4",
        "@radix-ui/react-toggle-group": "^1.0.4",
        "@radix-ui/react-tooltip": "^1.0.7",
        "@tailwindcss/typography": "0.5.9",
        "adm-zip": "^0.5.14",
        autoprefixer: "^10.4.19",
        chalk: "^4.1.2",
        chokidar: "^3.6.0",
        "class-variance-authority": "^0.7.0",
        clsx: "^2.1.1",
        commander: "^12.1.0",
        cva: "1.0.0-beta.1",
        debounce: "^2.0.0",
        dotenv: "^16.4.7",
        esbuild: "^0.21.3",
        "esbuild-plugin-tsc": "^0.4.0",
        "esbuild-style-plugin": "^1.6.3",
        "form-data": "^4.0.0",
        "framer-motion": "^11.2.6",
        "fs-extra": "^11.2.0",
        inquirer: "^11.0.2",
        lodash: "^4.17.21",
        "log-symbols": "^4.1.0",
        "mime-types": "^2.1.35",
        next: "14.2.3",
        "next-themes": "^0.3.0",
        "node-fetch": "^2.7.0",
        onetime: "^7.0.0",
        open: "^8.4.2",
        ora: "^5.4.1",
        pino: "^9.3.2",
        playwright: "^1.44.1",
        postcss: "^8.4.38",
        react: "^18.2.0",
        "react-docgen": "^7.0.3",
        "react-dom": "^18.2.0",
        "socket.io": "^4.7.5",
        "socket.io-client": "^4.7.5",
        sonner: "^1.4.41",
        "source-map-js": "^1.2.0",
        "tailwind-merge": "^2.3.0",
        tailwindcss: "^3.4.3",
        "tailwindcss-animate": "^1.0.7",
        "ts-json-schema-generator": "^2.2.0",
        zod: "^3.23.8"
    },
    devDependencies: {
        "@swc/core": "^1.5.7",
        "@types/babel__core": "^7.20.5",
        "@types/json-schema": "^7.0.15",
        "@types/mime-types": "^2.1.4",
        "@types/node": "^20",
        "@types/react": "^18.2.61",
        "@types/react-dom": "^18.2.19",
        tsup: "^8.0.2",
        typescript: "^5"
    }
};
// src/cli/commands/dev.ts
import fs3 from "node:fs";
import path6 from "node:path";
// src/cli/utils/preview/start-dev-server.ts
import path2 from "node:path";
import http from "node:http";
import url from "node:url";
import next from "next";
import ora from "ora";
import logSymbols from "log-symbols";
import chalk from "chalk";
// src/cli/utils/close-ora-on-sigint.ts
var closeOraOnSIGINT = function(spinner) {
    process.on("SIGINT", function() {
        spinner.stop();
    });
};
// src/cli/utils/preview/serve-static-file.ts
import path from "node:path";
import { promises as fs } from "node:fs";
import { lookup } from "mime-types";
var serveStaticFile = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(res, parsedUrl, staticDirRelativePath) {
        var staticBaseDir, pathname, ext, fileAbsolutePath, fileHandle, fileData, exception;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    staticBaseDir = path.join(process.cwd(), staticDirRelativePath);
                    pathname = parsedUrl.pathname;
                    ext = path.parse(pathname).ext;
                    fileAbsolutePath = path.join(staticBaseDir, pathname);
                    return [
                        4,
                        fs.open(fileAbsolutePath, "r")
                    ];
                case 1:
                    fileHandle = _state.sent();
                    _state.label = 2;
                case 2:
                    _state.trys.push([
                        2,
                        4,
                        5,
                        6
                    ]);
                    return [
                        4,
                        fs.readFile(fileHandle)
                    ];
                case 3:
                    fileData = _state.sent();
                    res.setHeader("Content-type", lookup(ext) || "text/plain");
                    res.end(fileData);
                    return [
                        3,
                        6
                    ];
                case 4:
                    exception = _state.sent();
                    console.error("Could not read file at ".concat(fileAbsolutePath, " to be served, here's the exception:"), exception);
                    res.statusCode = 500;
                    res.end("Could not read file to be served! Check your terminal for more information.");
                    return [
                        3,
                        6
                    ];
                case 5:
                    fileHandle.close();
                    return [
                        7
                    ];
                case 6:
                    return [
                        2
                    ];
            }
        });
    });
    return function serveStaticFile(res, parsedUrl, staticDirRelativePath) {
        return _ref.apply(this, arguments);
    };
}();
// src/cli/utils/preview/start-dev-server.ts
import { fileURLToPath } from "url";
import { dirname } from "path";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var devServer;
var safeAsyncServerListen = function(server, port) {
    return new Promise(function(resolve) {
        server.listen(port, function() {
            resolve({
                portAlreadyInUse: false
            });
        });
        server.on("error", function(e) {
            if (e.code === "EADDRINUSE") {
                resolve({
                    portAlreadyInUse: true
                });
            }
        });
    });
};
var isRunningBuilt = __filename.endsWith(path2.join("cli", "index.mjs"));
var cliPackageLocation = isRunningBuilt ? path2.resolve(__dirname, "../") : path2.resolve(__dirname, "../../../..");
var previewServerLocation = isRunningBuilt ? path2.resolve(__dirname, "../preview") : path2.resolve(__dirname, "../../../..");
var startDevServer = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(documentsDirRelativePath2, staticBaseDirRelativePath, port) {
        var portAlreadyInUse, nextPortToTry, spinner, timeBeforeNextReady, app, isNextReady, nextReadyPromise, nextHandleRequest, secondsToNextReady;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    devServer = http.createServer(function(req, res) {
                        if (!req.url) {
                            res.end(404);
                            return;
                        }
                        var parsedUrl = url.parse(req.url, true);
                        res.setHeader("Cache-Control", "no-cache, max-age=0, must-revalidate, no-store");
                        res.setHeader("Pragma", "no-cache");
                        res.setHeader("Expires", "-1");
                        try {
                            if (parsedUrl.path && parsedUrl.path.includes("static/") && !parsedUrl.path.includes("_next/static/")) {
                                void serveStaticFile(res, parsedUrl, staticBaseDirRelativePath);
                            } else if (!isNextReady) {
                                void nextReadyPromise.then(function() {
                                    return nextHandleRequest === null || nextHandleRequest === void 0 ? void 0 : nextHandleRequest(req, res, parsedUrl);
                                });
                            } else {
                                void (nextHandleRequest === null || nextHandleRequest === void 0 ? void 0 : nextHandleRequest(req, res, parsedUrl));
                            }
                        } catch (e) {
                            console.error("caught error", e);
                            res.writeHead(500);
                            res.end();
                        }
                    });
                    return [
                        4,
                        safeAsyncServerListen(devServer, port)
                    ];
                case 1:
                    portAlreadyInUse = _state.sent().portAlreadyInUse;
                    if (!portAlreadyInUse) {
                        console.log(chalk.greenBright("    htmldocs ".concat(package_default.version)));
                        console.log("    Running preview at:          http://localhost:".concat(port, "\n"));
                    } else {
                        nextPortToTry = port + 1;
                        console.warn(" ".concat(logSymbols.warning, " Port ").concat(port, " is already in use, trying ").concat(nextPortToTry));
                        return [
                            2,
                            startDevServer(documentsDirRelativePath2, staticBaseDirRelativePath, nextPortToTry)
                        ];
                    }
                    devServer.on("close", /*#__PURE__*/ _async_to_generator(function() {
                        return _ts_generator(this, function(_state) {
                            switch(_state.label){
                                case 0:
                                    return [
                                        4,
                                        app.close()
                                    ];
                                case 1:
                                    _state.sent();
                                    return [
                                        2
                                    ];
                            }
                        });
                    }));
                    devServer.on("error", function(e) {
                        console.error(" ".concat(logSymbols.error, " preview server error: "), JSON.stringify(e));
                        process.exit(1);
                    });
                    spinner = ora({
                        text: "Getting htmldocs preview server ready...\n",
                        prefixText: " "
                    }).start();
                    closeOraOnSIGINT(spinner);
                    timeBeforeNextReady = performance.now();
                    app = next({
                        // passing in env here does not get the environment variables there
                        dev: !isRunningBuilt,
                        hostname: "localhost",
                        port: port,
                        dir: previewServerLocation
                    });
                    isNextReady = false;
                    nextReadyPromise = app.prepare();
                    return [
                        4,
                        nextReadyPromise
                    ];
                case 2:
                    _state.sent();
                    isNextReady = true;
                    nextHandleRequest = app.getRequestHandler();
                    secondsToNextReady = ((performance.now() - timeBeforeNextReady) / 1e3).toFixed(1);
                    spinner.stopAndPersist({
                        text: "Ready in ".concat(secondsToNextReady, "s\n"),
                        symbol: logSymbols.success
                    });
                    return [
                        2,
                        devServer
                    ];
            }
        });
    });
    return function startDevServer(documentsDirRelativePath2, staticBaseDirRelativePath, port) {
        return _ref.apply(this, arguments);
    };
}();
var makeExitHandler = function(options) {
    return function(_codeOrSignal) {
        if (typeof devServer !== "undefined") {
            console.log("\nshutting down dev server");
            devServer.close();
            devServer = void 0;
        }
        if (options === null || options === void 0 ? void 0 : options.shouldKillProcess) {
            process.exit(options.killWithErrorCode ? 1 : 0);
        }
    };
};
process.on("exit", makeExitHandler());
process.on("SIGINT", makeExitHandler({
    shouldKillProcess: true,
    killWithErrorCode: false
}));
process.on("SIGUSR1", makeExitHandler({
    shouldKillProcess: true,
    killWithErrorCode: false
}));
process.on("SIGUSR2", makeExitHandler({
    shouldKillProcess: true,
    killWithErrorCode: false
}));
// src/cli/utils/preview/hot-reloading/setup-hot-reloading.ts
import path4 from "node:path";
import { watch } from "chokidar";
import debounce from "debounce";
import { Server as SocketServer } from "socket.io";
// src/cli/utils/preview/hot-reloading/create-dependency-graph.ts
import path3 from "node:path";
import { existsSync, promises as fs2, statSync } from "node:fs";
// src/cli/utils/preview/hot-reloading/get-imported-modules.ts
import { traverse } from "@babel/core";
import { parse } from "@babel/parser";
var getImportedModules = function(contents) {
    var importedPaths = [];
    var parsedContents = parse(contents, {
        sourceType: "unambiguous",
        strictMode: false,
        errorRecovery: true,
        plugins: [
            "jsx",
            "typescript"
        ]
    });
    traverse(parsedContents, {
        ImportDeclaration: function ImportDeclaration(param) {
            var node = param.node;
            importedPaths.push(node.source.value);
        },
        ExportAllDeclaration: function ExportAllDeclaration(param) {
            var node = param.node;
            importedPaths.push(node.source.value);
        },
        ExportNamedDeclaration: function ExportNamedDeclaration(param) {
            var node = param.node;
            if (node.source) {
                importedPaths.push(node.source.value);
            }
        },
        CallExpression: function CallExpression(param) {
            var node = param.node;
            if ("name" in node.callee && node.callee.name === "require") {
                if (node.arguments.length === 1) {
                    var importPathNode = node.arguments[0];
                    if (importPathNode.type === "StringLiteral") {
                        importedPaths.push(importPathNode.value);
                    }
                }
            }
        }
    });
    return importedPaths;
};
// src/cli/utils/preview/hot-reloading/create-dependency-graph.ts
var readAllFilesInsideDirectory = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(directory) {
        var allFilePaths, topLevelDirents, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, dirent, pathToDirent, _, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    allFilePaths = [];
                    return [
                        4,
                        fs2.readdir(directory, {
                            withFileTypes: true
                        })
                    ];
                case 1:
                    topLevelDirents = _state.sent();
                    _iteratorAbruptCompletion = false, _didIteratorError = false;
                    _state.label = 2;
                case 2:
                    _state.trys.push([
                        2,
                        9,
                        10,
                        15
                    ]);
                    _iterator = _async_iterator(topLevelDirents);
                    _state.label = 3;
                case 3:
                    return [
                        4,
                        _iterator.next()
                    ];
                case 4:
                    if (!(_iteratorAbruptCompletion = !(_step = _state.sent()).done)) return [
                        3,
                        8
                    ];
                    _value = _step.value;
                    dirent = _value;
                    pathToDirent = path3.join(directory, dirent.name);
                    if (!dirent.isDirectory()) return [
                        3,
                        6
                    ];
                    _ = allFilePaths.concat;
                    return [
                        4,
                        readAllFilesInsideDirectory(pathToDirent)
                    ];
                case 5:
                    allFilePaths = _.apply(allFilePaths, [
                        _state.sent()
                    ]);
                    return [
                        3,
                        7
                    ];
                case 6:
                    allFilePaths.push(pathToDirent);
                    _state.label = 7;
                case 7:
                    _iteratorAbruptCompletion = false;
                    return [
                        3,
                        3
                    ];
                case 8:
                    return [
                        3,
                        15
                    ];
                case 9:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        15
                    ];
                case 10:
                    _state.trys.push([
                        10,
                        ,
                        13,
                        14
                    ]);
                    if (!(_iteratorAbruptCompletion && _iterator.return != null)) return [
                        3,
                        12
                    ];
                    return [
                        4,
                        _iterator.return()
                    ];
                case 11:
                    _state.sent();
                    _state.label = 12;
                case 12:
                    return [
                        3,
                        14
                    ];
                case 13:
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                    return [
                        7
                    ];
                case 14:
                    return [
                        7
                    ];
                case 15:
                    return [
                        2,
                        allFilePaths
                    ];
            }
        });
    });
    return function readAllFilesInsideDirectory(directory) {
        return _ref.apply(this, arguments);
    };
}();
var isJavascriptModule = function(filePath) {
    var extensionName = path3.extname(filePath);
    return [
        ".js",
        ".ts",
        ".jsx",
        ".tsx",
        ".mjs",
        ".cjs"
    ].includes(extensionName);
};
var checkFileExtensionsUntilItExists = function(pathWithoutExtension) {
    if (existsSync("".concat(pathWithoutExtension, ".ts"))) {
        return "".concat(pathWithoutExtension, ".ts");
    } else if (existsSync("".concat(pathWithoutExtension, ".tsx"))) {
        return "".concat(pathWithoutExtension, ".tsx");
    } else if (existsSync("".concat(pathWithoutExtension, ".js"))) {
        return "".concat(pathWithoutExtension, ".js");
    } else if (existsSync("".concat(pathWithoutExtension, ".jsx"))) {
        return "".concat(pathWithoutExtension, ".jsx");
    } else if (existsSync("".concat(pathWithoutExtension, ".mjs"))) {
        return "".concat(pathWithoutExtension, ".mjs");
    } else if (existsSync("".concat(pathWithoutExtension, ".cjs"))) {
        return "".concat(pathWithoutExtension, ".cjs");
    }
};
var createDependencyGraph = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(directory) {
        var filePaths, modulePaths, graph, getDependencyPaths, updateModuleDependenciesInGraph, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, filePath, err, removeModuleFromGraph;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        readAllFilesInsideDirectory(directory)
                    ];
                case 1:
                    filePaths = _state.sent();
                    modulePaths = filePaths.filter(isJavascriptModule);
                    graph = Object.fromEntries(modulePaths.map(function(path13) {
                        return [
                            path13,
                            {
                                path: path13,
                                dependencyPaths: [],
                                dependentPaths: [],
                                moduleDependencies: []
                            }
                        ];
                    }));
                    getDependencyPaths = /*#__PURE__*/ function() {
                        var _ref = _async_to_generator(function(filePath) {
                            var contents, importedPaths, importedPathsRelativeToDirectory, moduleDependencies, nonNodeModuleImportPathsRelativeToDirectory;
                            return _ts_generator(this, function(_state) {
                                switch(_state.label){
                                    case 0:
                                        return [
                                            4,
                                            fs2.readFile(filePath, "utf8")
                                        ];
                                    case 1:
                                        contents = _state.sent();
                                        importedPaths = getImportedModules(contents);
                                        importedPathsRelativeToDirectory = importedPaths.map(function(dependencyPath) {
                                            var isModulePath = !dependencyPath.startsWith(".");
                                            if (!isModulePath && !path3.isAbsolute(dependencyPath)) {
                                                var pathToDependencyFromDirectory = path3.resolve(/*
                          path.resolve resolves paths differently from what imports on javascript do.
            
                          So if we wouldn't do this, for an email at "/path/to/email.tsx" with a dependecy path of "./other-email" 
                          would end up going into /path/to/email.tsx/other-email instead of /path/to/other-email which is the
                          one the import is meant to go to
                        */ path3.dirname(filePath), dependencyPath);
                                                var isDirectory = false;
                                                try {
                                                    isDirectory = statSync(pathToDependencyFromDirectory).isDirectory();
                                                } catch (_) {}
                                                if (isDirectory) {
                                                    var pathToSubDirectory = pathToDependencyFromDirectory;
                                                    var pathWithExtension = checkFileExtensionsUntilItExists("".concat(pathToSubDirectory, "/index"));
                                                    if (pathWithExtension) {
                                                        pathToDependencyFromDirectory = pathWithExtension;
                                                    } else if (isRunningBuilt) {
                                                        console.warn("Could not find index file for directory at ".concat(pathToDependencyFromDirectory, ". This is probably going to cause issues with both hot reloading and your code."));
                                                    }
                                                }
                                                if (!isJavascriptModule(pathToDependencyFromDirectory)) {
                                                    var pathWithExtension1 = checkFileExtensionsUntilItExists(pathToDependencyFromDirectory);
                                                    if (pathWithExtension1) {
                                                        pathToDependencyFromDirectory = pathWithExtension1;
                                                    } else if (isRunningBuilt) {
                                                        console.warn("Could not determine the file extension for the file at ".concat(pathWithExtension1));
                                                    }
                                                }
                                                return pathToDependencyFromDirectory;
                                            } else {
                                                return dependencyPath;
                                            }
                                        });
                                        moduleDependencies = importedPathsRelativeToDirectory.filter(function(dependencyPath) {
                                            return !dependencyPath.startsWith(".") && !path3.isAbsolute(dependencyPath);
                                        });
                                        nonNodeModuleImportPathsRelativeToDirectory = importedPathsRelativeToDirectory.filter(function(dependencyPath) {
                                            return dependencyPath.startsWith(".") || path3.isAbsolute(dependencyPath);
                                        });
                                        return [
                                            2,
                                            {
                                                dependencyPaths: nonNodeModuleImportPathsRelativeToDirectory,
                                                moduleDependencies: moduleDependencies
                                            }
                                        ];
                                }
                            });
                        });
                        return function getDependencyPaths(filePath) {
                            return _ref.apply(this, arguments);
                        };
                    }();
                    updateModuleDependenciesInGraph = /*#__PURE__*/ function() {
                        var _ref = _async_to_generator(function(moduleFilePath) {
                            var _graph_moduleFilePath, module, _ref, moduleDependencies, newDependencyPaths, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, dependencyPath, dependencyModule, _iteratorNormalCompletion1, _didIteratorError1, _iteratorError1, _iterator1, _step1, dependencyPath1, dependencyModule1;
                            return _ts_generator(this, function(_state) {
                                switch(_state.label){
                                    case 0:
                                        module = (_graph_moduleFilePath = graph[moduleFilePath]) !== null && _graph_moduleFilePath !== void 0 ? _graph_moduleFilePath : {
                                            path: moduleFilePath,
                                            dependencyPaths: [],
                                            dependentPaths: [],
                                            moduleDependencies: []
                                        };
                                        return [
                                            4,
                                            getDependencyPaths(moduleFilePath)
                                        ];
                                    case 1:
                                        _ref = _state.sent(), moduleDependencies = _ref.moduleDependencies, newDependencyPaths = _ref.dependencyPaths;
                                        module.moduleDependencies = moduleDependencies;
                                        _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                                        try {
                                            for(_iterator = module.dependencyPaths[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                                dependencyPath = _step.value;
                                                if (newDependencyPaths.includes(dependencyPath)) continue;
                                                dependencyModule = graph[dependencyPath];
                                                if (dependencyModule !== void 0) {
                                                    dependencyModule.dependentPaths = dependencyModule.dependentPaths.filter(function(dependentPath) {
                                                        return dependentPath !== moduleFilePath;
                                                    });
                                                }
                                            }
                                        } catch (err) {
                                            _didIteratorError = true;
                                            _iteratorError = err;
                                        } finally{
                                            try {
                                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                                    _iterator.return();
                                                }
                                            } finally{
                                                if (_didIteratorError) {
                                                    throw _iteratorError;
                                                }
                                            }
                                        }
                                        module.dependencyPaths = newDependencyPaths;
                                        _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                                        try {
                                            for(_iterator1 = newDependencyPaths[Symbol.iterator](); !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                                                dependencyPath1 = _step1.value;
                                                dependencyModule1 = graph[dependencyPath1];
                                                if (dependencyModule1 !== void 0 && !dependencyModule1.dependentPaths.includes(moduleFilePath)) {
                                                    dependencyModule1.dependentPaths.push(moduleFilePath);
                                                } else {
                                                    graph[dependencyPath1] = {
                                                        path: dependencyPath1,
                                                        moduleDependencies: [],
                                                        dependencyPaths: [],
                                                        dependentPaths: [
                                                            moduleFilePath
                                                        ]
                                                    };
                                                }
                                            }
                                        } catch (err) {
                                            _didIteratorError1 = true;
                                            _iteratorError1 = err;
                                        } finally{
                                            try {
                                                if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                                                    _iterator1.return();
                                                }
                                            } finally{
                                                if (_didIteratorError1) {
                                                    throw _iteratorError1;
                                                }
                                            }
                                        }
                                        graph[moduleFilePath] = module;
                                        return [
                                            2
                                        ];
                                }
                            });
                        });
                        return function updateModuleDependenciesInGraph(moduleFilePath) {
                            return _ref.apply(this, arguments);
                        };
                    }();
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _state.label = 2;
                case 2:
                    _state.trys.push([
                        2,
                        7,
                        8,
                        9
                    ]);
                    _iterator = modulePaths[Symbol.iterator]();
                    _state.label = 3;
                case 3:
                    if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                        3,
                        6
                    ];
                    filePath = _step.value;
                    return [
                        4,
                        updateModuleDependenciesInGraph(filePath)
                    ];
                case 4:
                    _state.sent();
                    _state.label = 5;
                case 5:
                    _iteratorNormalCompletion = true;
                    return [
                        3,
                        3
                    ];
                case 6:
                    return [
                        3,
                        9
                    ];
                case 7:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        9
                    ];
                case 8:
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                    return [
                        7
                    ];
                case 9:
                    removeModuleFromGraph = function(filePath) {
                        var module = graph[filePath];
                        if (module) {
                            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                            try {
                                for(var _iterator = module.dependencyPaths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                    var dependencyPath = _step.value;
                                    if (graph[dependencyPath]) {
                                        graph[dependencyPath].dependentPaths = graph[dependencyPath].dependentPaths.filter(function(dependentPath) {
                                            return dependentPath !== filePath;
                                        });
                                    }
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally{
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                                        _iterator.return();
                                    }
                                } finally{
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }
                            delete graph[filePath];
                        }
                    };
                    return [
                        2,
                        [
                            graph,
                            /*#__PURE__*/ function() {
                                var _ref = /**
     * @param pathToModified - A path relative to the previosuly provided {@link directory}.
     */ _async_to_generator(function(event, pathToModified) {
                                    var filesInsideAddedDirectory, modulesInsideAddedDirectory, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, filePath, err, filesInsideDeletedDirectory, modulesInsideDeletedDirectory, _iteratorAbruptCompletion1, _didIteratorError1, _iteratorError1, _iterator1, _step1, _value1, filePath1, err1;
                                    return _ts_generator(this, function(_state) {
                                        switch(_state.label){
                                            case 0:
                                                switch(event){
                                                    case "change":
                                                        return [
                                                            3,
                                                            1
                                                        ];
                                                    case "add":
                                                        return [
                                                            3,
                                                            4
                                                        ];
                                                    case "addDir":
                                                        return [
                                                            3,
                                                            7
                                                        ];
                                                    case "unlink":
                                                        return [
                                                            3,
                                                            22
                                                        ];
                                                    case "unlinkDir":
                                                        return [
                                                            3,
                                                            23
                                                        ];
                                                }
                                                return [
                                                    3,
                                                    37
                                                ];
                                            case 1:
                                                if (!isJavascriptModule(pathToModified)) return [
                                                    3,
                                                    3
                                                ];
                                                return [
                                                    4,
                                                    updateModuleDependenciesInGraph(pathToModified)
                                                ];
                                            case 2:
                                                _state.sent();
                                                _state.label = 3;
                                            case 3:
                                                return [
                                                    3,
                                                    37
                                                ];
                                            case 4:
                                                if (!isJavascriptModule(pathToModified)) return [
                                                    3,
                                                    6
                                                ];
                                                return [
                                                    4,
                                                    updateModuleDependenciesInGraph(pathToModified)
                                                ];
                                            case 5:
                                                _state.sent();
                                                _state.label = 6;
                                            case 6:
                                                return [
                                                    3,
                                                    37
                                                ];
                                            case 7:
                                                return [
                                                    4,
                                                    readAllFilesInsideDirectory(pathToModified)
                                                ];
                                            case 8:
                                                filesInsideAddedDirectory = _state.sent();
                                                modulesInsideAddedDirectory = filesInsideAddedDirectory.filter(isJavascriptModule);
                                                _iteratorAbruptCompletion = false, _didIteratorError = false;
                                                _state.label = 9;
                                            case 9:
                                                _state.trys.push([
                                                    9,
                                                    15,
                                                    16,
                                                    21
                                                ]);
                                                _iterator = _async_iterator(modulesInsideAddedDirectory);
                                                _state.label = 10;
                                            case 10:
                                                return [
                                                    4,
                                                    _iterator.next()
                                                ];
                                            case 11:
                                                if (!(_iteratorAbruptCompletion = !(_step = _state.sent()).done)) return [
                                                    3,
                                                    14
                                                ];
                                                _value = _step.value;
                                                filePath = _value;
                                                return [
                                                    4,
                                                    updateModuleDependenciesInGraph(filePath)
                                                ];
                                            case 12:
                                                _state.sent();
                                                _state.label = 13;
                                            case 13:
                                                _iteratorAbruptCompletion = false;
                                                return [
                                                    3,
                                                    10
                                                ];
                                            case 14:
                                                return [
                                                    3,
                                                    21
                                                ];
                                            case 15:
                                                err = _state.sent();
                                                _didIteratorError = true;
                                                _iteratorError = err;
                                                return [
                                                    3,
                                                    21
                                                ];
                                            case 16:
                                                _state.trys.push([
                                                    16,
                                                    ,
                                                    19,
                                                    20
                                                ]);
                                                if (!(_iteratorAbruptCompletion && _iterator.return != null)) return [
                                                    3,
                                                    18
                                                ];
                                                return [
                                                    4,
                                                    _iterator.return()
                                                ];
                                            case 17:
                                                _state.sent();
                                                _state.label = 18;
                                            case 18:
                                                return [
                                                    3,
                                                    20
                                                ];
                                            case 19:
                                                if (_didIteratorError) {
                                                    throw _iteratorError;
                                                }
                                                return [
                                                    7
                                                ];
                                            case 20:
                                                return [
                                                    7
                                                ];
                                            case 21:
                                                return [
                                                    3,
                                                    37
                                                ];
                                            case 22:
                                                if (isJavascriptModule(pathToModified)) {
                                                    removeModuleFromGraph(pathToModified);
                                                }
                                                return [
                                                    3,
                                                    37
                                                ];
                                            case 23:
                                                return [
                                                    4,
                                                    readAllFilesInsideDirectory(pathToModified)
                                                ];
                                            case 24:
                                                filesInsideDeletedDirectory = _state.sent();
                                                modulesInsideDeletedDirectory = filesInsideDeletedDirectory.filter(isJavascriptModule);
                                                _iteratorAbruptCompletion1 = false, _didIteratorError1 = false;
                                                _state.label = 25;
                                            case 25:
                                                _state.trys.push([
                                                    25,
                                                    30,
                                                    31,
                                                    36
                                                ]);
                                                _iterator1 = _async_iterator(modulesInsideDeletedDirectory);
                                                _state.label = 26;
                                            case 26:
                                                return [
                                                    4,
                                                    _iterator1.next()
                                                ];
                                            case 27:
                                                if (!(_iteratorAbruptCompletion1 = !(_step1 = _state.sent()).done)) return [
                                                    3,
                                                    29
                                                ];
                                                _value1 = _step1.value;
                                                filePath1 = _value1;
                                                removeModuleFromGraph(filePath1);
                                                _state.label = 28;
                                            case 28:
                                                _iteratorAbruptCompletion1 = false;
                                                return [
                                                    3,
                                                    26
                                                ];
                                            case 29:
                                                return [
                                                    3,
                                                    36
                                                ];
                                            case 30:
                                                err1 = _state.sent();
                                                _didIteratorError1 = true;
                                                _iteratorError1 = err1;
                                                return [
                                                    3,
                                                    36
                                                ];
                                            case 31:
                                                _state.trys.push([
                                                    31,
                                                    ,
                                                    34,
                                                    35
                                                ]);
                                                if (!(_iteratorAbruptCompletion1 && _iterator1.return != null)) return [
                                                    3,
                                                    33
                                                ];
                                                return [
                                                    4,
                                                    _iterator1.return()
                                                ];
                                            case 32:
                                                _state.sent();
                                                _state.label = 33;
                                            case 33:
                                                return [
                                                    3,
                                                    35
                                                ];
                                            case 34:
                                                if (_didIteratorError1) {
                                                    throw _iteratorError1;
                                                }
                                                return [
                                                    7
                                                ];
                                            case 35:
                                                return [
                                                    7
                                                ];
                                            case 36:
                                                return [
                                                    3,
                                                    37
                                                ];
                                            case 37:
                                                return [
                                                    2
                                                ];
                                        }
                                    });
                                });
                                return function(event, pathToModified) {
                                    return _ref.apply(this, arguments);
                                };
                            }()
                        ]
                    ];
            }
        });
    });
    return function createDependencyGraph(directory) {
        return _ref.apply(this, arguments);
    };
}();
// src/app/lib/logger.ts
var LOG_LEVELS = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
};
var Logger = /*#__PURE__*/ function() {
    "use strict";
    function _Logger() {
        _class_call_check(this, _Logger);
        this.currentLevel = process.env.LOG_LEVEL || "info";
    }
    _create_class(_Logger, [
        {
            key: "setLevel",
            value: function setLevel(level) {
                this.currentLevel = level;
            }
        },
        {
            key: "getLevel",
            value: function getLevel() {
                return this.currentLevel;
            }
        },
        {
            key: "shouldLog",
            value: function shouldLog(level) {
                return LOG_LEVELS[level] >= LOG_LEVELS[this.currentLevel];
            }
        },
        {
            key: "debug",
            value: function debug() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                var _console;
                if (!this.shouldLog("debug")) {
                    return;
                }
                (_console = console).debug.apply(_console, _to_consumable_array(args));
            }
        },
        {
            key: "info",
            value: function info() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                var _console;
                if (!this.shouldLog("info")) {
                    return;
                }
                (_console = console).info.apply(_console, _to_consumable_array(args));
            }
        },
        {
            key: "warn",
            value: function warn() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                var _console;
                if (!this.shouldLog("warn")) {
                    return;
                }
                (_console = console).warn.apply(_console, _to_consumable_array(args));
            }
        },
        {
            key: "error",
            value: function error() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                var _console;
                if (!this.shouldLog("error")) {
                    return;
                }
                (_console = console).error.apply(_console, _to_consumable_array(args));
            }
        }
    ], [
        {
            key: "getInstance",
            value: function getInstance() {
                if (!_Logger.instance) {
                    _Logger.instance = new _Logger();
                }
                return _Logger.instance;
            }
        }
    ]);
    return _Logger;
}();
var logger = Logger.getInstance();
var logger_default = logger;
// src/cli/utils/preview/hot-reloading/setup-hot-reloading.ts
import chalk2 from "chalk";
var setupHotreloading = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(devServer2, documentsDirRelativePath2) {
        var indexOnlyMode, clients, io, changes, reload, absolutePathToDocumentsDirectory, _ref, dependencyGraph, updateDependencyGraph, resolveDependentsOf, getFilesOutsideDocumentsDirectory, filesOutsideDocumentsDirectory, watcher, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, p, exit;
        var _arguments = arguments;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    indexOnlyMode = _arguments.length > 2 && _arguments[2] !== void 0 ? _arguments[2] : false;
                    clients = [];
                    io = new SocketServer(devServer2);
                    io.on("connection", function(client) {
                        clients.push(client);
                        client.on("disconnect", function() {
                            clients = clients.filter(function(item) {
                                return item !== client;
                            });
                        });
                    });
                    changes = [];
                    reload = debounce(function() {
                        var filteredChanges = changes.filter(function(change) {
                            return !path4.basename(change.filename).startsWith(".");
                        }).filter(function(change, index, self) {
                            return index === self.findIndex(function(c) {
                                return c.filename === change.filename && c.event === change.event;
                            });
                        });
                        if (indexOnlyMode) {
                            filteredChanges = filteredChanges.filter(function(change) {
                                return change.filename === "templates/Index.tsx" || change.filename.endsWith("Index.tsx") || path4.basename(change.filename) === "Index.tsx";
                            });
                        }
                        if (filteredChanges.length > 0) {
                            logger_default.info("".concat(chalk2.yellow("!"), " ").concat(chalk2.gray("Changes detected, reloading...")));
                            clients.forEach(function(client) {
                                logger_default.debug("Emitting reload to ".concat(client.id));
                                client.emit("reload", filteredChanges);
                            });
                        }
                        changes = [];
                    }, 150);
                    absolutePathToDocumentsDirectory = path4.resolve(process.cwd(), documentsDirRelativePath2);
                    return [
                        4,
                        createDependencyGraph(absolutePathToDocumentsDirectory)
                    ];
                case 1:
                    _ref = _sliced_to_array.apply(void 0, [
                        _state.sent(),
                        2
                    ]), dependencyGraph = _ref[0], updateDependencyGraph = _ref[1];
                    resolveDependentsOf = function(pathToChangeTarget) {
                        var moduleEntry = dependencyGraph[pathToChangeTarget];
                        var dependentPaths = [];
                        if (moduleEntry) {
                            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                            try {
                                for(var _iterator = moduleEntry.dependentPaths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                    var dependentPath = _step.value;
                                    var _dependentPaths;
                                    var dependentsOfDependent = resolveDependentsOf(dependentPath);
                                    (_dependentPaths = dependentPaths).push.apply(_dependentPaths, _to_consumable_array(dependentsOfDependent));
                                    dependentPaths.push(dependentPath);
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally{
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                                        _iterator.return();
                                    }
                                } finally{
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }
                        }
                        return dependentPaths;
                    };
                    getFilesOutsideDocumentsDirectory = function() {
                        return Object.keys(dependencyGraph).filter(function(p) {
                            return path4.relative(absolutePathToDocumentsDirectory, p).startsWith("..");
                        });
                    };
                    filesOutsideDocumentsDirectory = getFilesOutsideDocumentsDirectory();
                    watcher = watch("", {
                        ignoreInitial: true,
                        cwd: absolutePathToDocumentsDirectory,
                        ignored: indexOnlyMode ? [
                            // 在 Index 模式下，忽略除了 Index.tsx 之外的所有文件
                            function(filepath) {
                                var fileName = path4.basename(filepath);
                                var relativePath = path4.relative(absolutePathToDocumentsDirectory, filepath);
                                if (fileName === "Index.tsx" || relativePath === "templates/Index.tsx") {
                                    return false;
                                }
                                return true;
                            },
                            "**/node_modules/**",
                            "**/.git/**",
                            "**/dist/**",
                            "**/build/**",
                            "**/.next/**",
                            "**/coverage/**"
                        ] : [
                            "**/node_modules/**",
                            "**/.git/**",
                            "**/dist/**",
                            "**/build/**",
                            "**/.next/**",
                            "**/coverage/**"
                        ]
                    });
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(_iterator = filesOutsideDocumentsDirectory[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            p = _step.value;
                            watcher.add(p);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                    exit = /*#__PURE__*/ function() {
                        var _ref = _async_to_generator(function() {
                            return _ts_generator(this, function(_state) {
                                switch(_state.label){
                                    case 0:
                                        return [
                                            4,
                                            watcher.close()
                                        ];
                                    case 1:
                                        _state.sent();
                                        return [
                                            2
                                        ];
                                }
                            });
                        });
                        return function exit() {
                            return _ref.apply(this, arguments);
                        };
                    }();
                    process.on("SIGINT", exit);
                    process.on("uncaughtException", exit);
                    watcher.on("all", /*#__PURE__*/ function() {
                        var _ref = _async_to_generator(function(event, relativePathToChangeTarget) {
                            var file, pathToChangeTarget, newFilesOutsideDocumentsDirectory, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, p, _iteratorNormalCompletion1, _didIteratorError1, _iteratorError1, _iterator1, _step1, p1, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, dependentPath;
                            return _ts_generator(this, function(_state) {
                                switch(_state.label){
                                    case 0:
                                        file = relativePathToChangeTarget.split(path4.sep);
                                        if (file.length === 0) {
                                            return [
                                                2
                                            ];
                                        }
                                        pathToChangeTarget = path4.resolve(absolutePathToDocumentsDirectory, relativePathToChangeTarget);
                                        return [
                                            4,
                                            updateDependencyGraph(event, pathToChangeTarget)
                                        ];
                                    case 1:
                                        _state.sent();
                                        newFilesOutsideDocumentsDirectory = getFilesOutsideDocumentsDirectory();
                                        _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                                        try {
                                            for(_iterator = filesOutsideDocumentsDirectory[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                                p = _step.value;
                                                if (!newFilesOutsideDocumentsDirectory.includes(p)) {
                                                    watcher.unwatch(p);
                                                }
                                            }
                                        } catch (err) {
                                            _didIteratorError = true;
                                            _iteratorError = err;
                                        } finally{
                                            try {
                                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                                    _iterator.return();
                                                }
                                            } finally{
                                                if (_didIteratorError) {
                                                    throw _iteratorError;
                                                }
                                            }
                                        }
                                        _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                                        try {
                                            for(_iterator1 = newFilesOutsideDocumentsDirectory[Symbol.iterator](); !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                                                p1 = _step1.value;
                                                if (!filesOutsideDocumentsDirectory.includes(p1)) {
                                                    watcher.add(p1);
                                                }
                                            }
                                        } catch (err) {
                                            _didIteratorError1 = true;
                                            _iteratorError1 = err;
                                        } finally{
                                            try {
                                                if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                                                    _iterator1.return();
                                                }
                                            } finally{
                                                if (_didIteratorError1) {
                                                    throw _iteratorError1;
                                                }
                                            }
                                        }
                                        filesOutsideDocumentsDirectory = newFilesOutsideDocumentsDirectory;
                                        changes.push({
                                            event: event,
                                            filename: relativePathToChangeTarget
                                        });
                                        _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
                                        try {
                                            for(_iterator2 = resolveDependentsOf(pathToChangeTarget)[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                                                dependentPath = _step2.value;
                                                changes.push({
                                                    event: "change",
                                                    filename: path4.relative(absolutePathToDocumentsDirectory, dependentPath)
                                                });
                                            }
                                        } catch (err) {
                                            _didIteratorError2 = true;
                                            _iteratorError2 = err;
                                        } finally{
                                            try {
                                                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                                                    _iterator2.return();
                                                }
                                            } finally{
                                                if (_didIteratorError2) {
                                                    throw _iteratorError2;
                                                }
                                            }
                                        }
                                        reload();
                                        return [
                                            2
                                        ];
                                }
                            });
                        });
                        return function(event, relativePathToChangeTarget) {
                            return _ref.apply(this, arguments);
                        };
                    }());
                    return [
                        2,
                        watcher
                    ];
            }
        });
    });
    return function setupHotreloading(devServer2, documentsDirRelativePath2) {
        return _ref.apply(this, arguments);
    };
}();
// src/cli/utils/preview/get-env-variables-for-preview-app.ts
import path5 from "path";
var getEnvVariablesForPreviewApp = function(relativePathToDocumentsDirectory, cliPackageLocation2, cwd) {
    return {
        NEXT_PUBLIC_DOCUMENTS_DIR_RELATIVE_PATH: relativePathToDocumentsDirectory,
        NEXT_PUBLIC_CLI_PACKAGE_LOCATION: cliPackageLocation2,
        NEXT_PUBLIC_OS_PATH_SEPARATOR: path5.sep,
        NEXT_PUBLIC_USER_PROJECT_LOCATION: cwd,
        // new vars
        DOCUMENTS_DIR_RELATIVE_PATH: relativePathToDocumentsDirectory,
        DOCUMENTS_STATIC_PATH: path5.resolve(relativePathToDocumentsDirectory, "static"),
        DOCUMENTS_DIR_ABSOLUTE_PATH: path5.resolve(cwd, relativePathToDocumentsDirectory),
        USER_PROJECT_LOCATION: cwd
    };
};
// src/cli/commands/dev.ts
var dev = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(param) {
        var documentsDirRelativePath2, port, documentsDir, envVars, devServer2, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    documentsDirRelativePath2 = param.dir, port = param.port;
                    console.log("\u8DEF\u5F84\u5730\u5740\uFF1A", documentsDirRelativePath2);
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        4,
                        ,
                        5
                    ]);
                    if (!fs3.existsSync(documentsDirRelativePath2)) {
                        logger_default.error("Missing ".concat(documentsDirRelativePath2, " folder"));
                        throw new Error("Missing ".concat(documentsDirRelativePath2, " folder"));
                    }
                    documentsDir = path6.resolve(documentsDirRelativePath2);
                    envVars = getEnvVariablesForPreviewApp(path6.relative(process.cwd(), documentsDir), process.env.NEXT_PUBLIC_CLI_PACKAGE_LOCATION, process.cwd());
                    Object.assign(process.env, envVars);
                    process.env.NEXT_PUBLIC_INDEX_ONLY_MODE = "true";
                    logger_default.debug("Documents directory absolute path: ".concat(envVars.DOCUMENTS_DIR_ABSOLUTE_PATH));
                    logger_default.debug("Starting dev server for ".concat(documentsDirRelativePath2, " on port ").concat(port));
                    return [
                        4,
                        startDevServer(documentsDirRelativePath2, documentsDirRelativePath2, // defaults to ./documents/static for the static files that are served to the preview
                        parseInt(port))
                    ];
                case 2:
                    devServer2 = _state.sent();
                    logger_default.debug("Setting up hot reloading in Index-only mode");
                    return [
                        4,
                        setupHotreloading(devServer2, documentsDirRelativePath2, true)
                    ];
                case 3:
                    _state.sent();
                    logger_default.debug("Dev server started successfully");
                    return [
                        3,
                        5
                    ];
                case 4:
                    error = _state.sent();
                    logger_default.error("Error starting dev server", {
                        error: error
                    });
                    process.exit(1);
                    return [
                        3,
                        5
                    ];
                case 5:
                    return [
                        2
                    ];
            }
        });
    });
    return function dev(_) {
        return _ref.apply(this, arguments);
    };
}();
// src/cli/commands/build.ts
import fs5 from "node:fs";
import chalk3 from "chalk";
import * as es from "esbuild";
import path8 from "node:path";
import postCssPlugin from "esbuild-style-plugin";
import ora2 from "ora";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
// src/utils/htmldocs-esbuild-plugin.ts
import path7 from "node:path";
import fs4 from "node:fs";
import { parse as parse2 } from "react-docgen";
import * as tsj from "ts-json-schema-generator";
// src/utils/paths.ts
var NEXT_DIST_DIR = "dist";
var DOCUMENT_SCHEMAS_DIR = NEXT_DIST_DIR;
// src/utils/htmldocs-esbuild-plugin.ts
var htmldocsPlugin = function(documentTemplates, isBuild) {
    return {
        name: "htmldocs-plugin",
        setup: function(b) {
            b.onLoad({
                filter: new RegExp(documentTemplates.join("|"))
            }, /*#__PURE__*/ function() {
                var _ref = _async_to_generator(function(param) {
                    var pathToFile, contents;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                pathToFile = param.path;
                                return [
                                    4,
                                    fs4.promises.readFile(pathToFile, "utf8")
                                ];
                            case 1:
                                contents = _state.sent();
                                return [
                                    4,
                                    generateAndWriteSchema(contents, pathToFile)
                                ];
                            case 2:
                                _state.sent();
                                if (isBuild) {
                                    contents = contents.replace(/\/static/g, "./static");
                                }
                                return [
                                    2,
                                    {
                                        contents: "".concat(contents, ";\n          export { renderAsync } from 'htmldocs-module-that-will-export-render'\n        "),
                                        loader: path7.extname(pathToFile).slice(1)
                                    }
                                ];
                        }
                    });
                });
                return function(_) {
                    return _ref.apply(this, arguments);
                };
            }());
            b.onResolve({
                filter: /^htmldocs-module-that-will-export-render$/
            }, /*#__PURE__*/ function() {
                var _ref = _async_to_generator(function(args) {
                    var options, result;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                options = {
                                    kind: "import-statement",
                                    importer: args.importer,
                                    resolveDir: args.resolveDir,
                                    namespace: args.namespace
                                };
                                return [
                                    4,
                                    b.resolve("@htmldocs/render", options)
                                ];
                            case 1:
                                result = _state.sent();
                                if (result.errors.length === 0) {
                                    return [
                                        2,
                                        result
                                    ];
                                }
                                if (result.errors.length > 0 && result.errors[0]) {
                                    result.errors[0].text = "Failed trying to import `renderAsync` from `@htmldocs/render` to be able to render your document template.\n Maybe you don't have `@htmldocs/render` installed?";
                                }
                                return [
                                    2,
                                    result
                                ];
                        }
                    });
                });
                return function(args) {
                    return _ref.apply(this, arguments);
                };
            }());
        }
    };
};
function generateAndWriteSchema(contents, filePath) {
    return _generateAndWriteSchema.apply(this, arguments);
}
function _generateAndWriteSchema() {
    _generateAndWriteSchema = _async_to_generator(function(contents, filePath) {
        var componentProps, componentInterfaceName, interfaceContent, propName, _prop_tsType, prop, required, tsType, fileContents, tempFilePath, config, schema, schemaString, baseName, schemaFilePath;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        parseFileToProps(contents, filePath)
                    ];
                case 1:
                    componentProps = _state.sent();
                    componentInterfaceName = "ComponentProps";
                    interfaceContent = "export interface ".concat(componentInterfaceName, " {\n");
                    for(var propName in componentProps){
                        ;
                        prop = componentProps[propName];
                        if (!prop || !prop.tsType) continue;
                        required = prop.required ? "" : "?";
                        tsType = "raw" in prop.tsType ? prop.tsType.raw : (_prop_tsType = prop.tsType) === null || _prop_tsType === void 0 ? void 0 : _prop_tsType.name;
                        interfaceContent += "  ".concat(propName).concat(required, ": ").concat(tsType, ";\n");
                    }
                    interfaceContent += "}\n";
                    fileContents = contents + "\n" + interfaceContent;
                    tempFilePath = createTempFilePath(filePath);
                    return [
                        4,
                        fs4.writeFileSync(tempFilePath, fileContents)
                    ];
                case 2:
                    _state.sent();
                    config = {
                        path: tempFilePath,
                        tsconfig: process.env.NEXT_PUBLIC_USER_PROJECT_LOCATION + "/tsconfig.json",
                        type: componentInterfaceName
                    };
                    schema = tsj.createGenerator(config).createSchema(config.type);
                    fs4.unlinkSync(tempFilePath);
                    schemaString = JSON.stringify(schema, null, 2);
                    if (!fs4.existsSync(DOCUMENT_SCHEMAS_DIR)) {
                        fs4.mkdirSync(DOCUMENT_SCHEMAS_DIR, {
                            recursive: true
                        });
                    }
                    baseName = path7.basename(filePath, path7.extname(filePath));
                    schemaFilePath = path7.join(DOCUMENT_SCHEMAS_DIR, baseName, "".concat(baseName, ".schema.json"));
                    fs4.mkdirSync(path7.dirname(schemaFilePath), {
                        recursive: true
                    });
                    fs4.writeFileSync(schemaFilePath, schemaString);
                    return [
                        2
                    ];
            }
        });
    });
    return _generateAndWriteSchema.apply(this, arguments);
}
function createTempFilePath(filePath) {
    var baseName = path7.basename(filePath, path7.extname(filePath));
    var dirName = path7.dirname(filePath);
    var extension = path7.extname(filePath).replace(".", "");
    var tempFileName = ".".concat(baseName, ".").concat(extension);
    var tempFilePath = path7.join(dirName, tempFileName);
    return tempFilePath;
}
var parseFileToProps = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(contents, filePath) {
        var componentsInfo;
        return _ts_generator(this, function(_state) {
            componentsInfo = parse2(contents, {
                babelOptions: {
                    filename: filePath,
                    babelrc: false
                }
            });
            if (componentsInfo.length > 0 && componentsInfo[0]) {
                return [
                    2,
                    componentsInfo[0].props
                ];
            } else {
                return [
                    2,
                    void 0
                ];
            }
            return [
                2
            ];
        });
    });
    return function parseFileToProps(contents, filePath) {
        return _ref.apply(this, arguments);
    };
}();
// src/cli/commands/build.ts
import AdmZip from "adm-zip";
var BUILD_DIR = path8.join(process.env.NEXT_PUBLIC_USER_PROJECT_LOCATION || process.cwd(), "dist");
var cleanDistFolder = function() {
    if (fs5.existsSync(BUILD_DIR)) {
        fs5.rmSync(BUILD_DIR, {
            recursive: true,
            force: true
        });
    }
    fs5.mkdirSync(BUILD_DIR, {
        recursive: true
    });
};
var build2 = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(fileName) {
        var write, spinner, staticPath, zip, baseName, documentBuildDir, result, error, buildFailure, error1;
        var _arguments = arguments;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    write = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : true;
                    spinner = ora2({
                        text: "Building ".concat(fileName, "...\n"),
                        prefixText: " "
                    }).start();
                    closeOraOnSIGINT(spinner);
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        6,
                        7,
                        8
                    ]);
                    if (!fs5.existsSync(fileName)) {
                        spinner.fail(chalk3.red("Missing file: ".concat(fileName)));
                        process.exit(1);
                    }
                    spinner.text = "Cleaning dist folder...";
                    cleanDistFolder();
                    spinner.text = "Zipping static assets...";
                    staticPath = path8.join(process.env.DOCUMENTS_DIR_ABSOLUTE_PATH, "static");
                    if (fs5.existsSync(staticPath)) {
                        zip = new AdmZip();
                        zip.addLocalFolder(staticPath, "static");
                        zip.writeZip(path8.join(BUILD_DIR, "static.zip"));
                        spinner.succeed("Static assets zipped");
                    }
                    spinner.text = "Building ".concat(fileName, "...\n");
                    baseName = path8.basename(fileName, path8.extname(fileName));
                    documentBuildDir = path8.join(BUILD_DIR, baseName);
                    _state.label = 2;
                case 2:
                    _state.trys.push([
                        2,
                        4,
                        ,
                        5
                    ]);
                    return [
                        4,
                        es.build({
                            entryPoints: [
                                fileName
                            ],
                            bundle: true,
                            minify: true,
                            write: write,
                            format: "cjs",
                            jsx: "automatic",
                            platform: "node",
                            define: {
                                "process.env.NODE_ENV": '"development"'
                            },
                            loader: {
                                ".ts": "ts",
                                ".tsx": "tsx",
                                ".css": "css"
                            },
                            plugins: [
                                htmldocsPlugin([
                                    fileName
                                ], true),
                                postCssPlugin({
                                    postcss: {
                                        plugins: [
                                            tailwindcss,
                                            autoprefixer
                                        ]
                                    }
                                })
                            ],
                            outdir: documentBuildDir,
                            sourcemap: "external"
                        })
                    ];
                case 3:
                    result = _state.sent();
                    spinner.succeed("Build completed");
                    return [
                        2,
                        result
                    ];
                case 4:
                    error = _state.sent();
                    spinner.fail("Build failed");
                    buildFailure = error;
                    console.error({
                        error: {
                            message: buildFailure.message,
                            stack: buildFailure.stack,
                            name: buildFailure.name,
                            cause: buildFailure.cause
                        }
                    });
                    process.exit(1);
                    return [
                        3,
                        5
                    ];
                case 5:
                    return [
                        3,
                        8
                    ];
                case 6:
                    error1 = _state.sent();
                    spinner.fail("Build failed");
                    console.error(error1);
                    process.exit(1);
                    return [
                        3,
                        8
                    ];
                case 7:
                    spinner.stop();
                    return [
                        7
                    ];
                case 8:
                    return [
                        2
                    ];
            }
        });
    });
    return function build2(fileName) {
        return _ref.apply(this, arguments);
    };
}();
// src/cli/commands/publish.ts
import chalk4 from "chalk";
import { tmpdir } from "os";
import { promises as fs7, createReadStream } from "fs";
import path10 from "path";
import AdmZip2 from "adm-zip";
import FormData from "form-data";
import fetch2 from "node-fetch";
// src/cli/utils/token.ts
import fs6 from "node:fs";
import os from "node:os";
import path9 from "node:path";
import { z } from "zod";
var TokenConfigSchema = z.object({
    team_id: z.string(),
    api_key: z.string()
});
var configPath = path9.join(os.homedir(), ".htmldocs.json");
function storeToken(teamId, apiKey) {
    return _storeToken.apply(this, arguments);
}
function _storeToken() {
    _storeToken = _async_to_generator(function(teamId, apiKey) {
        var configData;
        return _ts_generator(this, function(_state) {
            configData = {
                team_id: teamId,
                api_key: apiKey
            };
            fs6.writeFileSync(configPath, JSON.stringify(configData, null, 2));
            return [
                2
            ];
        });
    });
    return _storeToken.apply(this, arguments);
}
function getToken() {
    return _getToken.apply(this, arguments);
}
function _getToken() {
    _getToken = _async_to_generator(function() {
        var configData, parsedData;
        return _ts_generator(this, function(_state) {
            try {
                configData = fs6.readFileSync(configPath, "utf8");
                parsedData = TokenConfigSchema.safeParse(JSON.parse(configData));
                if (!parsedData.success) {
                    console.error("Invalid token configuration:", parsedData.error);
                    throw new Error("Invalid token configuration");
                }
                return [
                    2,
                    parsedData.data
                ];
            } catch (error) {
                console.error("Error reading or parsing token config:", error);
                throw new Error("Invalid token configuration");
            }
            return [
                2
            ];
        });
    });
    return _getToken.apply(this, arguments);
}
// src/cli/commands/publish.ts
import { configureSourceMap, createFakeContext, executeBuiltCode, extractOutputFiles } from "@htmldocs/render";
import ora3 from "ora";
var publish = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(documentPath) {
        var result, outputFiles, baseName, documentBuildDir, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, outputFile, filePath, err, _ref, documentId, defaultProps, zipPath, _ref1, team_id, api_key, formData, spinner, response, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    logger_default.debug("Starting publish process for document: ".concat(documentPath));
                    return [
                        4,
                        build2(documentPath, false)
                    ];
                case 1:
                    result = _state.sent();
                    outputFiles = result.outputFiles;
                    if (!outputFiles) {
                        logger_default.error("No output files found");
                        return [
                            2
                        ];
                    }
                    baseName = path10.basename(documentPath, path10.extname(documentPath));
                    documentBuildDir = path10.join(BUILD_DIR, baseName);
                    logger_default.debug("Found ".concat(outputFiles.length, " output files"));
                    logger_default.debug("Writing output files...");
                    return [
                        4,
                        fs7.mkdir(documentBuildDir, {
                            recursive: true
                        })
                    ];
                case 2:
                    _state.sent();
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _state.label = 3;
                case 3:
                    _state.trys.push([
                        3,
                        8,
                        9,
                        10
                    ]);
                    _iterator = outputFiles[Symbol.iterator]();
                    _state.label = 4;
                case 4:
                    if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                        3,
                        7
                    ];
                    outputFile = _step.value;
                    filePath = path10.join(documentBuildDir, path10.basename(outputFile.path));
                    return [
                        4,
                        fs7.writeFile(filePath, outputFile.contents)
                    ];
                case 5:
                    _state.sent();
                    logger_default.debug("Wrote file: ".concat(filePath));
                    _state.label = 6;
                case 6:
                    _iteratorNormalCompletion = true;
                    return [
                        3,
                        4
                    ];
                case 7:
                    return [
                        3,
                        10
                    ];
                case 8:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        10
                    ];
                case 9:
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                    return [
                        7
                    ];
                case 10:
                    logger_default.debug("Finished writing output files");
                    return [
                        4,
                        getDocumentIdAndDefaultProps(documentPath, outputFiles)
                    ];
                case 11:
                    _ref = _state.sent(), documentId = _ref.documentId, defaultProps = _ref.defaultProps;
                    logger_default.debug("Document ID: ".concat(documentId));
                    return [
                        4,
                        zipDocumentFiles(documentBuildDir)
                    ];
                case 12:
                    zipPath = _state.sent();
                    logger_default.debug("Zipped document files to: ".concat(zipPath));
                    return [
                        4,
                        getToken()
                    ];
                case 13:
                    _ref1 = _state.sent(), team_id = _ref1.team_id, api_key = _ref1.api_key;
                    logger_default.debug("Retrieved token for team: ".concat(team_id));
                    formData = new FormData();
                    formData.append("file", createReadStream(path10.join(zipPath, "output.zip")));
                    formData.append("teamId", team_id);
                    formData.append("documentName", documentId);
                    formData.append("defaultProps", JSON.stringify(defaultProps));
                    logger_default.debug("Form data prepared for upload");
                    spinner = ora3({
                        text: 'Uploading document "'.concat(documentId, '"...'),
                        prefixText: " "
                    }).start();
                    closeOraOnSIGINT(spinner);
                    _state.label = 14;
                case 14:
                    _state.trys.push([
                        14,
                        16,
                        ,
                        17
                    ]);
                    logger_default.debug("Sending upload request to server");
                    return [
                        4,
                        fetch2("https://htmldocs.com/api/documents/upload", {
                            method: "POST",
                            headers: {
                                "Authorization": "Bearer ".concat(api_key)
                            },
                            body: formData
                        })
                    ];
                case 15:
                    response = _state.sent();
                    if (!response.ok) {
                        logger_default.error("Upload failed with status: ".concat(response.status));
                        spinner.fail(chalk4.red("Failed to upload document: ".concat(response.statusText)));
                        return [
                            2
                        ];
                    }
                    logger_default.debug("Upload successful");
                    spinner.succeed(chalk4.green('Document "'.concat(documentId, '" published')));
                    return [
                        3,
                        17
                    ];
                case 16:
                    error = _state.sent();
                    logger_default.error("Error during upload:", error);
                    spinner.fail(chalk4.red("Could not connect to the server. Please check your internet connection and try again."));
                    return [
                        2
                    ];
                case 17:
                    return [
                        2
                    ];
            }
        });
    });
    return function publish(documentPath) {
        return _ref.apply(this, arguments);
    };
}();
var getDocumentIdAndDefaultProps = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(documentPath, outputFiles) {
        var _extractOutputFiles, sourceMapFile, bundledDocumentFile, builtDocumentCode, fakeContext, sourceMapToDocument, executionResult, documentId, defaultProps;
        return _ts_generator(this, function(_state) {
            logger_default.debug("Extracting document ID");
            _extractOutputFiles = extractOutputFiles(outputFiles), sourceMapFile = _extractOutputFiles.sourceMapFile, bundledDocumentFile = _extractOutputFiles.bundledDocumentFile;
            builtDocumentCode = bundledDocumentFile.text;
            fakeContext = createFakeContext(documentPath);
            sourceMapToDocument = configureSourceMap(sourceMapFile);
            logger_default.debug("Executing built code to extract document ID");
            executionResult = executeBuiltCode(builtDocumentCode, fakeContext, documentPath, sourceMapToDocument);
            if ("error" in executionResult) {
                logger_default.error("Error building document");
                logger_default.error(executionResult.error);
                return [
                    2,
                    {
                        documentId: null,
                        defaultProps: {}
                    }
                ];
            }
            documentId = executionResult.DocumentComponent.documentId;
            if (!documentId) {
                logger_default.error("No document ID found. Please ensure documentId is set as a property on the default export.");
                return [
                    2,
                    {
                        documentId: null,
                        defaultProps: {}
                    }
                ];
            }
            defaultProps = executionResult.DocumentComponent.PreviewProps || {};
            logger_default.debug("Extracted document ID: ".concat(documentId));
            logger_default.debug("Extracted default props: ".concat(JSON.stringify(defaultProps, null, 2)));
            return [
                2,
                {
                    documentId: documentId,
                    defaultProps: defaultProps
                }
            ];
        });
    });
    return function getDocumentIdAndDefaultProps(documentPath, outputFiles) {
        return _ref.apply(this, arguments);
    };
}();
var zipDocumentFiles = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(documentBuildDir) {
        var zip, files, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, filePath, staticZipPath, tempDir, zipFilePath;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    logger_default.debug("Starting to zip document files");
                    zip = new AdmZip2();
                    return [
                        4,
                        fs7.readdir(documentBuildDir)
                    ];
                case 1:
                    files = _state.sent();
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(_iterator = files[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            file = _step.value;
                            filePath = path10.join(documentBuildDir, file);
                            logger_default.debug("Adding file to zip: ".concat(filePath));
                            zip.addLocalFile(filePath);
                            logger_default.debug("File added to zip: ".concat(filePath));
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                    staticZipPath = path10.join(BUILD_DIR, "static.zip");
                    return [
                        4,
                        fs7.access(staticZipPath).then(function() {
                            return true;
                        }).catch(function() {
                            return false;
                        })
                    ];
                case 2:
                    if (_state.sent()) {
                        logger_default.debug("Adding static.zip to bundle");
                        zip.addLocalFile(staticZipPath);
                    }
                    tempDir = path10.join(tmpdir(), "htmldocs-".concat(Date.now()));
                    logger_default.debug("Creating temporary directory: ".concat(tempDir));
                    return [
                        4,
                        fs7.mkdir(tempDir, {
                            recursive: true
                        })
                    ];
                case 3:
                    _state.sent();
                    zipFilePath = path10.join(tempDir, "output.zip");
                    logger_default.debug("Writing zip file to: ".concat(zipFilePath));
                    zip.writeZip(zipFilePath);
                    logger_default.debug("Zip process completed");
                    return [
                        2,
                        tempDir
                    ];
            }
        });
    });
    return function zipDocumentFiles(documentBuildDir) {
        return _ref.apply(this, arguments);
    };
}();
// src/cli/commands/login.ts
import chalk5 from "chalk";
import open from "open";
import os2 from "os";
import { URL } from "url";
import crypto from "crypto";
var apiUrl = "https://htmldocs.com";
var TIMEOUT_MS = 5 * 60 * 1e3;
var POLLING_INTERVAL_MS = 1e3;
var login = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function() {
        var options, sessionId, fullHostname, cleanHostname, sessionResponse, _$error, callbackData, encodedData, url2, startTime, response, data, error, error1;
        var _arguments = arguments;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    options = _arguments.length > 0 && _arguments[0] !== void 0 ? _arguments[0] : {};
                    sessionId = crypto.randomBytes(16).toString("hex");
                    fullHostname = os2.hostname();
                    cleanHostname = fullHostname.split(".")[0];
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        19,
                        ,
                        20
                    ]);
                    return [
                        4,
                        fetch("".concat(apiUrl, "/api/auth/create-session"), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                session_id: sessionId,
                                hostname: cleanHostname
                            })
                        })
                    ];
                case 2:
                    sessionResponse = _state.sent();
                    if (!!sessionResponse.ok) return [
                        3,
                        4
                    ];
                    return [
                        4,
                        sessionResponse.json()
                    ];
                case 3:
                    _$error = _state.sent();
                    console.log(chalk5.red("Failed to initialize authentication:", _$error.message));
                    process.exit(1);
                    _state.label = 4;
                case 4:
                    callbackData = {
                        session_id: sessionId,
                        hostname: cleanHostname
                    };
                    encodedData = Buffer.from(JSON.stringify(callbackData)).toString("base64");
                    url2 = new URL("".concat(apiUrl, "/authorize"));
                    url2.searchParams.set("callback", encodedData);
                    if (!options.headless) return [
                        3,
                        5
                    ];
                    console.log(url2.toString());
                    return [
                        2
                    ];
                case 5:
                    return [
                        4,
                        open(url2.toString())
                    ];
                case 6:
                    _state.sent();
                    console.log(chalk5.blue("Please select a team and complete the authentication in your browser."));
                    _state.label = 7;
                case 7:
                    logger_default.debug("Starting CLI auth request with session ID:", sessionId);
                    startTime = Date.now();
                    _state.label = 8;
                case 8:
                    if (!true) return [
                        3,
                        18
                    ];
                    if (Date.now() - startTime > TIMEOUT_MS) {
                        console.log(chalk5.red("Authentication timed out. Please try again."));
                        process.exit(1);
                    }
                    _state.label = 9;
                case 9:
                    _state.trys.push([
                        9,
                        16,
                        ,
                        17
                    ]);
                    return [
                        4,
                        fetch("".concat(apiUrl, "/api/auth/check-status?session_id=").concat(sessionId))
                    ];
                case 10:
                    response = _state.sent();
                    return [
                        4,
                        response.json()
                    ];
                case 11:
                    data = _state.sent();
                    if (!(data.status === "completed" && data.team_id && data.api_key)) return [
                        3,
                        13
                    ];
                    return [
                        4,
                        storeToken(data.team_id, data.api_key)
                    ];
                case 12:
                    _state.sent();
                    console.log(chalk5.green("Login successful and API key stored."));
                    process.exit(0);
                    return [
                        3,
                        14
                    ];
                case 13:
                    if (data.status === "error") {
                        console.log(chalk5.red("Authentication failed:", data.message));
                        process.exit(1);
                    }
                    _state.label = 14;
                case 14:
                    return [
                        4,
                        new Promise(function(resolve) {
                            return setTimeout(resolve, POLLING_INTERVAL_MS);
                        })
                    ];
                case 15:
                    _state.sent();
                    return [
                        3,
                        17
                    ];
                case 16:
                    error = _state.sent();
                    console.log(chalk5.red("Error checking authentication status. Please try again."));
                    process.exit(1);
                    return [
                        3,
                        17
                    ];
                case 17:
                    return [
                        3,
                        8
                    ];
                case 18:
                    return [
                        3,
                        20
                    ];
                case 19:
                    error1 = _state.sent();
                    console.log(chalk5.red("Failed to start authentication process:", error1));
                    process.exit(1);
                    return [
                        3,
                        20
                    ];
                case 20:
                    return [
                        2
                    ];
            }
        });
    });
    return function login() {
        return _ref.apply(this, arguments);
    };
}();
// src/cli/commands/init.ts
import path11 from "node:path";
import fse from "fs-extra";
import logSymbols2 from "log-symbols";
import ora4 from "ora";
import { exec } from "child_process";
import chalk6 from "chalk";
var init = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(projectName) {
        var spinner, projectPath, templatePath, resolvedProjectPath, templatePackageJsonPath, templatePackageJson, key, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    logger_default.debug("CLI package location", process.env.NEXT_PUBLIC_CLI_PACKAGE_LOCATION);
                    if (!process.env.NEXT_PUBLIC_CLI_PACKAGE_LOCATION) {
                        logger_default.error("NEXT_PUBLIC_CLI_PACKAGE_LOCATION is not set");
                        process.exit(1);
                    }
                    spinner = ora4("Preparing files...\n").start();
                    projectPath = projectName;
                    if (!projectPath) {
                        projectPath = path11.join(process.cwd(), "htmldocs-starter");
                    }
                    if (typeof projectPath === "string") {
                        projectPath = projectPath.trim();
                    }
                    templatePath = path11.resolve(cliPackageLocation, "cli/template");
                    resolvedProjectPath = path11.resolve(projectPath);
                    fse.copySync(templatePath, resolvedProjectPath, {
                        recursive: true
                    });
                    templatePackageJsonPath = path11.resolve(resolvedProjectPath, "./package.json");
                    templatePackageJson = JSON.parse(fse.readFileSync(templatePackageJsonPath, "utf8"));
                    for(var key in templatePackageJson.dependencies){
                        templatePackageJson.dependencies[key] = templatePackageJson.dependencies[key].replace("workspace:", "");
                    }
                    fse.writeFileSync(templatePackageJsonPath, JSON.stringify(templatePackageJson, null, 2), "utf8");
                    spinner.text = "Installing dependencies...";
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        4,
                        ,
                        5
                    ]);
                    return [
                        4,
                        new Promise(function(resolve, reject) {
                            spinner.text = "Installing dependencies...";
                            exec("npm install", {
                                cwd: resolvedProjectPath
                            }, function(error, stdout, stderr) {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve();
                                }
                            });
                        })
                    ];
                case 2:
                    _state.sent();
                    spinner.text = "Installing Playwright...";
                    return [
                        4,
                        new Promise(function(resolve, reject) {
                            exec("npx playwright install", {
                                cwd: resolvedProjectPath
                            }, function(error, stdout, stderr) {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve();
                                }
                            });
                        })
                    ];
                case 3:
                    _state.sent();
                    spinner.succeed(chalk6.green('Created project "'.concat(projectName, '" and installed dependencies')));
                    console.log("\n" + chalk6.blue(logSymbols2.info) + chalk6.bold(" To start your project:"));
                    console.log(chalk6.cyan("  cd ".concat(projectName)));
                    console.log(chalk6.cyan("  npm run dev"));
                    return [
                        3,
                        5
                    ];
                case 4:
                    error = _state.sent();
                    spinner.fail(chalk6.red("Failed to install dependencies"));
                    logger_default.error("Error installing dependencies:", error);
                    process.exit(1);
                    return [
                        3,
                        5
                    ];
                case 5:
                    return [
                        2
                    ];
            }
        });
    });
    return function init(projectName) {
        return _ref.apply(this, arguments);
    };
}();
// src/cli/index.ts
import inquirer from "inquirer";
import path12 from "path";
var _process_env_NEXT_PUBLIC_DOCUMENTS_DIR_RELATIVE_PATH;
// src/utils/documents-directory-absolute-path.tsx
var documentsDirRelativePath = (_process_env_NEXT_PUBLIC_DOCUMENTS_DIR_RELATIVE_PATH = process.env.NEXT_PUBLIC_DOCUMENTS_DIR_RELATIVE_PATH) !== null && _process_env_NEXT_PUBLIC_DOCUMENTS_DIR_RELATIVE_PATH !== void 0 ? _process_env_NEXT_PUBLIC_DOCUMENTS_DIR_RELATIVE_PATH : "documents";
var userProjectLocation = process.env.NEXT_PUBLIC_USER_PROJECT_LOCATION;
var pathSeparator = process.env.NEXT_PUBLIC_OS_PATH_SEPARATOR;
var documentsDirectoryAbsolutePath = process.env.DOCUMENTS_DIR_ABSOLUTE_PATH;
// src/cli/index.ts
var PACKAGE_NAME = "htmldocs";
var noop = function() {};
process.removeAllListeners("warning");
var originalError = logger_default.error;
logger_default.error = function() {
    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
        args[_key] = arguments[_key];
    }
    originalError.apply(logger_default, args);
    process.exit(1);
};
process.env = _object_spread({}, process.env, getEnvVariablesForPreviewApp(// If we don't do normalization here, stuff like https://github.com/resend/react-email/issues/1354 happens.
path12.normalize(documentsDirRelativePath), cliPackageLocation, process.cwd()));
program.name(PACKAGE_NAME).description("A live preview of your documents right in your browser").version(package_default.version).option("-v, --verbose", "Enable verbose logging").hook("preAction", function(thisCommand) {
    if (thisCommand.opts().verbose) {
        logger_default.setLevel("debug");
    }
});
program.command("dev").description("Starts the preview server").option("-d, --dir <path>", "Directory with your document templates", "./documents").option("-p --port <port>", "Port to run dev server on", "3000").action(dev);
program.command("build <file>", {
    hidden: true
}).description("Builds the document component").action(function(file) {
    return build2(file).then(noop);
});
program.command("publish <file>").description("Publishes the document to the cloud for API use").action(function(file) {
    return publish(file);
});
program.command("login").description("Authenticates the CLI with the cloud").option("--headless", "Print the authorization URL instead of opening it").action(login);
program.command("init [name]").description("Initialize a new HTMLDocs project").action(/*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(name) {
        var answer;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!!name) return [
                        3,
                        2
                    ];
                    return [
                        4,
                        inquirer.prompt([
                            {
                                type: "input",
                                name: "projectName",
                                message: "What is the name of your project?",
                                default: "htmldocs"
                            }
                        ])
                    ];
                case 1:
                    answer = _state.sent();
                    name = answer.projectName;
                    _state.label = 2;
                case 2:
                    return [
                        4,
                        init(name)
                    ];
                case 3:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    });
    return function(name) {
        return _ref.apply(this, arguments);
    };
}());
program.parse();
