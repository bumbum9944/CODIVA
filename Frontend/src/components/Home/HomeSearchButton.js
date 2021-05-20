import { React } from "react";
import "./HomeSearchButton.css";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";

// const SearchButton = styled(Button)({
//   // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
//   // border: 0,
//   // borderRadius: 10,
//   padding: "0 2vw",
//   // fontWeight: "bold",
//   fontSize: "4vh",
// });

function HomeSearchButton() {
  return (
    <div className="searchButton-container">
      <Button variant="outlined" color="primary">
        CODY MATCH
      </Button>
    </div>
  );
}

export default HomeSearchButton;
