import axios from "axios";

const API = axios.create({
  baseURL: "https://stayfinder-backend-6s5m.onrender.com/api",
});

export default API;