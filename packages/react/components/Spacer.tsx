import { ComponentPropsWithoutRef, CSSProperties } from "react";

export interface SpacerProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * horizontal space the spacer takes up. Defaults to `100%` when `width` is set, otherwise 0
   */
  width?: number | string | boolean;
  /**
   * vertical space the spacer takes up. Defaults to `100%` when `height` is set, otherwise 0
   */
  height?: number | string | boolean;
  /**
   * display of the spacer. Defaults to `block`
   */
  display?: string;
}

export type SpacerType = React.FC<SpacerProps>;

const getSpacerSize = (size: number | string | boolean | undefined) => {
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

export const Spacer: SpacerType = ({
  width,
  height,
  display = "block",
  ...rest
}) => {
  const style: CSSProperties = {
    width: getSpacerSize(width),
    minWidth: getSpacerSize(width),
    height: getSpacerSize(height),
    minHeight: getSpacerSize(height),
    display: display
  };

  return <div style={style} {...rest} />;
};

export default Spacer;