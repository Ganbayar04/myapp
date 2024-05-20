import axios from "axios";

const API = axios.create({
  baseURL: "http://10.150.33.220:9090/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
