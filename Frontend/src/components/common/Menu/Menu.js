import { React, useEffect } from "react";
import "./Menu.css";
import { useHistory } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

function Menu() {
  const history = useHistory();
  const location = history.location.pathname;

  useEffect(()=>{
    if(location === "/") {
      document.querySelector(".menu-button").classList.add("main");
    } else {
      document.querySelector(".menu-button").classList.remove("main");
    }
  }, [location]);

  return (
    <div className="menu-container">
      <GiHamburgerMenu className="menu-button main" />
    </div>
  );
}

export default Menu;
