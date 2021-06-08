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
  changeDetail,
  detailOpen,
  handleClose
}) {
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("all");
  const history = useHistory();

  // const handleChange = (e, type) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  //   const value = e.target.value;
  //   type === "category" ? setCategory(value) : setColor(value);
  // };

  function handleChange(e) {
    const { name, value } = e.target;
    setSelectedOption({ ...selectedOption, [name]: value });
    console.log(selectedOption);
  }

  // const buttonClick = useCallback(() => {
  //   console.log(detail);
  // }, [category, color]);

  /*{  // async function buttonClick(e) {
  //   e.preventDefault();
  //   useCallback(() => {
  //     const detail = `${category}, ${color}`;
  //     console.log(detail);
  //   }, [category, color]);
  //   if (category === "") {alert("카테고리를 선택해주세요!");} else {
  //     await axios
  //       .post(url + "codi/search", apparels)
  //       .then(response => handleClose());
  //   }
  // }
}*/

  function buttonClick(e) {
    e.preventDefault();
    if (category === "") {
      alert("카테고리를 선택해주세요");
    } else {
      const apparels = `${category}, ${color}`;
      console.log(apparels);
      handleClose();
    }
  }

  function ChooseCategory({ detail }) {
    let categoryList;
    if (detail === "OUTER") {
      categoryList = categoryOuter.map((category, idx) => {
        return (
          <MenuItem key={idx} name={category}>
            {category}
          </MenuItem>
        );
      });
    } else if (detail === "TOP") {
      categoryList = categoryTop.map((category, idx) => {
        return (
          <MenuItem key={idx} name={category}>
            {category}
          </MenuItem>
        );
      });
    } else if (detail === "BOTTOM") {
      categoryList = categoryBottom.map((category, idx) => {
        return (
          <MenuItem key={idx} name={category}>
            {category}
          </MenuItem>
        );
      });
    } else {
      categoryList = (
        <MenuItem name="category" value="one_piece">
          One piece
        </MenuItem>
      );
    }

    return <>{categoryList}</>;
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
              <ChooseCategory detail={detail} />
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
