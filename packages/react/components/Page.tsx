interface Props extends React.ComponentProps<"div"> { }

const Page: React.FC<Props> = ({
  children,
  style,
  ...props
}) => {
  return (
    <>
      <div
        style={{ width: '100%', height: '100%', pageBreakAfter: 'always', ...style }}
        {...props}
      >
        {children}
      </div>
    </>
  );
};

export default Page;
