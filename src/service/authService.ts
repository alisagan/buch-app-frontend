// src/service/authService.ts
import axios from "axios";

const AUTH_URL = "https://localhost:3000/auth/token";

export async function login(username: string, password: string): Promise<void> {
  // bereite URL-encoded Body vor
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  // Token vom Backend holen
  const res = await axios.post(AUTH_URL, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const token = res.data.access_token;
  if (!token) throw new Error("Kein Token erhalten");
  // Token im localStorage sichern
  localStorage.setItem("token", token);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}
