import axios from "axios";

export const api = axios.create({
  baseURL: "https://lgan9k1jnh.execute-api.ap-south-1.amazonaws.com",
  withCredentials: true,
  timeout: 5000,
});