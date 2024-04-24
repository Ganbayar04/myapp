import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.100.68:9090/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
