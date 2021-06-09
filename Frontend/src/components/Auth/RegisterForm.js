import React, { useState } from "react";
import { Button, TextField, Modal } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import * as client from "lib/client";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    top: "50%",
    width: "80%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 5)
  }
}));

const initialState = {
  name: "",
  email: "",
  password: "",
  checkPassword: ""
};

function Register(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [account, setAccount] = useState(initialState);
  const [error, setError] = useState(null);
  const { name, email, password, checkPassword } = account;

  const handleOpen = () => {
    setAccount(initialState);
    setError(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dataChange = e => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
    console.log(account);
  };

  const buttonClick = async e => {
    e.preventDefault();
    if (password !== checkPassword) {
      setError("비밀번호와 비밀번호 확인이 다릅니다.");
      return;
    }
    if (!email || !password || !name) {
      setError("모든 필드 값이 채워져야 합니다.");
      return;
    }
    await client
      .request("post", "/auth/register", { name, email, password })
      .then(res => {
        console.log(res.data?.message);
        handleClose();
        document.querySelector("#login-modal").click();
      })
      .catch(err => setError(err.response.data?.message));
  };

  return (
    <>
      <a
        id="register-modal"
        style={{ opacity: 0, display: "none" }}
        onClick={handleOpen}
      >
        Click
      </a>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        className={classes.modal}
      >
        <div style={{ margin: "0 auto" }} className={classes.paper}>
          {error ? (
            <Alert severity="error" style={{ margin: "0" }}>
              {error}
            </Alert>
          ) : null}
          <h1 style={{ textAlign: "left", margin: "5px 0px" }}>CODIBA</h1>
          <p
            style={{
              fontSize: "19px",
              textAlign: "left",
              margin: "10px"
            }}
          >
            REGISTER
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <form
              onSubmit={buttonClick}
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "stretch",
                width: "80vw"
              }}
            >
              <TextField
                name="name"
                style={{ marginBottom: "12px" }}
                label="name"
                variant="outlined"
                onChange={dataChange}
              />
              <TextField
                name="email"
                type="email"
                style={{ marginBottom: "12px" }}
                label="email"
                variant="outlined"
                onChange={dataChange}
              />
              <TextField
                name="password"
                type="password"
                style={{ marginBottom: "12px" }}
                label="password"
                variant="outlined"
                onChange={dataChange}
              />
              <TextField
                name="checkPassword"
                type="password"
                label="check your password"
                variant="outlined"
                onChange={dataChange}
              />
              <Button type="submit" className="form-button" variant="contained">
                Register
              </Button>
              <Button
                className="form-button"
                variant="outlined"
                style={{ borderColor: "#424242", color: "#424242" }}
                onClick={() => {
                  handleClose();
                  document.querySelector("#login-modal").click();
                }}
              >
                Log In
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Register;
