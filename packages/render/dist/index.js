"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../node_modules/.pnpm/stacktrace-parser@0.1.10/node_modules/stacktrace-parser/dist/stack-trace-parser.cjs.js
var require_stack_trace_parser_cjs = __commonJS({
  "../../node_modules/.pnpm/stacktrace-parser@0.1.10/node_modules/stacktrace-parser/dist/stack-trace-parser.cjs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var UNKNOWN_FUNCTION = "<unknown>";
    function parse2(stackString) {
      var lines = stackString.split("\n");
      return lines.reduce(function(stack, line) {
        var parseResult = parseChrome(line) || parseWinjs(line) || parseGecko(line) || parseNode(line) || parseJSC(line);
        if (parseResult) {
          stack.push(parseResult);
        }
        return stack;
      }, []);
    }
    var chromeRe = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/|[a-z]:\\|\\\\).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
    var chromeEvalRe = /\((\S*)(?::(\d+))(?::(\d+))\)/;
    function parseChrome(line) {
      var parts = chromeRe.exec(line);
      if (!parts) {
        return null;
      }
      var isNative = parts[2] && parts[2].indexOf("native") === 0;
      var isEval = parts[2] && parts[2].indexOf("eval") === 0;
      var submatch = chromeEvalRe.exec(parts[2]);
      if (isEval && submatch != null) {
        parts[2] = submatch[1];
        parts[3] = submatch[2];
        parts[4] = submatch[3];
      }
      return {
        file: !isNative ? parts[2] : null,
        methodName: parts[1] || UNKNOWN_FUNCTION,
        arguments: isNative ? [parts[2]] : [],
        lineNumber: parts[3] ? +parts[3] : null,
        column: parts[4] ? +parts[4] : null
      };
    }
    var winjsRe = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
    function parseWinjs(line) {
      var parts = winjsRe.exec(line);
      if (!parts) {
        return null;
      }
      return {
        file: parts[2],
        methodName: parts[1] || UNKNOWN_FUNCTION,
        arguments: [],
        lineNumber: +parts[3],
        column: parts[4] ? +parts[4] : null
      };
    }
    var geckoRe = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i;
    var geckoEvalRe = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
    function parseGecko(line) {
      var parts = geckoRe.exec(line);
      if (!parts) {
        return null;
      }
      var isEval = parts[3] && parts[3].indexOf(" > eval") > -1;
      var submatch = geckoEvalRe.exec(parts[3]);
      if (isEval && submatch != null) {
        parts[3] = submatch[1];
        parts[4] = submatch[2];
        parts[5] = null;
      }
      return {
        file: parts[3],
        methodName: parts[1] || UNKNOWN_FUNCTION,
        arguments: parts[2] ? parts[2].split(",") : [],
        lineNumber: parts[4] ? +parts[4] : null,
        column: parts[5] ? +parts[5] : null
      };
    }
    var javaScriptCoreRe = /^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i;
    function parseJSC(line) {
      var parts = javaScriptCoreRe.exec(line);
      if (!parts) {
        return null;
      }
      return {
        file: parts[3],
        methodName: parts[1] || UNKNOWN_FUNCTION,
        arguments: [],
        lineNumber: +parts[4],
        column: parts[5] ? +parts[5] : null
      };
    }
    var nodeRe = /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i;
    function parseNode(line) {
      var parts = nodeRe.exec(line);
      if (!parts) {
        return null;
      }
      return {
        file: parts[2],
        methodName: parts[1] || UNKNOWN_FUNCTION,
        arguments: [],
        lineNumber: +parts[3],
        column: parts[4] ? +parts[4] : null
      };
    }
    exports2.parse = parse2;
  }
});

// ../../node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/base64.js
var require_base64 = __commonJS({
  "../../node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/base64.js"(exports2) {
    var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    exports2.encode = function(number) {
      if (0 <= number && number < intToCharMap.length) {
        return intToCharMap[number];
      }
      throw new TypeError("Must be between 0 and 63: " + number);
    };
    exports2.decode = function(charCode) {
      var bigA = 65;
      var bigZ = 90;
      var littleA = 97;
      var littleZ = 122;
      var zero = 48;
      var nine = 57;
      var plus = 43;
      var slash = 47;
      var littleOffset = 26;
      var numberOffset = 52;
      if (bigA <= charCode && charCode <= bigZ) {
        return charCode - bigA;
      }
      if (littleA <= charCode && charCode <= littleZ) {
        return charCode - littleA + littleOffset;
      }
      if (zero <= charCode && charCode <= nine) {
        return charCode - zero + numberOffset;
      }
      if (charCode == plus) {
        return 62;
      }
      if (charCode == slash) {
        return 63;
      }
      return -1;
    };
  }
});

// ../../node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/base64-vlq.js
var require_base64_vlq = __commonJS({
  "../../node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/base64-vlq.js"(exports2) {
    var base64 = require_base64();
    var VLQ_BASE_SHIFT = 5;
    var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
    var VLQ_BASE_MASK = VLQ_BASE - 1;
    var VLQ_CONTINUATION_BIT = VLQ_BASE;
    function toVLQSigned(aValue) {
      return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
    }
    function fromVLQSigned(aValue) {
      var isNegative = (aValue & 1) === 1;
      var shifted = aValue >> 1;
      return isNegative ? -shifted : shifted;
    }
    exports2.encode = function base64VLQ_encode(aValue) {
      var encoded = "";
      var digit;
      var vlq = toVLQSigned(aValue);
      do {
        digit = vlq & VLQ_BASE_MASK;
        vlq >>>= VLQ_BASE_SHIFT;
        if (vlq > 0) {
          digit |= VLQ_CONTINUATION_BIT;
        }
        encoded += base64.encode(digit);
      } while (vlq > 0);
      return encoded;
    };
    exports2.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
      var strLen = aStr.length;
      var result = 0;
      var shift = 0;
      var continuation, digit;
      do {
        if (aIndex >= strLen) {
          throw new Error("Expected more digits in base 64 VLQ value.");
        }
        digit = base64.decode(aStr.charCodeAt(aIndex++));
        if (digit === -1) {
          throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
        }
        continuation = !!(digit & VLQ_CONTINUATION_BIT);
        digit &= VLQ_BASE_MASK;
        result = result + (digit << shift);
        shift += VLQ_BASE_SHIFT;
      } while (continuation);
      aOutParam.value = fromVLQSigned(result);
      aOutParam.rest = aIndex;
    };
  }
});

// ../../node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/util.js
var require_util = __commonJS({
  "../../node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/util.js"(exports2) {
    function getArg(aArgs, aName, aDefaultValue) {
      if (aName in aArgs) {
        return aArgs[aName];
      } else if (arguments.length === 3) {
        return aDefaultValue;
      } else {
        throw new Error('"' + aName + '" is a required argument.');
      }
    }
    exports2.getArg = getArg;
    var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
    var dataUrlRegexp = /^data:.+\,.+$/;
    function urlParse(aUrl) {
      var match = aUrl.match(urlRegexp);
      if (!match) {
        return null;
      }
      return {
        scheme: match[1],
        auth: match[2],
        host: match[3],
        port: match[4],
        path: match[5]
      };
    }
    exports2.urlParse = urlParse;
    function urlGenerate(aParsedUrl) {
      var url2 = "";
      if (aParsedUrl.scheme) {
        url2 += aParsedUrl.scheme + ":";
      }
      url2 += "//";
      if (aParsedUrl.auth) {
        url2 += aParsedUrl.auth + "@";
      }
      if (aParsedUrl.host) {
        url2 += aParsedUrl.host;
      }
      if (aParsedUrl.port) {
        url2 += ":" + aParsedUrl.port;
      }
      if (aParsedUrl.path) {
        url2 += aParsedUrl.path;
      }
      return url2;
    }
    exports2.urlGenerate = urlGenerate;
    var MAX_CACHED_INPUTS = 32;
    function lruMemoize(f) {
      var cache = [];
      return function(input) {
        for (var i = 0; i < cache.length; i++) {
          if (cache[i].input === input) {
            var temp = cache[0];
            cache[0] = cache[i];
            cache[i] = temp;
            return cache[0].result;
          }
        }
        var result = f(input);
        cache.unshift({
          input,
          result
        });
        if (cache.length > MAX_CACHED_INPUTS) {
          cache.pop();
        }
        return result;
      };
    }
    var normalize = lruMemoize(function normalize2(aPath) {
      var path4 = aPath;
      var url2 = urlParse(aPath);
      if (url2) {
        if (!url2.path) {
          return aPath;
        }
        path4 = url2.path;
      }
      var isAbsolute = exports2.isAbsolute(path4);
      var parts = [];
      var start = 0;
      var i = 0;
      while (true) {
        start = i;
        i = path4.indexOf("/", start);
        if (i === -1) {
          parts.push(path4.slice(start));
          break;
        } else {
          parts.push(path4.slice(start, i));
          while (i < path4.length && path4[i] === "/") {
            i++;
          }
        }
      }
      for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
        part = parts[i];
        if (part === ".") {
          parts.splice(i, 1);
        } else if (part === "..") {
          up++;
        } else if (up > 0) {
          if (part === "") {
            parts.splice(i + 1, up);
            up = 0;
          } else {
            parts.splice(i, 2);
            up--;
          }
        }
      }
      path4 = parts.join("/");
      if (path4 === "") {
        path4 = isAbsolute ? "/" : ".";
      }
      if (url2) {
        url2.path = path4;
        return urlGenerate(url2);
      }
      return path4;
    });
    exports2.normalize = normalize;
    function join(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      if (aPath === "") {
        aPath = ".";
      }
      var aPathUrl = urlParse(aPath);
      var aRootUrl = urlParse(aRoot);
      if (aRootUrl) {
        aRoot = aRootUrl.path || "/";
      }
      if (aPathUrl && !aPathUrl.scheme) {
        if (aRootUrl) {
          aPathUrl.scheme = aRootUrl.scheme;
        }
        return urlGenerate(aPathUrl);
      }
      if (aPathUrl || aPath.match(dataUrlRegexp)) {
        return aPath;
      }
      if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
        aRootUrl.host = aPath;
        return urlGenerate(aRootUrl);
      }
      var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
      if (aRootUrl) {
        aRootUrl.path = joined;
        return urlGenerate(aRootUrl);
      }
      return joined;
    }
    exports2.join = join;
    exports2.isAbsolute = function(aPath) {
      return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
    };
    function relative(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      aRoot = aRoot.replace(/\/$/, "");
      var level = 0;
      while (aPath.indexOf(aRoot + "/") !== 0) {
        var index = aRoot.lastIndexOf("/");
        if (index < 0) {
          return aPath;
        }
        aRoot = aRoot.slice(0, index);
        if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
          return aPath;
        }
        ++level;
      }
      return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
    }
    exports2.relative = relative;
    var supportsNullProto = function() {
      var obj = /* @__PURE__ */ Object.create(null);
      return !("__proto__" in obj);
    }();
    function identity(s) {
      return s;
    }
    function toSetString(aStr) {
      if (isProtoString(aStr)) {
        return "$" + aStr;
      }
      return aStr;
    }
    exports2.toSetString = supportsNullProto ? identity : toSetString;
    function fromSetString(aStr) {
      if (isProtoString(aStr)) {
        return aStr.slice(1);
      }
      return aStr;
    }
    exports2.fromSetString = supportsNullProto ? identity : fromSetString;
    function isProtoString(s) {
      if (!s) {
        return false;
      }
      var length = s.length;
      if (length < 9) {
        return false;
      }
      if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) {
        return false;
      }
      for (var i = length - 10; i >= 0; i--) {
        if (s.charCodeAt(i) !== 36) {
          return false;
        }
      }
      return true;
    }
    function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
      var cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0 || onlyCompareOriginal) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports2.compareByOriginalPositions = compareByOriginalPositions;
    function compareByOriginalPositionsNoSource(mappingA, mappingB, onlyCompareOriginal) {
      var cmp;
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0 || onlyCompareOriginal) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports2.compareByOriginalPositionsNoSource = compareByOriginalPositionsNoSource;
    function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0 || onlyCompareGenerated) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports2.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
    function compareByGeneratedPositionsDeflatedNoLine(mappingA, mappingB, onlyCompareGenerated) {
      var cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0 || onlyCompareGenerated) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports2.compareByGeneratedPositionsDeflatedNoLine = compareByGeneratedPositionsDeflatedNoLine;
    function strcmp(aStr1, aStr2) {
      if (aStr1 === aStr2) {
        return 0;
      }
      if (aStr1 === null) {
        return 1;
      }
      if (aStr2 === null) {
        return -1;
      }
      if (aStr1 > aStr2) {
        return 1;
      }
      return -1;
    }
    function compareByGeneratedPositionsInflated(mappingA, mappingB) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports2.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
    function parseSourceMapInput(str) {
      return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
    }
    exports2.parseSourceMapInput = parseSourceMapInput;
    function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
      sourceURL = sourceURL || "";
      if (sourceRoot) {
        if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") {
          sourceRoot += "/";
        }
        sourceURL = sourceRoot + sourceURL;
      }
      if (sourceMapURL) {
        var parsed = urlParse(sourceMapURL);
        if (!parsed) {
          throw new Error("sourceMapURL could not be parsed");
        }
        if (parsed.path) {
          var index = parsed.path.lastIndexOf("/");
          if (index >= 0) {
            parsed.path = parsed.path.substring(0, index + 1);
          }
        }
        sourceURL = join(urlGenerate(parsed), sourceURL);
      }
      return normalize(sourceURL);
    }
    exports2.computeSourceURL = computeSourceURL;
  }
});

// ../../node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/array-set.js
var require_array_set = __commonJS({
  "../../node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/array-set.js"(exports2) {
    var util2 = require_util();
    var has = Object.prototype.hasOwnProperty;
    var hasNativeMap = typeof Map !== "undefined";
    function ArraySet() {
      this._array = [];
      this._set = hasNativeMap ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
    }
    ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
      var set = new ArraySet();
      for (var i = 0, len = aArray.length; i < len; i++) {
        set.add(aArray[i], aAllowDuplicates);
      }
      return set;
    };
    ArraySet.prototype.size = function ArraySet_size() {
      return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
    };
    ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
      var sStr = hasNativeMap ? aStr : util2.toSetString(aStr);
      var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
      var idx = this._array.length;
      if (!isDuplicate || aAllowDuplicates) {
        this._array.push(aStr);
      }
      if (!isDuplicate) {
        if (hasNativeMap) {
          this._set.set(aStr, idx);
        } else {
          this._set[sStr] = idx;
        }
      }
    };
    ArraySet.prototype.has = function ArraySet_has(aStr) {
      if (hasNativeMap) {
        return this._set.has(aStr);
      } else {
        var sStr = util2.toSetString(aStr);
        return has.call(this._set, sStr);
      }
    };
    ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
      if (hasNativeMap) {
        var idx = this._set.get(aStr);
        if (idx >= 0) {
          return idx;
        }
      } else {
        var sStr = util2.toSetString(aStr);
        if (has.call(this._set, sStr)) {
          return this._set[sStr];
        }
      }
      throw new Error('"' + aStr + '" is not in the set.');
    };
    ArraySet.prototype.at = function ArraySet_at(aIdx) {
      if (aIdx >= 0 && aIdx < this._array.length) {
        return this._array[aIdx];
      }
      throw new Error("No element indexed by " + aIdx);
    };
    ArraySet.prototype.toArray = function ArraySet_toArray() {
      return this._array.slice();
    };
    exports2.ArraySet = ArraySet;
  }
});

// ../../node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/mapping-list.js
var require_mapping_list = __commonJS({
  "../../node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/mapping-list.js"(exports2) {
    var util2 = require_util();
    function generatedPositionAfter(mappingA, mappingB) {
      var lineA = mappingA.generatedLine;
      var lineB = mappingB.generatedLine;
      var columnA = mappingA.generatedColumn;
      var columnB = mappingB.generatedColumn;
      return lineB > lineA || lineB == lineA && columnB >= columnA || util2.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
    }
    function MappingList() {
      this._array = [];
      this._sorted = true;
      this._last = { generatedLine: -1, generatedColumn: 0 };
    }
    MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
      this._array.forEach(aCallback, aThisArg);
    };
    MappingList.prototype.add = function MappingList_add(aMapping) {
      if (generatedPositionAfter(this._last, aMapping)) {
        this._last = aMapping;
        this._array.push(aMapping);
      } else {
        this._sorted = false;
        this._array.push(aMapping);
      }
    };
    MappingList.prototype.toArray = function MappingList_toArray() {
      if (!this._sorted) {
        this._array.sort(util2.compareByGeneratedPositionsInflated);
        this._sorted = true;
      }
      return this._array;
    };
    exports2.MappingList = MappingList;
  }
});

// ../../node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/source-map-generator.js
var require_source_map_generator = __commonJS({
  "../../node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/source-map-generator.js"(exports2) {
    var base64VLQ = require_base64_vlq();
    var util2 = require_util();
    var ArraySet = require_array_set().ArraySet;
    var MappingList = require_mapping_list().MappingList;
    function SourceMapGenerator(aArgs) {
      if (!aArgs) {
        aArgs = {};
      }
      this._file = util2.getArg(aArgs, "file", null);
      this._sourceRoot = util2.getArg(aArgs, "sourceRoot", null);
      this._skipValidation = util2.getArg(aArgs, "skipValidation", false);
      this._ignoreInvalidMapping = util2.getArg(aArgs, "ignoreInvalidMapping", false);
      this._sources = new ArraySet();
      this._names = new ArraySet();
      this._mappings = new MappingList();
      this._sourcesContents = null;
    }
    SourceMapGenerator.prototype._version = 3;
    SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer, generatorOps) {
      var sourceRoot = aSourceMapConsumer.sourceRoot;
      var generator = new SourceMapGenerator(Object.assign(generatorOps || {}, {
        file: aSourceMapConsumer.file,
        sourceRoot
      }));
      aSourceMapConsumer.eachMapping(function(mapping) {
        var newMapping = {
          generated: {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
          }
        };
        if (mapping.source != null) {
          newMapping.source = mapping.source;
          if (sourceRoot != null) {
            newMapping.source = util2.relative(sourceRoot, newMapping.source);
          }
          newMapping.original = {
            line: mapping.originalLine,
            column: mapping.originalColumn
          };
          if (mapping.name != null) {
            newMapping.name = mapping.name;
          }
        }
        generator.addMapping(newMapping);
      });
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var sourceRelative = sourceFile;
        if (sourceRoot !== null) {
          sourceRelative = util2.relative(sourceRoot, sourceFile);
        }
        if (!generator._sources.has(sourceRelative)) {
          generator._sources.add(sourceRelative);
        }
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          generator.setSourceContent(sourceFile, content);
        }
      });
      return generator;
    };
    SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
      var generated = util2.getArg(aArgs, "generated");
      var original = util2.getArg(aArgs, "original", null);
      var source = util2.getArg(aArgs, "source", null);
      var name = util2.getArg(aArgs, "name", null);
      if (!this._skipValidation) {
        if (this._validateMapping(generated, original, source, name) === false) {
          return;
        }
      }
      if (source != null) {
        source = String(source);
        if (!this._sources.has(source)) {
          this._sources.add(source);
        }
      }
      if (name != null) {
        name = String(name);
        if (!this._names.has(name)) {
          this._names.add(name);
        }
      }
      this._mappings.add({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original != null && original.line,
        originalColumn: original != null && original.column,
        source,
        name
      });
    };
    SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
      var source = aSourceFile;
      if (this._sourceRoot != null) {
        source = util2.relative(this._sourceRoot, source);
      }
      if (aSourceContent != null) {
        if (!this._sourcesContents) {
          this._sourcesContents = /* @__PURE__ */ Object.create(null);
        }
        this._sourcesContents[util2.toSetString(source)] = aSourceContent;
      } else if (this._sourcesContents) {
        delete this._sourcesContents[util2.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null;
        }
      }
    };
    SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
      var sourceFile = aSourceFile;
      if (aSourceFile == null) {
        if (aSourceMapConsumer.file == null) {
          throw new Error(
            `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
          );
        }
        sourceFile = aSourceMapConsumer.file;
      }
      var sourceRoot = this._sourceRoot;
      if (sourceRoot != null) {
        sourceFile = util2.relative(sourceRoot, sourceFile);
      }
      var newSources = new ArraySet();
      var newNames = new ArraySet();
      this._mappings.unsortedForEach(function(mapping) {
        if (mapping.source === sourceFile && mapping.originalLine != null) {
          var original = aSourceMapConsumer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
          });
          if (original.source != null) {
            mapping.source = original.source;
            if (aSourceMapPath != null) {
              mapping.source = util2.join(aSourceMapPath, mapping.source);
            }
            if (sourceRoot != null) {
              mapping.source = util2.relative(sourceRoot, mapping.source);
            }
            mapping.originalLine = original.line;
            mapping.originalColumn = original.column;
            if (original.name != null) {
              mapping.name = original.name;
            }
          }
        }
        var source = mapping.source;
        if (source != null && !newSources.has(source)) {
          newSources.add(source);
        }
        var name = mapping.name;
        if (name != null && !newNames.has(name)) {
          newNames.add(name);
        }
      }, this);
      this._sources = newSources;
      this._names = newNames;
      aSourceMapConsumer.sources.forEach(function(sourceFile2) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile2);
        if (content != null) {
          if (aSourceMapPath != null) {
            sourceFile2 = util2.join(aSourceMapPath, sourceFile2);
          }
          if (sourceRoot != null) {
            sourceFile2 = util2.relative(sourceRoot, sourceFile2);
          }
          this.setSourceContent(sourceFile2, content);
        }
      }, this);
    };
    SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
      if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
        var message = "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";
        if (this._ignoreInvalidMapping) {
          if (typeof console !== "undefined" && console.warn) {
            console.warn(message);
          }
          return false;
        } else {
          throw new Error(message);
        }
      }
      if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
        return;
      } else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
        return;
      } else {
        var message = "Invalid mapping: " + JSON.stringify({
          generated: aGenerated,
          source: aSource,
          original: aOriginal,
          name: aName
        });
        if (this._ignoreInvalidMapping) {
          if (typeof console !== "undefined" && console.warn) {
            console.warn(message);
          }
          return false;
        } else {
          throw new Error(message);
        }
      }
    };
    SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
      var previousGeneratedColumn = 0;
      var previousGeneratedLine = 1;
      var previousOriginalColumn = 0;
      var previousOriginalLine = 0;
      var previousName = 0;
      var previousSource = 0;
      var result = "";
      var next;
      var mapping;
      var nameIdx;
      var sourceIdx;
      var mappings = this._mappings.toArray();
      for (var i = 0, len = mappings.length; i < len; i++) {
        mapping = mappings[i];
        next = "";
        if (mapping.generatedLine !== previousGeneratedLine) {
          previousGeneratedColumn = 0;
          while (mapping.generatedLine !== previousGeneratedLine) {
            next += ";";
            previousGeneratedLine++;
          }
        } else {
          if (i > 0) {
            if (!util2.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
              continue;
            }
            next += ",";
          }
        }
        next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;
        if (mapping.source != null) {
          sourceIdx = this._sources.indexOf(mapping.source);
          next += base64VLQ.encode(sourceIdx - previousSource);
          previousSource = sourceIdx;
          next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
          previousOriginalLine = mapping.originalLine - 1;
          next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
          previousOriginalColumn = mapping.originalColumn;
          if (mapping.name != null) {
            nameIdx = this._names.indexOf(mapping.name);
            next += base64VLQ.encode(nameIdx - previousName);
            previousName = nameIdx;
          }
        }
        result += next;
      }
      return result;
    };
    SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
      return aSources.map(function(source) {
        if (!this._sourcesContents) {
          return null;
        }
        if (aSourceRoot != null) {
          source = util2.relative(aSourceRoot, source);
        }
        var key = util2.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
      }, this);
    };
    SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
      var map = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      };
      if (this._file != null) {
        map.file = this._file;
      }
      if (this._sourceRoot != null) {
        map.sourceRoot = this._sourceRoot;
      }
      if (this._sourcesContents) {
        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
      }
      return map;
    };
    SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
      return JSON.stringify(this.toJSON());
    };
    exports2.SourceMapGenerator = SourceMapGenerator;
  }
});

// ../../node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/binary-search.js
var require_binary_search = __commonJS({
  "../../node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/binary-search.js"(exports2) {
    exports2.GREATEST_LOWER_BOUND = 1;
    exports2.LEAST_UPPER_BOUND = 2;
    function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
      var mid = Math.floor((aHigh - aLow) / 2) + aLow;
      var cmp = aCompare(aNeedle, aHaystack[mid], true);
      if (cmp === 0) {
        return mid;
      } else if (cmp > 0) {
        if (aHigh - mid > 1) {
          return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias == exports2.LEAST_UPPER_BOUND) {
          return aHigh < aHaystack.length ? aHigh : -1;
        } else {
          return mid;
        }
      } else {
        if (mid - aLow > 1) {
          return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias == exports2.LEAST_UPPER_BOUND) {
          return mid;
        } else {
          return aLow < 0 ? -1 : aLow;
        }
      }
    }
    exports2.search = function search(aNeedle, aHaystack, aCompare, aBias) {
      if (aHaystack.length === 0) {
        return -1;
      }
      var index = recursiveSearch(
        -1,
        aHaystack.length,
        aNeedle,
        aHaystack,
        aCompare,
        aBias || exports2.GREATEST_LOWER_BOUND
      );
      if (index < 0) {
        return -1;
      }
      while (index - 1 >= 0) {
        if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
          break;
        }
        --index;
      }
      return index;
    };
  }
});

// ../../node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/quick-sort.js
var require_quick_sort = __commonJS({
  "../../node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/quick-sort.js"(exports2) {
    function SortTemplate(comparator) {
      function swap(ary, x, y) {
        var temp = ary[x];
        ary[x] = ary[y];
        ary[y] = temp;
      }
      function randomIntInRange(low, high) {
        return Math.round(low + Math.random() * (high - low));
      }
      function doQuickSort(ary, comparator2, p, r) {
        if (p < r) {
          var pivotIndex = randomIntInRange(p, r);
          var i = p - 1;
          swap(ary, pivotIndex, r);
          var pivot = ary[r];
          for (var j = p; j < r; j++) {
            if (comparator2(ary[j], pivot, false) <= 0) {
              i += 1;
              swap(ary, i, j);
            }
          }
          swap(ary, i + 1, j);
          var q = i + 1;
          doQuickSort(ary, comparator2, p, q - 1);
          doQuickSort(ary, comparator2, q + 1, r);
        }
      }
      return doQuickSort;
    }
    function cloneSort(comparator) {
      let template = SortTemplate.toString();
      let templateFn = new Function(`return ${template}`)();
      return templateFn(comparator);
    }
    var sortCache = /* @__PURE__ */ new WeakMap();
    exports2.quickSort = function(ary, comparator, start = 0) {
      let doQuickSort = sortCache.get(comparator);
      if (doQuickSort === void 0) {
        doQuickSort = cloneSort(comparator);
        sortCache.set(comparator, doQuickSort);
      }
      doQuickSort(ary, comparator, start, ary.length - 1);
    };
  }
});

// ../../node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/source-map-consumer.js
var require_source_map_consumer = __commonJS({
  "../../node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/source-map-consumer.js"(exports2) {
    var util2 = require_util();
    var binarySearch = require_binary_search();
    var ArraySet = require_array_set().ArraySet;
    var base64VLQ = require_base64_vlq();
    var quickSort = require_quick_sort().quickSort;
    function SourceMapConsumer2(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util2.parseSourceMapInput(aSourceMap);
      }
      return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
    }
    SourceMapConsumer2.fromSourceMap = function(aSourceMap, aSourceMapURL) {
      return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
    };
    SourceMapConsumer2.prototype._version = 3;
    SourceMapConsumer2.prototype.__generatedMappings = null;
    Object.defineProperty(SourceMapConsumer2.prototype, "_generatedMappings", {
      configurable: true,
      enumerable: true,
      get: function() {
        if (!this.__generatedMappings) {
          this._parseMappings(this._mappings, this.sourceRoot);
        }
        return this.__generatedMappings;
      }
    });
    SourceMapConsumer2.prototype.__originalMappings = null;
    Object.defineProperty(SourceMapConsumer2.prototype, "_originalMappings", {
      configurable: true,
      enumerable: true,
      get: function() {
        if (!this.__originalMappings) {
          this._parseMappings(this._mappings, this.sourceRoot);
        }
        return this.__originalMappings;
      }
    });
    SourceMapConsumer2.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
      var c = aStr.charAt(index);
      return c === ";" || c === ",";
    };
    SourceMapConsumer2.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      throw new Error("Subclasses must implement _parseMappings");
    };
    SourceMapConsumer2.GENERATED_ORDER = 1;
    SourceMapConsumer2.ORIGINAL_ORDER = 2;
    SourceMapConsumer2.GREATEST_LOWER_BOUND = 1;
    SourceMapConsumer2.LEAST_UPPER_BOUND = 2;
    SourceMapConsumer2.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
      var context = aContext || null;
      var order = aOrder || SourceMapConsumer2.GENERATED_ORDER;
      var mappings;
      switch (order) {
        case SourceMapConsumer2.GENERATED_ORDER:
          mappings = this._generatedMappings;
          break;
        case SourceMapConsumer2.ORIGINAL_ORDER:
          mappings = this._originalMappings;
          break;
        default:
          throw new Error("Unknown order of iteration.");
      }
      var sourceRoot = this.sourceRoot;
      var boundCallback = aCallback.bind(context);
      var names = this._names;
      var sources = this._sources;
      var sourceMapURL = this._sourceMapURL;
      for (var i = 0, n = mappings.length; i < n; i++) {
        var mapping = mappings[i];
        var source = mapping.source === null ? null : sources.at(mapping.source);
        if (source !== null) {
          source = util2.computeSourceURL(sourceRoot, source, sourceMapURL);
        }
        boundCallback({
          source,
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: mapping.name === null ? null : names.at(mapping.name)
        });
      }
    };
    SourceMapConsumer2.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
      var line = util2.getArg(aArgs, "line");
      var needle = {
        source: util2.getArg(aArgs, "source"),
        originalLine: line,
        originalColumn: util2.getArg(aArgs, "column", 0)
      };
      needle.source = this._findSourceIndex(needle.source);
      if (needle.source < 0) {
        return [];
      }
      var mappings = [];
      var index = this._findMapping(
        needle,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        util2.compareByOriginalPositions,
        binarySearch.LEAST_UPPER_BOUND
      );
      if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (aArgs.column === void 0) {
          var originalLine = mapping.originalLine;
          while (mapping && mapping.originalLine === originalLine) {
            mappings.push({
              line: util2.getArg(mapping, "generatedLine", null),
              column: util2.getArg(mapping, "generatedColumn", null),
              lastColumn: util2.getArg(mapping, "lastGeneratedColumn", null)
            });
            mapping = this._originalMappings[++index];
          }
        } else {
          var originalColumn = mapping.originalColumn;
          while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
            mappings.push({
              line: util2.getArg(mapping, "generatedLine", null),
              column: util2.getArg(mapping, "generatedColumn", null),
              lastColumn: util2.getArg(mapping, "lastGeneratedColumn", null)
            });
            mapping = this._originalMappings[++index];
          }
        }
      }
      return mappings;
    };
    exports2.SourceMapConsumer = SourceMapConsumer2;
    function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util2.parseSourceMapInput(aSourceMap);
      }
      var version = util2.getArg(sourceMap, "version");
      var sources = util2.getArg(sourceMap, "sources");
      var names = util2.getArg(sourceMap, "names", []);
      var sourceRoot = util2.getArg(sourceMap, "sourceRoot", null);
      var sourcesContent = util2.getArg(sourceMap, "sourcesContent", null);
      var mappings = util2.getArg(sourceMap, "mappings");
      var file = util2.getArg(sourceMap, "file", null);
      if (version != this._version) {
        throw new Error("Unsupported version: " + version);
      }
      if (sourceRoot) {
        sourceRoot = util2.normalize(sourceRoot);
      }
      sources = sources.map(String).map(util2.normalize).map(function(source) {
        return sourceRoot && util2.isAbsolute(sourceRoot) && util2.isAbsolute(source) ? util2.relative(sourceRoot, source) : source;
      });
      this._names = ArraySet.fromArray(names.map(String), true);
      this._sources = ArraySet.fromArray(sources, true);
      this._absoluteSources = this._sources.toArray().map(function(s) {
        return util2.computeSourceURL(sourceRoot, s, aSourceMapURL);
      });
      this.sourceRoot = sourceRoot;
      this.sourcesContent = sourcesContent;
      this._mappings = mappings;
      this._sourceMapURL = aSourceMapURL;
      this.file = file;
    }
    BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer2.prototype);
    BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer2;
    BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
      var relativeSource = aSource;
      if (this.sourceRoot != null) {
        relativeSource = util2.relative(this.sourceRoot, relativeSource);
      }
      if (this._sources.has(relativeSource)) {
        return this._sources.indexOf(relativeSource);
      }
      var i;
      for (i = 0; i < this._absoluteSources.length; ++i) {
        if (this._absoluteSources[i] == aSource) {
          return i;
        }
      }
      return -1;
    };
    BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
      var smc = Object.create(BasicSourceMapConsumer.prototype);
      var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
      var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
      smc.sourceRoot = aSourceMap._sourceRoot;
      smc.sourcesContent = aSourceMap._generateSourcesContent(
        smc._sources.toArray(),
        smc.sourceRoot
      );
      smc.file = aSourceMap._file;
      smc._sourceMapURL = aSourceMapURL;
      smc._absoluteSources = smc._sources.toArray().map(function(s) {
        return util2.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
      });
      var generatedMappings = aSourceMap._mappings.toArray().slice();
      var destGeneratedMappings = smc.__generatedMappings = [];
      var destOriginalMappings = smc.__originalMappings = [];
      for (var i = 0, length = generatedMappings.length; i < length; i++) {
        var srcMapping = generatedMappings[i];
        var destMapping = new Mapping();
        destMapping.generatedLine = srcMapping.generatedLine;
        destMapping.generatedColumn = srcMapping.generatedColumn;
        if (srcMapping.source) {
          destMapping.source = sources.indexOf(srcMapping.source);
          destMapping.originalLine = srcMapping.originalLine;
          destMapping.originalColumn = srcMapping.originalColumn;
          if (srcMapping.name) {
            destMapping.name = names.indexOf(srcMapping.name);
          }
          destOriginalMappings.push(destMapping);
        }
        destGeneratedMappings.push(destMapping);
      }
      quickSort(smc.__originalMappings, util2.compareByOriginalPositions);
      return smc;
    };
    BasicSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", {
      get: function() {
        return this._absoluteSources.slice();
      }
    });
    function Mapping() {
      this.generatedLine = 0;
      this.generatedColumn = 0;
      this.source = null;
      this.originalLine = null;
      this.originalColumn = null;
      this.name = null;
    }
    var compareGenerated = util2.compareByGeneratedPositionsDeflatedNoLine;
    function sortGenerated(array, start) {
      let l = array.length;
      let n = array.length - start;
      if (n <= 1) {
        return;
      } else if (n == 2) {
        let a = array[start];
        let b = array[start + 1];
        if (compareGenerated(a, b) > 0) {
          array[start] = b;
          array[start + 1] = a;
        }
      } else if (n < 20) {
        for (let i = start; i < l; i++) {
          for (let j = i; j > start; j--) {
            let a = array[j - 1];
            let b = array[j];
            if (compareGenerated(a, b) <= 0) {
              break;
            }
            array[j - 1] = b;
            array[j] = a;
          }
        }
      } else {
        quickSort(array, compareGenerated, start);
      }
    }
    BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      var generatedLine = 1;
      var previousGeneratedColumn = 0;
      var previousOriginalLine = 0;
      var previousOriginalColumn = 0;
      var previousSource = 0;
      var previousName = 0;
      var length = aStr.length;
      var index = 0;
      var cachedSegments = {};
      var temp = {};
      var originalMappings = [];
      var generatedMappings = [];
      var mapping, str, segment, end, value;
      let subarrayStart = 0;
      while (index < length) {
        if (aStr.charAt(index) === ";") {
          generatedLine++;
          index++;
          previousGeneratedColumn = 0;
          sortGenerated(generatedMappings, subarrayStart);
          subarrayStart = generatedMappings.length;
        } else if (aStr.charAt(index) === ",") {
          index++;
        } else {
          mapping = new Mapping();
          mapping.generatedLine = generatedLine;
          for (end = index; end < length; end++) {
            if (this._charIsMappingSeparator(aStr, end)) {
              break;
            }
          }
          str = aStr.slice(index, end);
          segment = [];
          while (index < end) {
            base64VLQ.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }
          if (segment.length === 2) {
            throw new Error("Found a source, but no line and column");
          }
          if (segment.length === 3) {
            throw new Error("Found a source and line, but no column");
          }
          mapping.generatedColumn = previousGeneratedColumn + segment[0];
          previousGeneratedColumn = mapping.generatedColumn;
          if (segment.length > 1) {
            mapping.source = previousSource + segment[1];
            previousSource += segment[1];
            mapping.originalLine = previousOriginalLine + segment[2];
            previousOriginalLine = mapping.originalLine;
            mapping.originalLine += 1;
            mapping.originalColumn = previousOriginalColumn + segment[3];
            previousOriginalColumn = mapping.originalColumn;
            if (segment.length > 4) {
              mapping.name = previousName + segment[4];
              previousName += segment[4];
            }
          }
          generatedMappings.push(mapping);
          if (typeof mapping.originalLine === "number") {
            let currentSource = mapping.source;
            while (originalMappings.length <= currentSource) {
              originalMappings.push(null);
            }
            if (originalMappings[currentSource] === null) {
              originalMappings[currentSource] = [];
            }
            originalMappings[currentSource].push(mapping);
          }
        }
      }
      sortGenerated(generatedMappings, subarrayStart);
      this.__generatedMappings = generatedMappings;
      for (var i = 0; i < originalMappings.length; i++) {
        if (originalMappings[i] != null) {
          quickSort(originalMappings[i], util2.compareByOriginalPositionsNoSource);
        }
      }
      this.__originalMappings = [].concat(...originalMappings);
    };
    BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
      if (aNeedle[aLineName] <= 0) {
        throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
      }
      return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
    };
    BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
      for (var index = 0; index < this._generatedMappings.length; ++index) {
        var mapping = this._generatedMappings[index];
        if (index + 1 < this._generatedMappings.length) {
          var nextMapping = this._generatedMappings[index + 1];
          if (mapping.generatedLine === nextMapping.generatedLine) {
            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
            continue;
          }
        }
        mapping.lastGeneratedColumn = Infinity;
      }
    };
    BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util2.getArg(aArgs, "line"),
        generatedColumn: util2.getArg(aArgs, "column")
      };
      var index = this._findMapping(
        needle,
        this._generatedMappings,
        "generatedLine",
        "generatedColumn",
        util2.compareByGeneratedPositionsDeflated,
        util2.getArg(aArgs, "bias", SourceMapConsumer2.GREATEST_LOWER_BOUND)
      );
      if (index >= 0) {
        var mapping = this._generatedMappings[index];
        if (mapping.generatedLine === needle.generatedLine) {
          var source = util2.getArg(mapping, "source", null);
          if (source !== null) {
            source = this._sources.at(source);
            source = util2.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
          }
          var name = util2.getArg(mapping, "name", null);
          if (name !== null) {
            name = this._names.at(name);
          }
          return {
            source,
            line: util2.getArg(mapping, "originalLine", null),
            column: util2.getArg(mapping, "originalColumn", null),
            name
          };
        }
      }
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    };
    BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
      if (!this.sourcesContent) {
        return false;
      }
      return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
        return sc == null;
      });
    };
    BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      if (!this.sourcesContent) {
        return null;
      }
      var index = this._findSourceIndex(aSource);
      if (index >= 0) {
        return this.sourcesContent[index];
      }
      var relativeSource = aSource;
      if (this.sourceRoot != null) {
        relativeSource = util2.relative(this.sourceRoot, relativeSource);
      }
      var url2;
      if (this.sourceRoot != null && (url2 = util2.urlParse(this.sourceRoot))) {
        var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
        if (url2.scheme == "file" && this._sources.has(fileUriAbsPath)) {
          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
        }
        if ((!url2.path || url2.path == "/") && this._sources.has("/" + relativeSource)) {
          return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
        }
      }
      if (nullOnMissing) {
        return null;
      } else {
        throw new Error('"' + relativeSource + '" is not in the SourceMap.');
      }
    };
    BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
      var source = util2.getArg(aArgs, "source");
      source = this._findSourceIndex(source);
      if (source < 0) {
        return {
          line: null,
          column: null,
          lastColumn: null
        };
      }
      var needle = {
        source,
        originalLine: util2.getArg(aArgs, "line"),
        originalColumn: util2.getArg(aArgs, "column")
      };
      var index = this._findMapping(
        needle,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        util2.compareByOriginalPositions,
        util2.getArg(aArgs, "bias", SourceMapConsumer2.GREATEST_LOWER_BOUND)
      );
      if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (mapping.source === needle.source) {
          return {
            line: util2.getArg(mapping, "generatedLine", null),
            column: util2.getArg(mapping, "generatedColumn", null),
            lastColumn: util2.getArg(mapping, "lastGeneratedColumn", null)
          };
        }
      }
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    };
    exports2.BasicSourceMapConsumer = BasicSourceMapConsumer;
    function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util2.parseSourceMapInput(aSourceMap);
      }
      var version = util2.getArg(sourceMap, "version");
      var sections = util2.getArg(sourceMap, "sections");
      if (version != this._version) {
        throw new Error("Unsupported version: " + version);
      }
      this._sources = new ArraySet();
      this._names = new ArraySet();
      var lastOffset = {
        line: -1,
        column: 0
      };
      this._sections = sections.map(function(s) {
        if (s.url) {
          throw new Error("Support for url field in sections not implemented.");
        }
        var offset = util2.getArg(s, "offset");
        var offsetLine = util2.getArg(offset, "line");
        var offsetColumn = util2.getArg(offset, "column");
        if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) {
          throw new Error("Section offsets must be ordered and non-overlapping.");
        }
        lastOffset = offset;
        return {
          generatedOffset: {
            // The offset fields are 0-based, but we use 1-based indices when
            // encoding/decoding from VLQ.
            generatedLine: offsetLine + 1,
            generatedColumn: offsetColumn + 1
          },
          consumer: new SourceMapConsumer2(util2.getArg(s, "map"), aSourceMapURL)
        };
      });
    }
    IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer2.prototype);
    IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer2;
    IndexedSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", {
      get: function() {
        var sources = [];
        for (var i = 0; i < this._sections.length; i++) {
          for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
            sources.push(this._sections[i].consumer.sources[j]);
          }
        }
        return sources;
      }
    });
    IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util2.getArg(aArgs, "line"),
        generatedColumn: util2.getArg(aArgs, "column")
      };
      var sectionIndex = binarySearch.search(
        needle,
        this._sections,
        function(needle2, section2) {
          var cmp = needle2.generatedLine - section2.generatedOffset.generatedLine;
          if (cmp) {
            return cmp;
          }
          return needle2.generatedColumn - section2.generatedOffset.generatedColumn;
        }
      );
      var section = this._sections[sectionIndex];
      if (!section) {
        return {
          source: null,
          line: null,
          column: null,
          name: null
        };
      }
      return section.consumer.originalPositionFor({
        line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
        column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
        bias: aArgs.bias
      });
    };
    IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
      return this._sections.every(function(s) {
        return s.consumer.hasContentsOfAllSources();
      });
    };
    IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var content = section.consumer.sourceContentFor(aSource, true);
        if (content || content === "") {
          return content;
        }
      }
      if (nullOnMissing) {
        return null;
      } else {
        throw new Error('"' + aSource + '" is not in the SourceMap.');
      }
    };
    IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        if (section.consumer._findSourceIndex(util2.getArg(aArgs, "source")) === -1) {
          continue;
        }
        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
        if (generatedPosition) {
          var ret = {
            line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
            column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
          };
          return ret;
        }
      }
      return {
        line: null,
        column: null
      };
    };
    IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      this.__generatedMappings = [];
      this.__originalMappings = [];
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var sectionMappings = section.consumer._generatedMappings;
        for (var j = 0; j < sectionMappings.length; j++) {
          var mapping = sectionMappings[j];
          var source = section.consumer._sources.at(mapping.source);
          if (source !== null) {
            source = util2.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
          }
          this._sources.add(source);
          source = this._sources.indexOf(source);
          var name = null;
          if (mapping.name) {
            name = section.consumer._names.at(mapping.name);
            this._names.add(name);
            name = this._names.indexOf(name);
          }
          var adjustedMapping = {
            source,
            generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
            generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name
          };
          this.__generatedMappings.push(adjustedMapping);
          if (typeof adjustedMapping.originalLine === "number") {
            this.__originalMappings.push(adjustedMapping);
          }
        }
      }
      quickSort(this.__generatedMappings, util2.compareByGeneratedPositionsDeflated);
      quickSort(this.__originalMappings, util2.compareByOriginalPositions);
    };
    exports2.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
  }
});

// ../../node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/source-node.js
var require_source_node = __commonJS({
  "../../node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/lib/source-node.js"(exports2) {
    var SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
    var util2 = require_util();
    var REGEX_NEWLINE = /(\r?\n)/;
    var NEWLINE_CODE = 10;
    var isSourceNode = "$$$isSourceNode$$$";
    function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
      this.children = [];
      this.sourceContents = {};
      this.line = aLine == null ? null : aLine;
      this.column = aColumn == null ? null : aColumn;
      this.source = aSource == null ? null : aSource;
      this.name = aName == null ? null : aName;
      this[isSourceNode] = true;
      if (aChunks != null) this.add(aChunks);
    }
    SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
      var node = new SourceNode();
      var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
      var remainingLinesIndex = 0;
      var shiftNextLine = function() {
        var lineContents = getNextLine();
        var newLine = getNextLine() || "";
        return lineContents + newLine;
        function getNextLine() {
          return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
        }
      };
      var lastGeneratedLine = 1, lastGeneratedColumn = 0;
      var lastMapping = null;
      aSourceMapConsumer.eachMapping(function(mapping) {
        if (lastMapping !== null) {
          if (lastGeneratedLine < mapping.generatedLine) {
            addMappingWithCode(lastMapping, shiftNextLine());
            lastGeneratedLine++;
            lastGeneratedColumn = 0;
          } else {
            var nextLine = remainingLines[remainingLinesIndex] || "";
            var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
            remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
            addMappingWithCode(lastMapping, code);
            lastMapping = mapping;
            return;
          }
        }
        while (lastGeneratedLine < mapping.generatedLine) {
          node.add(shiftNextLine());
          lastGeneratedLine++;
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
          var nextLine = remainingLines[remainingLinesIndex] || "";
          node.add(nextLine.substr(0, mapping.generatedColumn));
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
        }
        lastMapping = mapping;
      }, this);
      if (remainingLinesIndex < remainingLines.length) {
        if (lastMapping) {
          addMappingWithCode(lastMapping, shiftNextLine());
        }
        node.add(remainingLines.splice(remainingLinesIndex).join(""));
      }
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aRelativePath != null) {
            sourceFile = util2.join(aRelativePath, sourceFile);
          }
          node.setSourceContent(sourceFile, content);
        }
      });
      return node;
      function addMappingWithCode(mapping, code) {
        if (mapping === null || mapping.source === void 0) {
          node.add(code);
        } else {
          var source = aRelativePath ? util2.join(aRelativePath, mapping.source) : mapping.source;
          node.add(new SourceNode(
            mapping.originalLine,
            mapping.originalColumn,
            source,
            code,
            mapping.name
          ));
        }
      }
    };
    SourceNode.prototype.add = function SourceNode_add(aChunk) {
      if (Array.isArray(aChunk)) {
        aChunk.forEach(function(chunk) {
          this.add(chunk);
        }, this);
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        if (aChunk) {
          this.children.push(aChunk);
        }
      } else {
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
        );
      }
      return this;
    };
    SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
      if (Array.isArray(aChunk)) {
        for (var i = aChunk.length - 1; i >= 0; i--) {
          this.prepend(aChunk[i]);
        }
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        this.children.unshift(aChunk);
      } else {
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
        );
      }
      return this;
    };
    SourceNode.prototype.walk = function SourceNode_walk(aFn) {
      var chunk;
      for (var i = 0, len = this.children.length; i < len; i++) {
        chunk = this.children[i];
        if (chunk[isSourceNode]) {
          chunk.walk(aFn);
        } else {
          if (chunk !== "") {
            aFn(chunk, {
              source: this.source,
              line: this.line,
              column: this.column,
              name: this.name
            });
          }
        }
      }
    };
    SourceNode.prototype.join = function SourceNode_join(aSep) {
      var newChildren;
      var i;
      var len = this.children.length;
      if (len > 0) {
        newChildren = [];
        for (i = 0; i < len - 1; i++) {
          newChildren.push(this.children[i]);
          newChildren.push(aSep);
        }
        newChildren.push(this.children[i]);
        this.children = newChildren;
      }
      return this;
    };
    SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
      var lastChild = this.children[this.children.length - 1];
      if (lastChild[isSourceNode]) {
        lastChild.replaceRight(aPattern, aReplacement);
      } else if (typeof lastChild === "string") {
        this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
      } else {
        this.children.push("".replace(aPattern, aReplacement));
      }
      return this;
    };
    SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
      this.sourceContents[util2.toSetString(aSourceFile)] = aSourceContent;
    };
    SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
      for (var i = 0, len = this.children.length; i < len; i++) {
        if (this.children[i][isSourceNode]) {
          this.children[i].walkSourceContents(aFn);
        }
      }
      var sources = Object.keys(this.sourceContents);
      for (var i = 0, len = sources.length; i < len; i++) {
        aFn(util2.fromSetString(sources[i]), this.sourceContents[sources[i]]);
      }
    };
    SourceNode.prototype.toString = function SourceNode_toString() {
      var str = "";
      this.walk(function(chunk) {
        str += chunk;
      });
      return str;
    };
    SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
      var generated = {
        code: "",
        line: 1,
        column: 0
      };
      var map = new SourceMapGenerator(aArgs);
      var sourceMappingActive = false;
      var lastOriginalSource = null;
      var lastOriginalLine = null;
      var lastOriginalColumn = null;
      var lastOriginalName = null;
      this.walk(function(chunk, original) {
        generated.code += chunk;
        if (original.source !== null && original.line !== null && original.column !== null) {
          if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
            map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            });
          }
          lastOriginalSource = original.source;
          lastOriginalLine = original.line;
          lastOriginalColumn = original.column;
          lastOriginalName = original.name;
          sourceMappingActive = true;
        } else if (sourceMappingActive) {
          map.addMapping({
            generated: {
              line: generated.line,
              column: generated.column
            }
          });
          lastOriginalSource = null;
          sourceMappingActive = false;
        }
        for (var idx = 0, length = chunk.length; idx < length; idx++) {
          if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
            generated.line++;
            generated.column = 0;
            if (idx + 1 === length) {
              lastOriginalSource = null;
              sourceMappingActive = false;
            } else if (sourceMappingActive) {
              map.addMapping({
                source: original.source,
                original: {
                  line: original.line,
                  column: original.column
                },
                generated: {
                  line: generated.line,
                  column: generated.column
                },
                name: original.name
              });
            }
          } else {
            generated.column++;
          }
        }
      });
      this.walkSourceContents(function(sourceFile, sourceContent) {
        map.setSourceContent(sourceFile, sourceContent);
      });
      return { code: generated.code, map };
    };
    exports2.SourceNode = SourceNode;
  }
});

// ../../node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/source-map.js
var require_source_map = __commonJS({
  "../../node_modules/.pnpm/source-map-js@1.2.1/node_modules/source-map-js/source-map.js"(exports2) {
    exports2.SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
    exports2.SourceMapConsumer = require_source_map_consumer().SourceMapConsumer;
    exports2.SourceNode = require_source_node().SourceNode;
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  configureSourceMap: () => configureSourceMap,
  createFakeContext: () => createFakeContext,
  executeBuiltCode: () => executeBuiltCode,
  extractOutputFiles: () => extractOutputFiles,
  improveErrorWithSourceMap: () => improveErrorWithSourceMap,
  renderAsync: () => renderAsync
});
module.exports = __toCommonJS(src_exports);

// _nggua06mz:/workspaces/htmldocs/packages/render/src/css/index.css
var css_default = '@charset "UTF-8";\n/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\nhtml {\n  line-height: 1.15;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\n\nbody {\n  margin: 0;\n}\n\narticle, aside, footer, header, nav, section {\n  display: block;\n}\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\nfigcaption, figure, main {\n  display: block;\n}\n\nfigure {\n  margin: 1em 40px;\n}\n\nhr {\n  box-sizing: content-box;\n  height: 0;\n  overflow: visible;\n}\n\npre {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\na {\n  background-color: transparent;\n  -webkit-text-decoration-skip: objects;\n}\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline;\n  text-decoration: underline dotted;\n}\n\nb, strong {\n  font-weight: inherit;\n}\n\nb, strong {\n  font-weight: bolder;\n}\n\ncode, kbd, samp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\ndfn {\n  font-style: italic;\n}\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\nsmall {\n  font-size: 80%;\n}\n\nsub, sup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\naudio, video {\n  display: inline-block;\n}\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\nimg {\n  border-style: none;\n}\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\nbutton, input, optgroup, select, textarea {\n  font-family: sans-serif;\n  font-size: 100%;\n  line-height: 1.15;\n  margin: 0;\n}\n\nbutton, input {\n  overflow: visible;\n}\n\nbutton, select {\n  text-transform: none;\n}\n\n[type=reset], [type=submit], button, html [type=button] {\n  -webkit-appearance: button;\n}\n\n[type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner, button::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n[type=button]:-moz-focusring, [type=reset]:-moz-focusring, [type=submit]:-moz-focusring, button:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\nlegend {\n  box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0;\n  white-space: normal;\n}\n\nprogress {\n  display: inline-block;\n  vertical-align: baseline;\n}\n\ntextarea {\n  overflow: auto;\n}\n\n[type=checkbox], [type=radio] {\n  box-sizing: border-box;\n  padding: 0;\n}\n\n[type=number]::-webkit-inner-spin-button, [type=number]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n[type=search] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px;\n}\n\n[type=search]::-webkit-search-cancel-button, [type=search]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit;\n}\n\ndetails, menu {\n  display: block;\n}\n\nsummary {\n  display: list-item;\n}\n\ncanvas {\n  display: inline-block;\n}\n\ntemplate {\n  display: none;\n}\n\n[hidden] {\n  display: none;\n} \n/* CSS for Paged.js interface \u2013 v0.4 */\nhtml {\n  transform-origin: 0 0;\n}\n\n/* Change the look */\n:root {\n  --color-background: #E4E7EB;\n  --color-pageSheet: #E3E3E3;\n  --color-paper: white;\n  --color-marginBox: transparent;\n  --pagedjs-crop-color: black;\n  --pagedjs-crop-shadow: white;\n  --pagedjs-crop-stroke: 1px;\n}\n\n/* To define how the book look on the screen: */\n@media screen, pagedjs-ignore {\n  body {\n    background-color: var(--color-background);\n    margin: 0;\n  }\n  .pagedjs_pages {\n    display: flex;\n    width: calc(var(--pagedjs-width) * 2);\n    flex: 0;\n    flex-wrap: wrap;\n    margin: 0 auto;\n  }\n  .pagedjs_page {\n    background-color: var(--color-paper);\n    box-shadow: 0 0 0 1px var(--color-pageSheet);\n    margin: 0;\n    flex-shrink: 0;\n    flex-grow: 0;\n    margin-top: 10mm;\n  }\n  .pagedjs_first_page {\n    margin-left: var(--pagedjs-width);\n  }\n  .pagedjs_page:last-of-type {\n    margin-bottom: 10mm;\n  }\n  .pagedjs_pagebox {\n    box-shadow: 0px 87px 24px 0px rgba(145, 145, 145, 0), 0px 55px 22px 0px rgba(145, 145, 145, 0.01), 0px 31px 19px 0px rgba(145, 145, 145, 0.05), 0px 14px 14px 0px rgba(145, 145, 145, 0.09), 0px 3px 8px 0px rgba(145, 145, 145, 0.1);\n  }\n  .pagedjs_left_page {\n    z-index: 20;\n    width: calc(var(--pagedjs-bleed-left) + var(--pagedjs-pagebox-width)) !important;\n  }\n  .pagedjs_left_page .pagedjs_bleed-right .pagedjs_marks-crop {\n    border-color: transparent;\n  }\n  .pagedjs_left_page .pagedjs_bleed-right .pagedjs_marks-middle {\n    width: 0;\n  }\n  .pagedjs_right_page {\n    z-index: 10;\n    position: relative;\n    left: calc(var(--pagedjs-bleed-left) * -1);\n  }\n  /* show the margin-box */\n  .pagedjs_margin-top-left-corner-holder,\n  .pagedjs_margin-top,\n  .pagedjs_margin-top-left,\n  .pagedjs_margin-top-center,\n  .pagedjs_margin-top-right,\n  .pagedjs_margin-top-right-corner-holder,\n  .pagedjs_margin-bottom-left-corner-holder,\n  .pagedjs_margin-bottom,\n  .pagedjs_margin-bottom-left,\n  .pagedjs_margin-bottom-center,\n  .pagedjs_margin-bottom-right,\n  .pagedjs_margin-bottom-right-corner-holder,\n  .pagedjs_margin-right,\n  .pagedjs_margin-right-top,\n  .pagedjs_margin-right-middle,\n  .pagedjs_margin-right-bottom,\n  .pagedjs_margin-left,\n  .pagedjs_margin-left-top,\n  .pagedjs_margin-left-middle,\n  .pagedjs_margin-left-bottom {\n    box-shadow: 0 0 0 1px inset var(--color-marginBox);\n  }\n  /* uncomment this part for recto/verso book : ------------------------------------ */\n  .pagedjs_pages {\n    flex-direction: column;\n    width: 100%;\n    padding-bottom: 1.5in;\n  }\n  .pagedjs_first_page {\n    margin-left: 0;\n  }\n  .pagedjs_page {\n    margin: 0 auto;\n    margin-top: 10mm;\n  }\n  .pagedjs_left_page {\n    width: calc(var(--pagedjs-bleed-left) + var(--pagedjs-pagebox-width) + var(--pagedjs-bleed-left)) !important;\n  }\n  .pagedjs_left_page .pagedjs_bleed-right .pagedjs_marks-crop {\n    border-color: var(--pagedjs-crop-color);\n  }\n  .pagedjs_left_page .pagedjs_bleed-right .pagedjs_marks-middle {\n    width: var(--pagedjs-cross-size) !important;\n  }\n  .pagedjs_right_page {\n    left: 0;\n  }\n  /*--------------------------------------------------------------------------------------*/\n  /* uncomment this par to see the baseline : -------------------------------------------*/\n  /* .pagedjs_pagebox {\n      --pagedjs-baseline: 22px;\n      --pagedjs-baseline-position: 5px;\n      --pagedjs-baseline-color: cyan;\n      background: linear-gradient(transparent 0%, transparent calc(var(--pagedjs-baseline) - 1px), var(--pagedjs-baseline-color) calc(var(--pagedjs-baseline) - 1px), var(--pagedjs-baseline-color) var(--pagedjs-baseline)), transparent;\n      background-size: 100% var(--pagedjs-baseline);\n      background-repeat: repeat-y;\n      background-position-y: var(--pagedjs-baseline-position);\n  }  */\n  /*--------------------------------------------------------------------------------------*/\n}\n/* Marks (to delete when merge in paged.js) */\n.pagedjs_marks-crop {\n  z-index: 999999999999;\n}\n\n.pagedjs_bleed-top .pagedjs_marks-crop,\n.pagedjs_bleed-bottom .pagedjs_marks-crop {\n  box-shadow: 1px 0px 0px 0px var(--pagedjs-crop-shadow);\n}\n\n.pagedjs_bleed-top .pagedjs_marks-crop:last-child,\n.pagedjs_bleed-bottom .pagedjs_marks-crop:last-child {\n  box-shadow: -1px 0px 0px 0px var(--pagedjs-crop-shadow);\n}\n\n.pagedjs_bleed-left .pagedjs_marks-crop,\n.pagedjs_bleed-right .pagedjs_marks-crop {\n  box-shadow: 0px 1px 0px 0px var(--pagedjs-crop-shadow);\n}\n\n.pagedjs_bleed-left .pagedjs_marks-crop:last-child,\n.pagedjs_bleed-right .pagedjs_marks-crop:last-child {\n  box-shadow: 0px -1px 0px 0px var(--pagedjs-crop-shadow);\n}\n\n@page {\n  margin: 0.39in;\n}\n.loading-spinner {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 50px;\n  height: 50px;\n  border: 3px solid #f3f3f3;\n  border-top: 3px solid #3498db;\n  border-radius: 50%;\n  animation: spin 1s linear infinite;\n  z-index: 9999;\n}\n\n@keyframes spin {\n  0% {\n    transform: translate(-50%, -50%) rotate(0deg);\n  }\n  100% {\n    transform: translate(-50%, -50%) rotate(360deg);\n  }\n}\n';

// src/renderAsync.ts
var decoder = new TextDecoder("utf-8");
function dedent(str) {
  return str.replace(/^\s+/gm, "");
}
var readStream = async (stream2) => {
  let result = "";
  if ("pipeTo" in stream2) {
    const writableStream = new WritableStream({
      write(chunk) {
        result += decoder.decode(chunk);
      }
    });
    await stream2.pipeTo(writableStream);
  } else {
    const { Writable } = require("node:stream");
    const writable = new Writable({
      write(chunk, _encoding, callback) {
        result += decoder.decode(chunk);
        callback();
      }
    });
    stream2.pipe(writable);
    return new Promise((resolve, reject) => {
      writable.on("error", reject);
      writable.on("close", () => {
        resolve(result);
      });
    });
  }
  return result;
};
function decodeHtmlEntities(str) {
  return str.replace(/&([^;]+);/g, (match, entity) => {
    const entities = {
      "amp": "&",
      "apos": "'",
      "#x27": "'",
      "quot": '"',
      "lt": "<",
      "gt": ">"
    };
    return entities[entity] || match;
  });
}
var renderAsync = async (component, documentCss, headContents) => {
  const reactDOMServer = await import("react-dom/server");
  let html;
  if (Object.hasOwn(reactDOMServer, "renderToReadableStream")) {
    html = await readStream(
      await reactDOMServer.renderToReadableStream(component)
    );
  } else {
    await new Promise((resolve, reject) => {
      const stream2 = reactDOMServer.renderToPipeableStream(component, {
        async onAllReady() {
          html = await readStream(stream2);
          resolve();
        },
        onError(error) {
          reject(error);
        }
      });
    });
  }
  let extractedHeadContents = "";
  const headMatches = html.matchAll(/<head>(.*?)<\/head>/gs);
  const seenMetaTags = /* @__PURE__ */ new Set();
  for (const match of headMatches) {
    if (match[1]) {
      const content = decodeHtmlEntities(match[1]);
      const metaMatches = content.matchAll(/<meta[^>]+>/g);
      for (const metaMatch of metaMatches) {
        const metaTag = metaMatch[0];
        if (!seenMetaTags.has(metaTag)) {
          seenMetaTags.add(metaTag);
          extractedHeadContents += metaTag;
        }
      }
      extractedHeadContents += content.replace(/<meta[^>]+>/g, "");
      html = html.replace(match[0], "");
    }
  }
  extractedHeadContents = extractedHeadContents.replace(
    /<link([^>]*rel=["']stylesheet["'][^>]*)>/gi,
    (match, p1) => {
      if (match.includes("onerror=")) return match;
      return `<link${p1} onerror="console.error('Failed to load stylesheet:', this.href); this.onerror=null;this.remove();">`;
    }
  );
  const document = dedent(`
      <!DOCTYPE html>
      <html>
        <head>
          <base target="_blank">
          ${documentCss ? `<style>${documentCss}</style>` : ""}
          <style>${css_default}</style>
          ${extractedHeadContents}
          <script src="https://unpkg.com/@htmldocs/render@0.1.7/dist/paged.polyfill.js"></script>
          <script type="text/javascript">
            // Hide content initially
            // document.querySelector("html").style.visibility = "hidden";
            
            const horizontalPadding = 20;
            
            const scaleToFit = () => {
              try {
                const pageElement = document.querySelector(".pagedjs_page");
                if (!pageElement) return;
                
                const pageWidth = pageElement.offsetWidth + horizontalPadding * 2;
                const scaleFactor = window.innerWidth / pageWidth;
                
                console.debug("Scale debug:", {
                  windowWidth: window.innerWidth,
                  pageWidth: pageElement.offsetWidth,
                  pageWidthWithPadding: pageWidth,
                  scaleFactor,
                  timestamp: new Date().toISOString()
                });
              } catch (err) {
                console.error("Error in scaleToFit:", err);
              }
            };
            
            // Save scroll position before unload
            window.onbeforeunload = function() {
              try {
                localStorage.setItem("scrollpos", String(window.scrollY));
              } catch (err) {
                console.error("Error saving scroll position:", err);
              }
            };
            
            // Handle window resize
            window.addEventListener("resize", scaleToFit);
            
            // Handle zoom messages from parent
            window.addEventListener("message", (event) => {
              if (event.data.type === "zoom") {
                const htmlElement = document.querySelector("html");
                if (htmlElement) {
                  htmlElement.style.zoom = event.data.level;
                  // Store zoom level in localStorage
                  localStorage.setItem("zoomLevel", event.data.level);
                }
              }
            });

            // Apply stored zoom level on load
            try {
              const storedZoom = localStorage.getItem("zoomLevel");
              if (storedZoom) {
                const htmlElement = document.querySelector("html");
                if (htmlElement) {
                  htmlElement.style.zoom = storedZoom;
                }
              }
            } catch (err) {
              console.error("Error applying stored zoom:", err);
            }
            
            // Register Paged.js handler when API is available
            if (typeof Paged !== "undefined") {
              class MyHandler extends Paged.Handler {
                afterPageLayout(pageFragment, page) {
                  try {
                    console.debug("afterPageLayout triggered");
                    scaleToFit();
                    var scrollpos = localStorage.getItem("scrollpos");
                    if (scrollpos) window.scrollTo(0, parseInt(scrollpos, 10));
                    document.querySelector("html").style.visibility = "visible";

                    // Get document size
                    const documentEl = document.getElementById('document');
                    const documentSize = documentEl?.getAttribute('data-size');
                    const documentOrientation = documentEl?.getAttribute('data-orientation');

                    // After layout, set document height to 100% so that it doesn't interfere with page chunking
                    documentEl?.style.setProperty('height', '100%');

                    // Notify parent window when layout is complete
                    window.parent.postMessage({ 
                      type: 'layoutComplete',
                      documentSize,
                      documentOrientation,
                      timestamp: new Date().toISOString()
                    }, '*');
                    console.debug("layoutComplete message sent", { documentSize });
                  } catch (err) {
                    console.error("Error in afterPageLayout:", err);
                    // Still show content even if there's an error
                    document.querySelector("html").style.visibility = "visible";
                  }
                }
              }
              Paged.registerHandlers(MyHandler);
              console.debug("Paged.js registered handlers");
            }
          </script>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `);
  return document;
};

// src/util/index.ts
var import_node_path3 = __toESM(require("node:path"));
var import_node_vm2 = __toESM(require("node:vm"));

// src/util/static-node-modules-for-vm.ts
var import_node_zlib = __toESM(require("node:zlib"));
var import_node_vm = __toESM(require("node:vm"));
var import_node_v8 = __toESM(require("node:v8"));
var import_node_util = __toESM(require("node:util"));
var import_node_url = __toESM(require("node:url"));
var import_node_tty = __toESM(require("node:tty"));
var import_node_tls = __toESM(require("node:tls"));
var import_node_timers = __toESM(require("node:timers"));
var import_node_string_decoder = __toESM(require("node:string_decoder"));
var import_node_stream = __toESM(require("node:stream"));
var import_node_readline = __toESM(require("node:readline"));
var import_node_querystring = __toESM(require("node:querystring"));
var import_node_punycode = __toESM(require("node:punycode"));
var import_node_path = __toESM(require("node:path"));
var import_node_os = __toESM(require("node:os"));
var import_node_net = __toESM(require("node:net"));
var import_node_https = __toESM(require("node:https"));
var import_node_http = __toESM(require("node:http"));
var import_node_fs = __toESM(require("node:fs"));
var import_node_events = __toESM(require("node:events"));
var import_node_domain = __toESM(require("node:domain"));
var import_node_dns = __toESM(require("node:dns"));
var import_node_dgram = __toESM(require("node:dgram"));
var import_node_crypto = __toESM(require("node:crypto"));
var import_node_cluster = __toESM(require("node:cluster"));
var import_node_child_process = __toESM(require("node:child_process"));
var import_node_buffer = __toESM(require("node:buffer"));
var import_node_assert = __toESM(require("node:assert"));
var staticNodeModulesForVM = {
  zlib: import_node_zlib.default,
  "node:zlib": import_node_zlib.default,
  vm: import_node_vm.default,
  "node:vm": import_node_vm.default,
  v8: import_node_v8.default,
  "node:v8": import_node_v8.default,
  util: import_node_util.default,
  "node:util": import_node_util.default,
  url: import_node_url.default,
  "node:url": import_node_url.default,
  tty: import_node_tty.default,
  "node:tty": import_node_tty.default,
  tls: import_node_tls.default,
  "node:tls": import_node_tls.default,
  timers: import_node_timers.default,
  "node:timers": import_node_timers.default,
  "string_decoder": import_node_string_decoder.default,
  "node:string_decoder": import_node_string_decoder.default,
  stream: import_node_stream.default,
  "node:stream": import_node_stream.default,
  readline: import_node_readline.default,
  "node:readline": import_node_readline.default,
  querystring: import_node_querystring.default,
  "node:querystring": import_node_querystring.default,
  punycode: import_node_punycode.default,
  "node:punycode": import_node_punycode.default,
  path: import_node_path.default,
  "node:path": import_node_path.default,
  os: import_node_os.default,
  "node:os": import_node_os.default,
  net: import_node_net.default,
  "node:net": import_node_net.default,
  https: import_node_https.default,
  "node:https": import_node_https.default,
  http: import_node_http.default,
  "node:http": import_node_http.default,
  fs: import_node_fs.default,
  "node:fs": import_node_fs.default,
  events: import_node_events.default,
  "node:events": import_node_events.default,
  domain: import_node_domain.default,
  "node:domain": import_node_domain.default,
  dns: import_node_dns.default,
  "node:dns": import_node_dns.default,
  dgram: import_node_dgram.default,
  "node:dgram": import_node_dgram.default,
  crypto: import_node_crypto.default,
  "node:crypto": import_node_crypto.default,
  cluster: import_node_cluster.default,
  "node:cluster": import_node_cluster.default,
  "child_process": import_node_child_process.default,
  "node:child_process": import_node_child_process.default,
  buffer: import_node_buffer.default,
  "node:buffer": import_node_buffer.default,
  assert: import_node_assert.default,
  "node:assert": import_node_assert.default
};

// src/util/improve-error-with-sourcemap.ts
var import_node_path2 = __toESM(require("node:path"));
var stackTraceParser = __toESM(require_stack_trace_parser_cjs());
var import_source_map_js = __toESM(require_source_map());
var improveErrorWithSourceMap = (error, originalFilePath, sourceMapToOriginalFile) => {
  let stack;
  const sourceRoot = sourceMapToOriginalFile.sourceRoot ?? import_node_path2.default.dirname(originalFilePath);
  const getStackLineFromMethodNameAndSource = (methodName, source, line, column) => {
    const columnAndLine = column || line ? `${line ?? ""}${line && column ? ":" : ""}${column ?? ""}` : void 0;
    const sourceToDisplay = source ? import_node_path2.default.relative(sourceRoot, source) : "unknown source";
    return methodName === "<unknown>" ? ` at ${sourceToDisplay}${columnAndLine ? `:${columnAndLine}` : ""}` : ` at ${methodName} (${sourceToDisplay}${columnAndLine ? `:${columnAndLine}` : ""})`;
  };
  if (typeof error.stack !== "undefined") {
    const parsedStack = stackTraceParser.parse(error.stack);
    const sourceMapConsumer = new import_source_map_js.SourceMapConsumer(sourceMapToOriginalFile);
    const newStackLines = [];
    for (const stackFrame of parsedStack) {
      if (stackFrame.file === originalFilePath) {
        if (stackFrame.column || stackFrame.lineNumber) {
          const positionWithError = sourceMapConsumer.originalPositionFor({
            column: stackFrame.column ?? 0,
            line: stackFrame.lineNumber ?? 0
          });
          newStackLines.push(
            getStackLineFromMethodNameAndSource(
              stackFrame.methodName,
              positionWithError.source,
              positionWithError.line,
              positionWithError.column
            )
          );
        } else {
          newStackLines.push(
            getStackLineFromMethodNameAndSource(
              stackFrame.methodName,
              stackFrame.file,
              stackFrame.lineNumber,
              stackFrame.column
            )
          );
        }
      } else if (stackFrame.file) {
        const stackLine = getStackLineFromMethodNameAndSource(
          stackFrame.methodName,
          stackFrame.file,
          stackFrame.lineNumber,
          stackFrame.column
        );
        newStackLines.push(stackLine);
      }
    }
    stack = newStackLines.join("\n");
  }
  return {
    name: error.name,
    message: error.message,
    cause: error.cause,
    stack
  };
};

// src/util/index.ts
function createFakeContext(documentPath) {
  return {
    ...global,
    console,
    Buffer,
    TextDecoder,
    TextDecoderStream,
    TextEncoder,
    TextEncoderStream,
    ReadableStream,
    URL,
    URLSearchParams,
    Headers,
    module: {
      exports: {
        default: void 0,
        renderAsync: void 0
      }
    },
    __filename: documentPath,
    __dirname: import_node_path3.default.dirname(documentPath),
    require: (module2) => {
      if (module2 in staticNodeModulesForVM) {
        return staticNodeModulesForVM[module2];
      }
      return require(module2);
    },
    process
  };
}
function extractOutputFiles(outputFiles) {
  let sourceMapFile;
  let bundledDocumentFile;
  let cssFile;
  for (const file of outputFiles) {
    if (file.path.endsWith(".map")) {
      sourceMapFile = file;
    } else if (file.path.endsWith(".js")) {
      bundledDocumentFile = file;
    } else if (file.path.endsWith(".css")) {
      cssFile = file;
    }
  }
  if (!sourceMapFile || !bundledDocumentFile) {
    throw new Error("Expected output files not found");
  }
  return { sourceMapFile, bundledDocumentFile, cssFile };
}
function configureSourceMap(sourceMapFile) {
  const sourceMapToDocument = JSON.parse(sourceMapFile.text);
  sourceMapToDocument.sourceRoot = import_node_path3.default.resolve(sourceMapFile.path, "../..");
  sourceMapToDocument.sources = sourceMapToDocument.sources.map(
    (source) => import_node_path3.default.resolve(sourceMapFile.path, "..", source)
  );
  return sourceMapToDocument;
}
function executeBuiltCode(builtDocumentCode, fakeContext, documentPath, sourceMapToDocument) {
  try {
    import_node_vm2.default.runInNewContext(builtDocumentCode, fakeContext, { filename: documentPath });
  } catch (exception) {
    const error = exception;
    error.stack &&= error.stack.split("at Script.runInContext (node:vm")[0];
    return { error: improveErrorWithSourceMap(error, documentPath, sourceMapToDocument) };
  }
  if (fakeContext.module.exports.default === void 0) {
    return {
      error: improveErrorWithSourceMap(
        new Error(`The document component at ${documentPath} does not contain a default export`),
        documentPath,
        sourceMapToDocument
      )
    };
  }
  return {
    DocumentComponent: fakeContext.module.exports.default,
    renderAsync: fakeContext.module.exports.renderAsync
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  configureSourceMap,
  createFakeContext,
  executeBuiltCode,
  extractOutputFiles,
  improveErrorWithSourceMap,
  renderAsync
});
//# sourceMappingURL=index.js.map
