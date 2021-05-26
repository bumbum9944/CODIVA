import React from "react";
import { Typography } from "@material-ui/core";
import { FaTshirt } from "react-icons/fa";
import {
  GiSleevelessJacket,
  GiUnderwearShorts,
  GiLargeDress
} from "react-icons/gi";

function CatagorySelect(props) {
  return (
    <>
      <div className="catagory-select-container">
        <GiSleevelessJacket style={{ width: "10vw", height: "10vh" }} />
        <Typography>OUTER</Typography>
      </div>
      <div className="catagory-select-container">
        <FaTshirt style={{ width: "10vw", height: "10vh" }} />
        <Typography>TOP</Typography>
      </div>
      <div className="catagory-select-container">
        <GiUnderwearShorts style={{ width: "10vw", height: "10vh" }} />
        <Typography>BOTTOM</Typography>
      </div>
      <div className="catagory-select-container">
        <GiLargeDress style={{ width: "10vw", height: "10vh" }} />
        <Typography>ONE PIECE</Typography>
      </div>
    </>
  );
}

export default CatagorySelect;
