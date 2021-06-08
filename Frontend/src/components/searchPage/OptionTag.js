import React from "react";
import { Chip } from "@material-ui/core";

function OptionTag({ gender }) {
  return (
    <>
      <Chip style={{ marginLeft: 10, marginBottom: 10 }} label={gender} />
    </>
  );
}

export default OptionTag;
