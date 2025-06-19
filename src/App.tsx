import "./App.css";
import { useState, useEffect } from "react";
import BuchSuchenForm from "./components/BuchSuchenForm";
import NavBar from "./components/NavBar";
import BuchAnlegenForm from "./components/BuchAnlegenForm";
import { login } from "./service/authService";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

export default function App() {
  // State zur Verwaltung des Login-Zustands
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Beim Laden der App prüfen, ob ein Token im localStorage vorhanden ist
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // Benutzer als eingeloggt markieren
    }
  }, []);

  // Login-Funktion, ruft den AuthService auf und speichert den Token
  const handleLogin = async (email: string, password: string) => {
    await login(email, password); // Holt Token und speichert ihn im localStorage
    setIsLoggedIn(true); // Login-Zustand setzen
  };

  // Logout-Funktion: Token löschen, Status zurücksetzen, Seite auf "suchen" setzen
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      {/* Navigationsleiste mit Login/Logout- und Seitenwechsel-Callbacks */}
      <NavBar
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Hauptinhalt je nach Seite und Login-Status */}
      <div className="App" style={{ padding: "2rem" }}>
        <Routes>
          <Route path="/suchen" element={<BuchSuchenForm />} />
          {isLoggedIn && (
            <Route path="/anlegen" element={<BuchAnlegenForm />} />
          )}
          <Route path="*" element={<Navigate to="/suchen" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
