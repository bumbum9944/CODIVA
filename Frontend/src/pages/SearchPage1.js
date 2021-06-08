import { Button } from "@material-ui/core";
import React from "react";
import Header from "../components/common/Header/Header";
import GenderSelect from "../components/searchPage/GenderSelect";

function SearchPage1(props) {
  return (
    <>
      <Header headerText="SEARCH" />
      <center>
        <Button variant="contained" style={{ marginBottom: 10 }}>
          찾아볼 옷을 골라주세요.
        </Button>
      </center>
      <div
        style={{
          display: "flex",
          width: "100vw",
          justifyContent: "center"
        }}
      >
        <GenderSelect {...props} />
      </div>
    </>
  );
}

export default SearchPage1;
