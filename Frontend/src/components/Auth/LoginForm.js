import React, { useState, useContext } from "react";
import { Button, TextField, Modal } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import * as client from "lib/client";
import UserContext from "contexts/user";

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
    padding: theme.spacing(2, 4, 3)
  }
}));

const initialState = {
  email: "",
  password: ""
};

function Login() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [account, setAccount] = useState(initialState);
  const [error, setError] = useState(null);
  const { email, password } = account;
  const { actions } = useContext(UserContext);
  const { setUser, setToken } = actions;

  const handleOpen = () => {
    setAccount(initialState);
    setError(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dataChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  };

  const buttonClick = async e => {
    e.preventDefault();
    if (!email || !password) {
      setError("모든 필드 값이 채워져야합니다.");
      return;
    }
    await client
      .request("post", "/auth/login", account)
      .then(response => {
        const { access_token, user } = response.data;
        localStorage.setItem("token", access_token);
        localStorage.setItem("user_id", user.user_id);
        setUser(user.user_id);
        setToken(access_token);
        handleClose();
        setError(null);
        console.log(response.data);
      })
      .catch(error => {
        setError(error.response.data?.message);
        console.log(error.response.data);
      });
    setAccount(initialState);
  };

  return (
    <>
      <a
        id="login-modal"
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
            LOG IN
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
                name="email"
                type="email"
                style={{ marginBottom: "12px" }}
                label="email"
                variant="outlined"
                value={email}
                onChange={dataChange}
              />

              <TextField
                name="password"
                type="password"
                label="password"
                variant="outlined"
                style={{}}
                value={password}
                onChange={dataChange}
              />
              <Button type="submit" className="form-button" variant="contained">
                Login
              </Button>
              <Button
                // variant="outlined"
                // style={{
                //   color: "#4286f4",
                //   margin: "16px 0px",
                //   textAlign: "center"
                // }}
                className="form-button"
                style={{
                  borderColor: "#2196f3",
                  color: "#2196f3",
                  margin: "12px 0px"
                }}
                onClick={() => {
                  handleClose();
                  document.querySelector("#register-modal").click();
                }}
              >
                register
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Login;
