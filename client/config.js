import axios from "axios";

const API = axios.create({
  baseURL: "http://10.150.34.55:9090/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
