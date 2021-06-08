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
      "Access-Control-Allow-Origin": "*"
    }
  });

export const requestWithJWT = (method, url, data = null) =>
  client({
    method,
    url,
    data,
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
