import { FunctionComponent } from "react";

type Menu = {
  className?: string;
};

const Menu: FunctionComponent<Menu> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ""}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 8H4V6H20V8ZM20 13H4V11H20V13ZM20 18H4V16H20V18Z"
      />
    </svg>
  );
};

export default Menu;
