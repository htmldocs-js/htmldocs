"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// index.ts
var index_exports = {};
__export(index_exports, {
  Document: () => Document_default,
  Footer: () => Footer_default,
  Head: () => Head_default,
  MarginBox: () => MarginBox,
  Page: () => Page_default,
  Spacer: () => Spacer_default,
  useValue: () => useValue
});
module.exports = __toCommonJS(index_exports);

// components/Head.tsx
var React = __toESM(require("react"));
var import_jsx_runtime = require("react/jsx-runtime");
var Head = React.forwardRef(
  ({ children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { ...props, ref, children })
);
Head.displayName = "Head";
var Head_default = Head;

// components/MarginBox.tsx
var import_clsx = __toESM(require("clsx"));
var import_jsx_runtime2 = require("react/jsx-runtime");
var MarginBox = ({
  children,
  position,
  pageType = "all",
  className,
  style,
  marginBoxStyles,
  runningName
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Head_default, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("style", { children: `
            /* Set up running element */
            .${runningName} {
              position: running(${runningName});
            }

            /* Apply to specified margin box */
            @page {
              @${position} {
                content: element(${runningName});
                ${Object.entries(marginBoxStyles || {}).map(
      ([key, value]) => `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value};`
    ).join("\n")}
              }
            }

            /* Page type specific styles */
            ${pageType === "even" ? `
              @page:odd {
                @${position} { content: none; }
              }
            ` : pageType === "odd" ? `
              @page:even {
                @${position} { content: none; }
              }
            ` : pageType === "blank" ? `
              @page:blank {
                @${position} { content: none; }
              }
            ` : ""}

            /* Default alignments based on position */
            .${runningName} {
              ${position.includes("left") ? "text-align: left;" : position.includes("right") ? "text-align: right;" : "text-align: center;"}
              
              ${position.includes("top") ? "vertical-align: top;" : position.includes("bottom") ? "vertical-align: bottom;" : "vertical-align: middle;"}

              ${Object.entries(style || {}).map(
      ([key, value]) => `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value};`
    ).join("\n")}
            }
          ` }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: (0, import_clsx.default)(runningName, className), children })
  ] });
};
var MarginBox_default = MarginBox;

// components/Footer.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var Footer = ({
  children = ({ currentPage, totalPages }) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "page-number", children: [
    "Page ",
    currentPage,
    " of ",
    totalPages
  ] }),
  position = "bottom-center",
  pageType = "all",
  className,
  style,
  marginBoxStyles
}) => {
  const footerStyles = `
    ${style ? Object.entries(style).map(
    ([key, value]) => `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value};`
  ).join("\n") : ""}
    
    .page-counter::after {
      content: counter(page);
    }
    
    .pages-counter::after {
      content: counter(pages);
    }
    
    .page-number {
      display: ${typeof children === "function" ? "inline" : "none"};
    }
  `;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Head_default, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("style", { children: footerStyles }) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      MarginBox_default,
      {
        position,
        pageType,
        className,
        marginBoxStyles,
        runningName: "print-footer",
        children: typeof children === "function" ? children({
          currentPage: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "page-counter" }),
          totalPages: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "pages-counter" })
        }) : children
      }
    )
  ] });
};
var Footer_default = Footer;

// components/Document.tsx
var import_react = __toESM(require("react"));
var import_jsx_runtime4 = require("react/jsx-runtime");
var sizes = ["A3", "A4", "A5", "letter", "legal"];
var Document = ({ size, orientation, margin, children }) => {
  const formatMargin = (value) => typeof value === "string" ? value : `${value}px`;
  const formatSize = (size2) => {
    return sizes.includes(size2) ? size2 : `${size2}`;
  };
  const childrenArray = import_react.default.Children.toArray(children);
  const footerChild = childrenArray.find(
    (child) => import_react.default.isValidElement(child) && child.type === Footer_default
  );
  const otherChildren = childrenArray.filter(
    (child) => !(import_react.default.isValidElement(child) && child.type === Footer_default)
  );
  const reorderedChildren = footerChild ? [footerChild, ...otherChildren] : childrenArray;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    "div",
    {
      id: "document",
      "data-size": formatSize(size),
      "data-orientation": orientation,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Head_default, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("style", { children: `
            @page {
              size: ${formatSize(size)} ${orientation};
              margin: ${formatMargin(margin || "0.39in")};
            }
          ` }) }),
        reorderedChildren
      ]
    }
  );
};
var Document_default = Document;

// components/Page.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var Page = ({
  children,
  style,
  ...props
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_jsx_runtime5.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "div",
    {
      style: { width: "100%", height: "100%", pageBreakAfter: "always", ...style },
      ...props,
      children
    }
  ) });
};
var Page_default = Page;

// components/Spacer.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var getSpacerSize = (size) => {
  if (typeof size === "number") {
    return `${size}px`;
  } else if (typeof size === "string") {
    return size;
  } else if (size) {
    return "100%";
  } else {
    return "0";
  }
};
var Spacer = ({
  width,
  height,
  display = "block",
  ...rest
}) => {
  const style = {
    width: getSpacerSize(width),
    minWidth: getSpacerSize(width),
    height: getSpacerSize(height),
    minHeight: getSpacerSize(height),
    display
  };
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style, ...rest });
};
var Spacer_default = Spacer;

// index.ts
function useValue(name) {
  return void 0;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Document,
  Footer,
  Head,
  MarginBox,
  Page,
  Spacer,
  useValue
});
