import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import PageTemplate from "components/common/PageTemplate";
import * as client from "lib/client";

function Register(props) {
  const [account, setAccount] = useState({
    name: "",
    email: "",
    password: "",
    checkPassword: ""
  });
  const [error, setError] = useState(null);
  const history = useHistory();
  const { name, email, password, checkPassword } = account;

  function dataChange(e) {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
    console.log(account);
  }

  async function buttonClick(e) {
    e.preventDefault();
    if (account.password !== account.checkPassword) {
      setError("비밀번호와 비밀번호 확인이 다릅니다.");
      return;
    }
    await client
      .request("post", "/auth/register", { name, email, password })
      .then(response => history.push("/login"))
      .catch(err => setError(err.response.data?.message));
  }

  return (
    <PageTemplate>
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
        REGISTER
      </p>
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
    </PageTemplate>
  );
}

export default Register;
