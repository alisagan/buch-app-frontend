import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/", // wichtig: nicht direkt 3000
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // wichtig für Keycloak-Cookies
});

export default axiosInstance;
