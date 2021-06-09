import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const client = axios.create();
client.defaults.baseURL = process.env.REACT_APP_HOST;

export const request = (method, url, data = null) =>
  client({
    method,
    url,
    data,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const requestWithJWT = (method, url, data = null) =>
  client({
    method,
    url,
    data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
