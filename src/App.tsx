import "./App.css";
import React, { useState, useEffect } from "react";
import BuchSuchenForm from "./components/BuchSuchenForm";
import NavBar from "./components/NavBar";
import BuchAnlegenForm from "./components/BuchAnlegenForm";
import type { BuchSuchFormData } from "./types/BuchSuchFormData";
import LoginDialog from "./components/LoginDialog";

export default function App() {
  const [seite, setSeite] = useState<
    "suchen" | "anlegen" | "ändern" | "löschen"
  >("suchen");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [pendingAdminSeite, setPendingAdminSeite] = useState<
    null | typeof seite
  >(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handler für Seitenwechsel mit Admin-Prüfung
  const handleSeiteWechsel = (neueSeite: typeof seite) => {
    const istAdminAktion = ["anlegen", "ändern", "löschen"].includes(neueSeite);

    if (istAdminAktion && !isLoggedIn) {
      setPendingAdminSeite(neueSeite);
      setShowLoginDialog(true);
    } else {
      setSeite(neueSeite);
    }
  };

  // Logout-Funktion entfernt Token und setzt zurück
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setSeite("suchen");
  };

  // Handler für Suche (unverändert)
  const handleFormSubmit = (data: BuchSuchFormData) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <>
      {/* NavBar erhält jetzt isLoggedIn und onLogout */}
      <NavBar
        onSeiteWechsel={handleSeiteWechsel}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
      />

      <div className="App" style={{ padding: "2rem" }}>
        {seite === "suchen" && <BuchSuchenForm onSubmit={handleFormSubmit} />}
        {seite === "anlegen" && isLoggedIn && <BuchAnlegenForm />}
      </div>

      {/* LoginDialog wird angezeigt, wenn Admin-Seite angefordert wird */}
      <LoginDialog
        open={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          setShowLoginDialog(false);
          if (pendingAdminSeite) {
            setSeite(pendingAdminSeite);
            setPendingAdminSeite(null);
          }
        }}
      />
    </>
  );
}
