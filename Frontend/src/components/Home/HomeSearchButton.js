import { React } from "react";
import "./HomeSearchButton.css";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function HomeSearchButton() {
  return (
    <Link className="searchButton-link" to="/search/1">
      <Button
        className="searchButton"
        variant="contained"
        style={{
          fontSize: "3vh",
          borderRadius: "3vh"
        }}
      >
        CODY MATCH
      </Button>
    </Link>
  );
}

export default HomeSearchButton;
