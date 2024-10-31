import clsx from "clsx";
import { useDocumentSettingsContext } from "./DocumentContext";
import Head from "./Head";

interface Props extends React.ComponentProps<"div"> {
  margin?: React.CSSProperties["margin"];
}

const Page: React.FC<Props> = ({
  children,
  style,
  margin,
  ...props
}) => {
  const { margin: documentMargin } = useDocumentSettingsContext();
  const finalMargin = margin || documentMargin;
  
  return (
    <>
      <Head>
        <style>
          {`
            @page {
              margin-top: ${typeof finalMargin === 'string' ? finalMargin : `${finalMargin}px`};
              margin-right: ${typeof finalMargin === 'string' ? finalMargin : `${finalMargin}px`};
              margin-bottom: ${typeof finalMargin === 'string' ? finalMargin : `${finalMargin}px`};
              margin-left: ${typeof finalMargin === 'string' ? finalMargin : `${finalMargin}px`};
            }
          `}
        </style>
      </Head>
      <div
        style={{ width: '100%', height: '100%', ...style }}
        {...props}
      >
        {children}
      </div>
    </>
  );
};

export default Page;
