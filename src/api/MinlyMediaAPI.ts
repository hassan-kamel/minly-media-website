import axios from "axios";

export const MinlyMediaAPI = axios.create({
  baseURL: "https://minly-media-backend.onrender.com/api",
  // baseURL: "https://localhost:8080/api",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});
