import { React, useEffect, useState } from "react";
import "./Menu.css";
import { GiHamburgerMenu } from "react-icons/gi";

function Menu() {
  let menuButton = (
    <GiHamburgerMenu className="menu-button" onClick={openSlideMenu} />
  );
  // let menuButton;
  // if (location.pathname === "/") {
  //   menuButton = (
  //     <GiHamburgerMenu className="menu-button main" onClick={openSlideMenu} />
  //   );
  // } else {
  //   menuButton = (
  //     <GiHamburgerMenu className="menu-button" onClick={openSlideMenu} />
  //   );
  // }

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
