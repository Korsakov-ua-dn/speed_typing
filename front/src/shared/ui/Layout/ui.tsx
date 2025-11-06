type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div
      style={{
        margin: "0 auto",
        padding: "16px",
        maxWidth: "1048px",
        minWidth: "600px",
      }}
      className="layout"
    >
      {children}
    </div>
  );
};
