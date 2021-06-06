import { React } from "react";
import { useLocation } from "react-router-dom";
import "./Menu.css";
import { GiHamburgerMenu } from "react-icons/gi";

function Menu() {
  const location = useLocation();
  let menuButton;
  if (location.pathname === "/" || location.pathname === "/search/1") {
    menuButton = (
      <GiHamburgerMenu className="menu-button main" onClick={openSlideMenu} />
    );
  } else if (location.pathname === "/my-picks/detail") {
    menuButton = "";
  } else {
    menuButton = (
      <GiHamburgerMenu className="menu-button" onClick={openSlideMenu} />
    );
  }

  function openSlideMenu() {
    document.querySelector("body").classList.add("no-scroll");
    document.querySelector(".slide-menu-container").classList.add("on");
    let div = document.createElement("div");
    div.id = "dimmed";
    document.querySelector(".App").append(div);
    document
      .querySelector("#dimmed")
      .addEventListener("scroll touchmove touchend mousewheel", function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      });
  }

  return <div className="menu-container">{menuButton}</div>;
}

export default Menu;
