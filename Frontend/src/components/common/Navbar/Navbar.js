import "./Navbar.css";
import React from "react";
import { useHistory } from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function Navbar() {
  const [value, setValue] = React.useState("recents");

  const history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(newValue);
  };

  return (
    <BottomNavigation
      className="navbar-container"
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        key="1"
        className="navbar-text"
        label="Rank"
        value="rank"
        icon={<EqualizerIcon />}
      />
      <BottomNavigationAction
        key="2"
        className="navbar-text"
        label="Favorite"
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        key="3"
        className="navbar-text"
        label="Home"
        value="/"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        key="4"
        className="navbar-text"
        label="MyPage"
        value="acount"
        icon={<AccountCircleIcon />}
      />
    </BottomNavigation>
  );
}

export default Navbar;
