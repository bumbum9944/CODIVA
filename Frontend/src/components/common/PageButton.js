import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import Popup from "../searchPage/Popup";

function PageButton(props) {
  const history = useHistory();

  return (
    <>
      <center>
        <Button
          variant="contained"
          onClick={() => {
            props.setApparels([]);
            props.setSelectedCategory({
              OUTER: false,
              TOP: false,
              BOTTOM: false,
              "ONE PIECE": false
            });
            history.push("/search/1");
          }}
          style={{ marginRight: 20 }}
        >
          BACK
        </Button>
        <Popup {...props} />
      </center>
    </>
  );
}

export default PageButton;
