import { React } from "react";
import "./HomeSearchButton.css";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

function HomeSearchButton() {
  const history = useHistory();
  return (
    <div className="searchButton-container" to="/search/1">
      <Button
        className="searchButton"
        variant="contained"
        style={{
          fontSize: "5.5vw",
          borderRadius: "3vh"
        }}
        onClick={() => {
          history.push("/search/1");
        }}
      >
        CODY MATCH
      </Button>
    </div>
  );
}

export default HomeSearchButton;
