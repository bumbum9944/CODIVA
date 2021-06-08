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
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const url =
  "http://ec2-13-125-251-225.ap-northeast-2.compute.amazonaws.com:5000/";
const categoryOuter = ["cardigan", "coat", "jacket", "vest"];
const categoryTop = [
  "sleeveless",
  "tee(short)",
  "tee(long)",
  "mtm",
  "hood",
  "shirts"
];
const categoryBottom = ["jeans", "leggings", "slacks", "skirts", "training"];
const categoryOnepiece = ["one-piece"];

function ChooseDetail({
  detail,
  setDetail,
  selectedOption,
  setSelectedOption,
  apparels,
  setApparels,
  changeDetail,
  detailOpen,
  handleClose
}) {
  const history = useHistory();

  function handleChange(e, name) {
    const { value } = e.target;
    setSelectedOption({ ...selectedOption, [name]: value });
    console.log(selectedOption);
  }

  function buttonClick(e) {
    e.preventDefault();
    if (selectedOption.category === "") {
      alert("카테고리를 선택해주세요");
    } else {
      console.log(apparels);
      setApparels([...apparels, selectedOption]);
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
            <InputLabel>👕 category</InputLabel>
            <Select
              style={{ width: "50vw" }}
              onChange={e => handleChange(e, "category")}
            >
              {detail === "OUTER" &&
                categoryOuter.map((category, idx) => {
                  return (
                    <MenuItem key={idx} name={category} value={category}>
                      {category}
                    </MenuItem>
                  );
                })}
              {detail === "TOP" &&
                categoryTop.map((category, idx) => {
                  return (
                    <MenuItem key={idx} name={category} value={category}>
                      {category}
                    </MenuItem>
                  );
                })}
              {detail === "BOTTOM" &&
                categoryBottom.map((category, idx) => {
                  return (
                    <MenuItem key={idx} name={category} value={category}>
                      {category}
                    </MenuItem>
                  );
                })}
              {detail === "ONE PIECE" && (
                <MenuItem name="category" value="one_piece">
                  One piece
                </MenuItem>
              )}
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
