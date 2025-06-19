// src/service/authService.ts
import axios from "axios";

// URL des Authentifizierungsendpunkts im Backend
const AUTH_URL = "https://localhost:3000/auth/token";

/**
 * Führt den Login durch, holt einen Access Token vom Server
 * und speichert ihn im localStorage.
 */
export async function login(username: string, password: string): Promise<void> {
  // Erzeuge URL-encoded Body mit Benutzername und Passwort
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  // Sende POST-Anfrage an den Auth-Endpunkt, um ein Token zu erhalten
  const res = await axios.post(AUTH_URL, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  // Extrahiere den Access Token aus der Antwort
  const token = res.data.access_token;
  if (!token) throw new Error("Kein Token erhalten");

  // Speichere den Token lokal für spätere Requests
  localStorage.setItem("token", token);
}

/**
 * Entfernt den Token aus dem localStorage (z.B. beim Logout)
 */
export function logout() {
  localStorage.removeItem("token");
}

/**
 * Holt den gespeicherten Token aus dem localStorage
 * @returns Der Access Token oder null, wenn keiner vorhanden ist
 */
export function getToken(): string | null {
  return localStorage.getItem("token");
}
