import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const token = localStorage.getItem("token");
const id = localStorage.getItem("user_id");
const url =
  "http://ec2-13-125-251-225.ap-northeast-2.compute.amazonaws.com:5000/";

function Login() {
  const [account, setAccount] = useState({ email: "", password: "" });
  const history = useHistory();

  function dataChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  }

  async function buttonClick(e) {
    e.preventDefault();
    await axios
      .post(url + "auth/login", account)
      .then(response => {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("user_id", response.data.user.user_id);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="codiba">
        <p>CODIBA</p>
      </div>
      <p style={{ fontSize: "19px", marginLeft: "20px" }}>LOG IN</p>
      <Container style={{ textAlign: "center" }}>
        <form onSubmit={buttonClick}>
          <TextField
            name="email"
            type="email"
            style={{ marginBottom: "12px", width: "85vw" }}
            label="email"
            variant="outlined"
            onChange={dataChange}
          />
          <TextField
            name="password"
            type="password"
            label="password"
            variant="outlined"
            style={{ width: "85vw" }}
            onChange={dataChange}
          />
          <Button
            type="submit"
            onClick={() => {
              console.log(account);
            }}
            id="button"
            variant="contained"
          >
            Login
          </Button>
        </form>
        <p
          style={{ color: "blue" }}
          onClick={() => {
            history.push("/register");
          }}
        >
          register
        </p>
      </Container>
    </>
  );
}

export default Login;
