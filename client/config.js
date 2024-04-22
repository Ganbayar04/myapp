import axios from "axios";

const API = axios.create({
<<<<<<< HEAD
  baseURL: "http://172.20.10.7:9090/api",
=======
  baseURL: "http://172.20.10.5:9090/api",
>>>>>>> 6e683b5a41b57609b4b9f0639ca73521a0266d52
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
