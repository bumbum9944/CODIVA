import React, { useState, useContext } from "react";
import { Button, TextField, Grid, Modal } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
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
    position: "absolute",
    top: "25%",
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
  //   const history = useHistory();
  const { email, password } = account;
  const { state, actions } = useContext(UserContext);
  //   const { user, token } = state;
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
        {/* <PageTemplate>
          <Grid item> */}
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
          <div style={{ display: "flex" }}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
            >
              <form onSubmit={buttonClick} style={{ margin: "0 auto" }}>
                <TextField
                  name="email"
                  type="email"
                  style={{ marginBottom: "12px", width: "85vw" }}
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
                  style={{ width: "85vw" }}
                  value={password}
                  onChange={dataChange}
                />
                <Button type="submit" id="button" variant="contained">
                  Login
                </Button>
              </form>
            </Grid>
          </div>
          <p
            style={{
              color: "#4286f4",
              margin: "20px 0px",
              textAlign: "center"
            }}
            onClick={() => {
              handleClose();
              document.querySelector("#register-modal").click();
            }}
          >
            register
          </p>
        </div>
        {/* </Grid>
        </PageTemplate> */}
      </Modal>
    </>
  );
}

export default Login;
