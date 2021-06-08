import React, { useState } from "react";
import { Button, Container, TextField, Grid, Box } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import "pages/Login.css";
import * as client from "lib/client";
import PageTemplate from "components/common/PageTemplate";

const token = localStorage.getItem("token");
const id = localStorage.getItem("user_id");
const initialState = { email: "", password: "" };

function Login() {
  const [account, setAccount] = useState(initialState);
  const [error, setError] = useState(null);
  const history = useHistory();
  const { email, password } = account;

  function dataChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  }

  async function buttonClick(e) {
    e.preventDefault();
    await client
      .request("post", "/auth/login", account)
      .then(response => {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("user_id", response.data.user.user_id);
        console.log(response.data);
      })
      .catch(error => {
        setError(error.response.data?.message);
        console.log(error.response.data);
      });
    setAccount(initialState);
  }

  return (
    <PageTemplate>
      <Grid item>
        {error ? (
          <Alert severity="error" style={{ margin: "0 25px" }}>
            {error}
          </Alert>
        ) : null}
        <h1 style={{ textAlign: "left", margin: "10px 30px" }}>CODIBA</h1>
        <p
          style={{
            fontSize: "19px",
            textAlign: "left",
            margin: "10px 40px"
          }}
        >
          LOG IN
        </p>
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
        <p
          style={{
            color: "#4286f4",
            margin: "20px",
            textAlign: "center"
          }}
          onClick={() => {
            history.push("/register");
          }}
        >
          register
        </p>
      </Grid>
    </PageTemplate>
  );
}

export default Login;
