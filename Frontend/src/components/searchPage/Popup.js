import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography
} from "@material-ui/core";
import axios from "axios";

const url = "http://ec2-13-125-251-225.ap-northeast-2.compute.amazonaws.com/";

function Popup({ apparels, setApparels, gender }) {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setApparels([]);
  };

  async function buttonClick(e) {
    e.preventDefault();
    if (apparels.length === 0) {
      alert("검색할 옷을 선택해주세요");
    } else {
      await axios
        .post(url + "codi/search", { gender: gender, apparels: apparels })
        .then(response => {
          handleClose();
          history.push("/codies");
        });
    }
  }

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        SHOW
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle onClose={handleClose}>알림</DialogTitle>
        <DialogContent>
          <Typography>옵션 선택을 완료하셨나요?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={buttonClick}>
            네, 검색할게요
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            더 추가할게요
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Popup;
