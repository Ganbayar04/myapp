import axios from "axios";

const API = axios.create({
  baseURL: "http://10.50.0.247:9090/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
