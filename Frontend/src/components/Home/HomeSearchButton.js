import { React } from "react";
import "./HomeSearchButton.css";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

function HomeSearchButton({ setGender, setApparels, setSelectedCategory }) {
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
          localStorage.setItem("gender", "");
          setGender("");
          localStorage.setItem("apparels", JSON.stringify([]));
          setApparels([]);
          localStorage.setItem(
            "selectedCategory",
            JSON.stringify({
              OUTER: false,
              TOP: false,
              BOTTOM: false,
              "ONE PIECE": false
            })
          );
          setSelectedCategory({
            OUTER: false,
            TOP: false,
            BOTTOM: false,
            "ONE PIECE": false
          });
          history.push("/search/1");
        }}
      >
        CODI MATCH
      </Button>
    </div>
  );
}

export default HomeSearchButton;
