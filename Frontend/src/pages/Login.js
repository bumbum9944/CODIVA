import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./Login.css";
// import axios from "axios";

const token = localStorage.getItem("token");
const id = localStorage.getItem("user_id");
// const url =  "";

function Login() {
  const [account, setAccount] = useState({ email: "", password: "" });
  const history = useHistory();

  return (
    <>
      <div className="codiba">
        <p>CODIBA</p>
      </div>
      <p style={{ fontSize: "19px", marginLeft: "20px" }}>LOG IN</p>
      <Container style={{ textAlign: "center" }}>
        <form>
          <TextField
            id="outlined-basic"
            style={{ marginBottom: "12px" }}
            label="email"
            variant="outlined"
          />
          <TextField id="outlined-basic" label="password" variant="outlined" />
        </form>
        <Button id="button" variant="contained">
          Login
        </Button>
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
