import {
  Dialog,
  DialogContent,
  DialogTitle,
  Select,
  Typography,
  MenuItem,
  InputLabel,
  Button,
  FormControl,
  Snackbar
} from "@material-ui/core";
import React, { useState } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

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

function ChooseDetail({
  detail,
  setDetail,
  setDetailOpen,
  selectedOption,
  setSelectedOption,
  selectedCategory,
  setSelectedCategory,
  apparels,
  setApparels,
  changeDetail,
  detailOpen
}) {
  const [categoryWarning, setCategoryWarning] = useState(false);
  const local_apparels = JSON.parse(sessionStorage.getItem("apparels")) || [];
  const local_selectedCategory = JSON.parse(
    sessionStorage.getItem("selectedCategory")
  ) || {
    OUTER: false,
    TOP: false,
    BOTTOM: false,
    "ONE PIECE": false
  };

  const handleClose = () => {
    setDetailOpen(false);
    setSelectedOption({
      category: "",
      color: "all"
    });
  };

  const warningClose = () => {
    setCategoryWarning(false);
  };

  function handleChange(e, name) {
    const { value } = e.target;
    setSelectedOption({ ...selectedOption, [name]: value });
  }

  function buttonClick(e) {
    e.preventDefault();
    if (selectedOption.category.length === 0) {
      setCategoryWarning(true);
    } else {
      sessionStorage.setItem(
        "apparels",
        JSON.stringify([...local_apparels, selectedOption])
      );
      setApparels([...apparels, selectedOption]);
      sessionStorage.setItem(
        "selectedCategory",
        JSON.stringify({ ...local_selectedCategory, [detail]: true })
      );
      setSelectedCategory({ ...selectedCategory, [detail]: true });
      handleClose();
    }
  }

  return (
    <>
      <Dialog onClose={handleClose} open={detailOpen}>
        <Snackbar
          open={categoryWarning}
          autoHideDuration={1500}
          onClose={warningClose}
          style={{ height: "50%" }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <Alert
            severity="warning"
            style={{ alignItems: "flex-start" }}
            action={
              <React.Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="warning"
                  onClick={warningClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          >
            <AlertTitle>Warning</AlertTitle>
            ??????????????? ??????????????????????
          </Alert>
        </Snackbar>

        <DialogTitle onClose={handleClose}>Detail</DialogTitle>
        <DialogContent>
          <Typography>?????? ????????? ?????????????????????? </Typography>
        </DialogContent>
        <center>
          <FormControl style={{ marginBottom: "20px" }}>
            <InputLabel>???? category</InputLabel>
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
                <MenuItem name="category" value="one-piece">
                  One piece
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>???? color</InputLabel>
            <Select
              style={{ width: "50vw" }}
              onChange={e => handleChange(e, "color")}
            >
              <MenuItem name="color" value="all">
                all
              </MenuItem>
              <MenuItem name="color" value="black">
                ??? black
              </MenuItem>
              <MenuItem name="color" value="white">
                ??? white
              </MenuItem>
              <MenuItem name="color" value="red">
                ???? red
              </MenuItem>
              <MenuItem name="color" value="orange">
                ???? orange
              </MenuItem>
              <MenuItem name="color" value="yellow">
                ???? yellow
              </MenuItem>
              <MenuItem name="color" value="green">
                ???? green
              </MenuItem>
              <MenuItem name="color" value="blue">
                ???? blue
              </MenuItem>
              <MenuItem name="color" value="purple">
                ???? purple
              </MenuItem>
              <MenuItem name="color" value="brown">
                ???? brown
              </MenuItem>
            </Select>
          </FormControl>
        </center>
        <Button
          onClick={buttonClick}
          color="primary"
          style={{ marginTop: "15px", marginBottom: "10px" }}
        >
          ????????????
        </Button>
      </Dialog>
    </>
  );
}

export default ChooseDetail;
