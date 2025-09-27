// components/Head.tsx
import * as React from "react";
import { jsx } from "react/jsx-runtime";
var Head = React.forwardRef(
  ({ children, ...props }, ref) => /* @__PURE__ */ jsx("head", { ...props, ref, children })
);
Head.displayName = "Head";
var Head_default = Head;

// components/MarginBox.tsx
import clsx from "clsx";
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
var MarginBox = ({
  children,
  position,
  pageType = "all",
  className,
  style,
  marginBoxStyles,
  runningName
}) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Head_default, { children: /* @__PURE__ */ jsx2("style", { children: `
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
    /* @__PURE__ */ jsx2("div", { className: clsx(runningName, className), children })
  ] });
};
var MarginBox_default = MarginBox;

// components/Footer.tsx
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var Footer = ({
  children = ({ currentPage, totalPages }) => /* @__PURE__ */ jsxs2("span", { className: "page-number", children: [
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
  return /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx3(Head_default, { children: /* @__PURE__ */ jsx3("style", { children: footerStyles }) }),
    /* @__PURE__ */ jsx3(
      MarginBox_default,
      {
        position,
        pageType,
        className,
        marginBoxStyles,
        runningName: "print-footer",
        children: typeof children === "function" ? children({
          currentPage: /* @__PURE__ */ jsx3("span", { className: "page-counter" }),
          totalPages: /* @__PURE__ */ jsx3("span", { className: "pages-counter" })
        }) : children
      }
    )
  ] });
};
var Footer_default = Footer;

// components/Document.tsx
import React2 from "react";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var sizes = ["A3", "A4", "A5", "letter", "legal"];
var Document = ({ size, orientation, margin, children }) => {
  const formatMargin = (value) => typeof value === "string" ? value : `${value}px`;
  const formatSize = (size2) => {
    return sizes.includes(size2) ? size2 : `${size2}`;
  };
  const childrenArray = React2.Children.toArray(children);
  const footerChild = childrenArray.find(
    (child) => React2.isValidElement(child) && child.type === Footer_default
  );
  const otherChildren = childrenArray.filter(
    (child) => !(React2.isValidElement(child) && child.type === Footer_default)
  );
  const reorderedChildren = footerChild ? [footerChild, ...otherChildren] : childrenArray;
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      id: "document",
      "data-size": formatSize(size),
      "data-orientation": orientation,
      children: [
        /* @__PURE__ */ jsx4(Head_default, { children: /* @__PURE__ */ jsx4("style", { children: `
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
import { Fragment as Fragment3, jsx as jsx5 } from "react/jsx-runtime";
var Page = ({
  children,
  style,
  ...props
}) => {
  return /* @__PURE__ */ jsx5(Fragment3, { children: /* @__PURE__ */ jsx5(
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
import { jsx as jsx6 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx6("div", { style, ...rest });
};
var Spacer_default = Spacer;

// index.ts
function useValue(name) {
  return void 0;
}
export {
  Document_default as Document,
  Footer_default as Footer,
  Head_default as Head,
  MarginBox,
  Page_default as Page,
  Spacer_default as Spacer,
  useValue
};
