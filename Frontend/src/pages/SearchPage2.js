import React from "react";
import { Container } from "@material-ui/core";
import Header from "../components/common/Header/Header";
import Navbar from "../components/common/Navbar/Navbar";
import GoBack from "../components/common/GoBack";
import CatagorySelect from "../components/searchPage/CatagorySelect";

function SearchPage2() {
  return (
    <Container className="searchPage1">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <div>
          <div
            style={{
              height: "5.5vh"
            }}
          ></div>
          <GoBack />
        </div>
        <Header headerText="SEARCH" />
        <div>
          <div
            style={{
              height: "5.5vh"
            }}
          ></div>
          <GoBack />
        </div>
      </div>
      <center>
        <div
          style={{
            display: "flex",
            width: "50vw",
            justifyContent: "center"
          }}
        >
          <CatagorySelect />
        </div>
      </center>
      <Navbar />
    </Container>
  );
}

export default SearchPage2;
