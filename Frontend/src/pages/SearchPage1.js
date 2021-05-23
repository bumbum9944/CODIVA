import React, { Component } from "react";
import Grid from "@material-ui/core";
import GenderSelect from "../components/searchPage/GenderSelect";
// import LeftArrow from "../components/common/LeftArrow";
// import RightArrow from "../components/common/RightArrow";

function SearchPage1() {
  return (
    <center>
      <div
        style={{
          display: "flex",
          width: "40vw",
          flexFlow: "row wrap",
          justifyContent: "center"
        }}
      >
        <GenderSelect name="man" />
      </div>
    </center>
  );
}

export default SearchPage1;
