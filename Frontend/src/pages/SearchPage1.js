import React from "react";
import GenderSelect from "../components/searchPage/GenderSelect";

function SearchPage1(props) {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        justifyContent: "center"
      }}
    >
      <GenderSelect {...props} />
    </div>
  );
}

export default SearchPage1;
