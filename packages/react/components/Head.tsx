import * as React from "react";

export type HeadProps = Readonly<React.ComponentPropsWithoutRef<"head">>;

const Head = React.forwardRef<HTMLHeadElement, HeadProps>(
  ({ children, ...props }, ref) => (
    <head {...props} ref={ref}>
      {children}
    </head>
  ),
);

Head.displayName = "Head";

export default Head;