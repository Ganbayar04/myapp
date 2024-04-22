import axios from "axios";

const API = axios.create({
  baseURL: "http://172.20.10.5:9090/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
