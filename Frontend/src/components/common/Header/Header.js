import { React } from "react";
import "./Header.css";

function Header({ headerText }) {
  return (
    <div className="header">
      <div className="header-text">{headerText}</div>
    </div>
  );
}

export default Header;
