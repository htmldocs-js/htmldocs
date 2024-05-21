import React, { useEffect, ReactElement, ReactNode } from "react";

type HeadProps = {
  children: ReactNode;
};

function Head({ children }: HeadProps) {
  useEffect(() => {
    const elements = React.Children.toArray(children) as ReactElement[];
    const uniqueElements: ReactElement[] = [];
    const seenTypes = new Set<string>();

    elements.forEach((element) => {
      if (React.isValidElement(element)) {
        if (element.type === "title" || element.type === "meta") {
            const key =
            element.type === "meta"
              ? ((element.props as React.ComponentProps<"meta">).name ||
                (element.props as React.ComponentProps<"meta">).property ||
                "")
              : "title";

          if (!seenTypes.has(key)) {
            seenTypes.add(key);
            uniqueElements.push(element);
          }
        } else {
          uniqueElements.push(element);
        }
      }
    });

    // Append unique elements to the document head
    uniqueElements.forEach((element) => {
      const domElement = document.createElement(element.type as string);
      Object.keys(element.props).forEach((prop) => {
        if (prop !== "children") {
          domElement.setAttribute(prop, element.props[prop]);
        } else {
          if (typeof element.props[prop] === "string") {
            domElement.textContent = element.props[prop];
          }
        }
      });
      document.head.appendChild(domElement);
    });

    // Cleanup function to remove elements when component unmounts or updates
    return () => {
      uniqueElements.forEach((element) => {
        const domElements = document.head.querySelectorAll(
          element.type as string
        );
        domElements.forEach((domElement) =>
          document.head.removeChild(domElement)
        );
      });
    };
  }, [children]);

  return null;
}

export default Head;
