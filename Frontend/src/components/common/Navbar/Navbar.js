import React from "react";
import "./Navbar.css";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function Navbar() {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      className="navbar-container"
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        className="navbar-text"
        label="Rank"
        value="rank"
        icon={<EqualizerIcon />}
      />
      <BottomNavigationAction
        className="navbar-text"
        label="Favorite"
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        className="navbar-text"
        label="Home"
        value="home"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        className="navbar-text"
        label="MyPage"
        value="acount"
        icon={<AccountCircleIcon />}
      />
    </BottomNavigation>
  );
}

export default Navbar;
