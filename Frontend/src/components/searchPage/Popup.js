import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import UserContext from "contexts/user";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const url = "http://ec2-13-125-251-225.ap-northeast-2.compute.amazonaws.com/";

function Popup({ apparels, setApparels, setSelectedCategory, gender }) {
  const [open, setOpen] = useState(false);
  const [detailWarning, setDetailWarning] = useState(false);
  const history = useHistory();
  const { state } = useContext(UserContext);
  const { user } = state;

  const local_apparels = JSON.parse(sessionStorage.getItem("apparels")) || [];

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
    if (local_apparels.length === 0) {
      setDetailWarning(true);
    } else {
      handleClose();
      history.push("/codies");
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
          <Alert
            severity="warning"
            style={{ alignItems: "flex-start" }}
            action={
              <React.Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={warningClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          >
            <AlertTitle>Warning</AlertTitle>
            ???????????? ?????? ??????????????????????
          </Alert>
        </Snackbar>

        <DialogTitle onClose={handleClose}>??????</DialogTitle>
        <DialogContent>
          <Typography>?????? ????????? ???????????????????</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={buttonClick}>
            ???, ???????????????
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            ??? ???????????????
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Popup;
