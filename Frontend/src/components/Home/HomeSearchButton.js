import { React } from "react";
import "./HomeSearchButton.css";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function HomeSearchButton() {
  return (
    <div className="searchButton-container">
      <Link to="/search/1" style={{ textDecoration: "none" }}>
        <Button
          className="searchButton"
          style={{ fontSize: "2vh" }}
          variant="outlined"
          color="secondary"
        >
          CODY MATCH
        </Button>
      </Link>
    </div>
  );
}

export default HomeSearchButton;
