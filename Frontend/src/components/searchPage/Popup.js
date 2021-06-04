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

function Popup() {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <Button
            variant="contained"
            onClick={() => {
              history.push("/codies");
            }}
          >
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
