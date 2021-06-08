import React from "react";
import Button from "@material-ui/core/Button";

function OptionTag({ gender }) {
  return (
    <>
      <Button variant="contained" style={{ marginLeft: 10, marginBottom: 10 }}>
        {gender}
      </Button>
    </>
  );
}

export default OptionTag;
