import {
  Dialog,
  DialogContent,
  DialogTitle,
  Select,
  Typography,
  MenuItem,
  InputLabel,
  Button,
  FormControl
} from "@material-ui/core";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

const url =
  "http://ec2-13-125-251-225.ap-northeast-2.compute.amazonaws.com:5000/";
const catagoryOuter = ["cardigan", "coat", "jacket", "vest"];
const catagoryTop = [
  "sleeveless",
  "tee(short)",
  "tee(long)",
  "mtm",
  "hood",
  "shirts"
];
const catagoryBottom = ["jeans", "leggings", "slacks", "skirts", "training"];
const catagoryOnepiece = ["one-piece"];

function ChooseDetail({ detailOpen, handleClose }) {
  const [catagory, setCatagory] = useState("");
  const [color, setColor] = useState("all");
  const history = useHistory();

  const handleChange = (e, type) => {
    e.preventDefault();
    console.log(e.target.value);
    const value = e.target.value;
    type === "catagory" ? setCatagory(value) : setColor(value);
  };

  // const buttonClick = useCallback(() => {
  //   console.log(detail);
  // }, [catagory, color]);

  /*{  // async function buttonClick(e) {
  //   e.preventDefault();
  //   useCallback(() => {
  //     const detail = `${catagory}, ${color}`;
  //     console.log(detail);
  //   }, [catagory, color]);
  //   if (catagory === "") {alert("카테고리를 선택해주세요!");} else {
  //     await axios
  //       .post(url + "codi/search", apparels)
  //       .then(response => handleClose());
  //   }
  // }
}*/

  function buttonClick(e) {
    e.preventDefault();
    if (catagory === "") {
      alert("카테고리를 선택해주세요");
    } else {
      const apparels = `${catagory}, ${color}`;
      console.log(apparels);
      handleClose();
    }
  }

  return (
    <>
      <Dialog onClose={handleClose} open={detailOpen}>
        <DialogTitle onClose={handleClose}>Detail</DialogTitle>
        <DialogContent>
          <Typography>추가 옵션을 선택해주세요🙂 </Typography>
        </DialogContent>
        <center>
          <FormControl style={{ marginBottom: "20px" }}>
            <InputLabel>👕 catagory</InputLabel>
            <Select
              style={{ width: "50vw" }}
              onChange={e => handleChange(e, "catagory")}
            >
              {/* {
                catagory{option}.map((catagory, idx) => {
                  return <MenuItem key={idx} name={catagory}>{catagory}</MenuItem>
                })
              } */}
              <MenuItem name="catagory" value="cardigan">
                cardigan
              </MenuItem>
              <MenuItem name="catagory" value="coat">
                coat
              </MenuItem>
              <MenuItem name="catagory" value="vest">
                vest
              </MenuItem>
              <MenuItem name="catagory" value="jacket">
                jacket
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>🎨 color</InputLabel>
            <Select
              style={{ width: "50vw" }}
              onChange={e => handleChange(e, "color")}
            >
              <MenuItem name="color" value="all">
                all
              </MenuItem>
              <MenuItem name="color" value="black">
                ⬛ black
              </MenuItem>
              <MenuItem name="color" value="white">
                ⬜ white
              </MenuItem>
              <MenuItem name="color" value="red">
                🟥 red
              </MenuItem>
              <MenuItem name="color" value="orange">
                🟧 orange
              </MenuItem>
              <MenuItem name="color" value="yellow">
                🟨 yellow
              </MenuItem>
              <MenuItem name="color" value="green">
                🟩 green
              </MenuItem>
              <MenuItem name="color" value="blue">
                🟦 blue
              </MenuItem>
              <MenuItem name="color" value="purple">
                🟪 purple
              </MenuItem>
              <MenuItem name="color" value="brown">
                🟫 brown
              </MenuItem>
            </Select>
          </FormControl>
        </center>
        <Button
          onClick={buttonClick}
          color="primary"
          style={{ marginTop: "15px", marginBottom: "10px" }}
        >
          선택완료
        </Button>
      </Dialog>
    </>
  );
}

export default ChooseDetail;
