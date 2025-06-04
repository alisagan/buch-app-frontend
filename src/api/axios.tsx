// src/api/axios.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:3000", // passe das an dein Backend an
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // wenn du Cookies nutzt (z.B. mit Keycloak) //TODO: true setzen und dabei fehler beheben
});

export default axiosInstance;
