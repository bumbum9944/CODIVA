import React from "react";
import { Link } from "react-router-dom";

function GoBack() {
  return (
    <>
      <Link to="/">
        <img
          style={{ width: "5vw", height: "4vh" }}
          src="/images/left_arrow.png"
        />
      </Link>
    </>
  );
}

export default GoBack;
