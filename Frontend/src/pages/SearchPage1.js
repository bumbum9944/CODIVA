import React from "react";
import { Container } from "@material-ui/core";
import GenderSelect from "../components/searchPage/GenderSelect";
import Header from "../components/common/Header/Header";
import Navbar from "../components/common/Navbar/Navbar";

function SearchPage1() {
  return (
    <Container className="searchPage1">
      <Header headerText="SEARCH" />
      <center>
        <div
          style={{
            display: "flex",
            width: "50vw",
            justifyContent: "center"
          }}
        >
          <GenderSelect />
        </div>
      </center>
      <Navbar />
    </Container>
  );
}

export default SearchPage1;
