import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./SlideMenu.css";
import CloseIcon from "@material-ui/icons/Close";
import { BsHeartFill, BsBookmarksFill } from "react-icons/bs";
import UserContext from "contexts/user";

function SlideMenu() {
  const history = useHistory();
  const { state, actions } = useContext(UserContext);
  const { user } = state;
  const { setUser, setToken } = actions;

  function closeSlideMenu() {
    document.querySelector("body").classList.remove("no-scroll");
    document.querySelector("#dimmed").remove();
    document.querySelector(".slide-menu-container").classList.remove("on");
  }

  // <div className="slide-menu-footer-btn"
  // >
  //   LOG IN
  // </div>;

  return (
    <div className="slide-menu-container">
      <CloseIcon
        className="slide-menu-close-btn"
        style={{
          position: "absolute",
          right: 0,
          paddingTop: "1vh",
          paddingRight: "3vw",
          fontSize: "10vw"
        }}
        onClick={closeSlideMenu}
      />
      <div
        className="slide-menu-title"
        onClick={() => {
          history.push("/");
          closeSlideMenu();
        }}
      >
        CODIBA
      </div>
      <ul className="slide-menu-list">
        <li
          className="slide-menu-item"
          onClick={() => {
            history.push("/top-codies");
            closeSlideMenu();
          }}
        >
          <BsHeartFill className="slide-menu-icon" />
          TOP CODIES
        </li>
        <li
          className="slide-menu-item"
          onClick={() => {
            history.push("/my-picks");
            closeSlideMenu();
          }}
        >
          <BsBookmarksFill className="slide-menu-icon" />
          MY PICKS
        </li>
      </ul>
      <div className="slide-menu-footer">
        <div className="slide-menu-white-line"></div>
        <div
          className="slide-menu-footer-btn"
          onClick={() => {
            closeSlideMenu();
            if (!user) {
              // modal창
              document.querySelector("#login-modal").click();
            } else {
              localStorage.clear();
              setToken(null);
              setUser(null);
            }
          }}
        >
          {!user ? "LOG IN" : "LOGOUT"}
        </div>
        {/* <div className="slide-menu-home-btn">SIGN IN</div>
        <div className="slide-menu-home-btn">SIGN UP</div> */}
      </div>
    </div>
  );
}

export default SlideMenu;
