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
import { Alert, AlertTitle } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";

const url = "http://ec2-13-125-251-225.ap-northeast-2.compute.amazonaws.com/";

function Popup({ apparels, setApparels, setSelectedCategory, gender }) {
  const [open, setOpen] = useState(false);
  const [detailWarning, setDetailWarning] = useState(false);
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const warningClose = () => {
    setDetailWarning(false);
  };

  async function buttonClick(e) {
    e.preventDefault();
    if (apparels.length === 0) {
      setDetailWarning(true);
    } else {
      await axios
        .post(url + "codi/search", { gender: gender, apparels: apparels })
        .then(response => {
          console.log(response);
          handleClose();
          setApparels([]);
          setSelectedCategory({
            OUTER: false,
            TOP: false,
            BOTTOM: false,
            "ONE PIECE": false
          });
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
        <Snackbar
          open={detailWarning}
          autoHideDuration={1500}
          onClose={warningClose}
          style={{ height: "60%" }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            카테고리를 선택해주세요🧐
          </Alert>
        </Snackbar>

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
