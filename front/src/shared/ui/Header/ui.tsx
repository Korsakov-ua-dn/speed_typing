import "./style.css";

type Props = React.JSX.IntrinsicElements["header"];

export const Header: React.FC<Props> = ({ children }) => {
  return <header className="header">{children}</header>;
};
