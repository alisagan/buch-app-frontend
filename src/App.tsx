import "./App.css";
import { useState, useEffect } from "react";
import BuchSuchenForm from "./components/BuchSuchenForm";
import NavBar from "./components/NavBar";
import BuchAnlegenForm from "./components/BuchAnlegenForm";
import { login } from "./service/authService";

export default function App() {
  // State für die aktuell gewählte Seite ("suchen" oder "anlegen")
  const [seite, setSeite] = useState<"suchen" | "anlegen">("suchen");

  // State zur Verwaltung des Login-Zustands
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Beim Laden der App prüfen, ob ein Token im localStorage vorhanden ist
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // Benutzer als eingeloggt markieren
    }
  }, []);

  // Funktion zum Wechseln der aktiven Seite (z.B. von "suchen" zu "anlegen")
  const handleSeiteWechsel = (neueSeite: "suchen" | "anlegen") => {
    setSeite(neueSeite);
  };

  // Login-Funktion, ruft den AuthService auf und speichert den Token
  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password); // Holt Token und speichert ihn im localStorage
      setIsLoggedIn(true);          // Login-Zustand setzen
    } catch (err) {
      alert("Login fehlgeschlagen");
      console.error(err);
    }
  };

  // Logout-Funktion: Token löschen, Status zurücksetzen, Seite auf "suchen" setzen
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setSeite("suchen");
  };

  return (
    <>
      {/* Navigationsleiste mit Login/Logout- und Seitenwechsel-Callbacks */}
      <NavBar
        isLoggedIn={isLoggedIn}
        onSeiteWechsel={handleSeiteWechsel}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Hauptinhalt je nach Seite und Login-Status */}
      <div className="App" style={{ padding: "2rem" }}>
        {seite === "suchen" && <BuchSuchenForm />}                  {/* Suchformular anzeigen */}
        {seite === "anlegen" && isLoggedIn && <BuchAnlegenForm />}  {/* Nur bei Login anzeigen */}
      </div>
    </>
  );
}