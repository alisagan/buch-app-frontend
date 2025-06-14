// src/api/axios.ts
import axios from "axios";
import { getToken } from "../service/authService";

const axiosInstance = axios.create({
  baseURL: "https://localhost:3000",
  headers: { "Content-Type": "application/json" },
  withCredentials: false, // falls dein Backend Cookies setzt
});

// füge bei jedem Request das Bearer-Token hinzu (falls vorhanden)
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
