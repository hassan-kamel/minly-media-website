import axios from "axios";

export const MinlyMediaAPI = axios.create({
  baseURL: "https://minly-media-backend.onrender.com/api",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});
