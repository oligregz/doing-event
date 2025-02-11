import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

export const apiProvider = axios.create({
  baseURL: apiURL || "http://localhost:3000"
})