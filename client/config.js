import axios from "axios";

const API = axios.create({
  baseURL: "http://10.150.35.148:9090/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
