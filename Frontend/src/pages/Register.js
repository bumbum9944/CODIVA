import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";

const url =
  "http://ec2-13-125-251-225.ap-northeast-2.compute.amazonaws.com:5000/";

function Register(props) {
  const [account, setAccount] = useState({
    name: "",
    email: "",
    password: "",
    checkPassword: ""
  });
  const history = useHistory();

  function dataChange(e) {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
    console.log(account);
  }

  function buttonClick(e) {
    e.preventDefault();
    if (account.password === account.checkPassword) {
      axios
        .post(url + "auth/register", {
          name: account.name,
          email: account.email,
          password: account.password
        })
        .then(response => history.push("/login"));
    } else {
      alert("비밀번호가 다릅니다.");
    }
  }

  return (
    <>
      <div className="codiba">
        <p>CODIBA</p>
      </div>
      <p style={{ fontSize: "19px", marginLeft: "20px" }}>REGISTER</p>
      <Container style={{ textAlign: "center" }}>
        <form onSubmit={buttonClick}>
          <TextField
            name="name"
            style={{ marginBottom: "12px", width: "85vw" }}
            label="name"
            variant="outlined"
            onChange={dataChange}
          />
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
            style={{ marginBottom: "12px", width: "85vw" }}
            label="password"
            variant="outlined"
            onChange={dataChange}
          />
          <TextField
            name="checkPassword"
            type="password"
            style={{ width: "85vw" }}
            label="check your password"
            variant="outlined"
            onChange={dataChange}
          />
          <Button type="submit" id="button" variant="contained">
            Register
          </Button>
        </form>
      </Container>
    </>
  );
}

export default Register;
