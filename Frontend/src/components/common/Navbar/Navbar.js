import React from "react";
import { useHistory } from "react-router-dom";
import { styled, makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const StyledBottomNavigation = styled(BottomNavigation)({
  position: "fixed",
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "10vh"
});

const useStyles = makeStyles({
  root: {
    fontSize: "3.5vh"
  }
});

function Navbar() {
  const [value, setValue] = React.useState("recents");
  const classes = useStyles();
  const history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(newValue);
  };

  return (
    <StyledBottomNavigation
      value={value}
      color="secondary"
      showLabels
      onChange={handleChange}
    >
      <BottomNavigationAction
        key="1"
        className="navbar-text"
        value="rank"
        icon={<EqualizerIcon className={classes.root} />}
      />
      <BottomNavigationAction
        key="2"
        className="navbar-text"
        // label="Favorite"
        value="favorites"
        icon={<FavoriteIcon className={classes.root} />}
      />
      <BottomNavigationAction
        key="3"
        className="navbar-text"
        // label="Home"
        value="/"
        icon={<HomeIcon className={classes.root} />}
      />
      <BottomNavigationAction
        key="4"
        className="navbar-text"
        // label="MyPage"
        value="acount"
        icon={<AccountCircleIcon className={classes.root} />}
      />
    </StyledBottomNavigation>
  );
}

export default Navbar;
