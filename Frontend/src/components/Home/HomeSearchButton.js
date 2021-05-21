import { React } from "react";
import "./HomeSearchButton.css";
import Button from "@material-ui/core/Button";

function HomeSearchButton() {
  return (
    <div className="searchButton-container">
      <Button className="searchButton" style={{fontSize: "2vh"}} variant="outlined" color="secondary">
        CODY MATCH
      </Button>
    </div>
  );
}

export default HomeSearchButton;
