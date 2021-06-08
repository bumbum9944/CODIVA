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

const url =
  "http://ec2-13-125-251-225.ap-northeast-2.compute.amazonaws.com:5000/";

function Popup({ apparels, setApparels }) {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function buttonClick(e) {
    e.preventDefault();
    await axios.post(url + "codi/search", apparels).then(response => {
      handleClose();
      setApparels([]);
      history.push("/codies");
    });
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
