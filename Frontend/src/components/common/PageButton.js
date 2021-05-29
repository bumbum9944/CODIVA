import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

function PageButton() {
  const history = useHistory();

  return (
    <>
      <center>
        <Button
          variant="contained"
          onClick={() => {
            history.push("/search/1");
          }}
          style={{ marginRight: 20 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            history.push("/codies");
          }}
        >
          Next
        </Button>
      </center>
    </>
  );
}

export default PageButton;
