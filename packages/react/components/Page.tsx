import clsx from "clsx";
import { useDocumentSettingsContext } from "./DocumentContext";

interface Props extends React.ComponentProps<"div"> {
  margin?: React.CSSProperties["margin"];
}

const Page: React.FC<Props> = ({
  children,
  className,
  style,
  margin,
  ...props
}) => {
  const { margin: documentMargin } = useDocumentSettingsContext();

  return (
    <div
      className={clsx("sheet", className)}
      style={{ padding: margin || documentMargin, ...style }}
      {...props}
    >
    {children}
    </div>
  );
};

export default Page;
