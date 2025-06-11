import "./App.css";
import React, { useState, useEffect } from "react";
import BuchSuchenForm from "./components/BuchSuchenForm";
import NavBar from "./components/NavBar";
import BuchAnlegenForm from "./components/BuchAnlegenForm";
import type { BuchSuchFormData } from "./types/BuchSuchFormData";
import LoginDialog from "./components/LoginDialog";

export default function App() {
  const [seite, setSeite] = useState<"suchen" | "anlegen" | "ändern" | "löschen">("suchen");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  //Variable die sich die angeklickte Seite merkt
  const [pendingAdminSeite, setPendingAdminSeite] = useState<null | typeof seite>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  //Funktion zum Überprüfen ob der Benutzer eingeloggt ist zum Seitenwechsel
  const handleSeiteWechsel = (neueSeite: typeof seite) => {
    const istAdminAktion = ["anlegen", "ändern", "löschen"].includes(neueSeite);

    if (istAdminAktion && !isLoggedIn) {
      setPendingAdminSeite(neueSeite); // Speichert die angeklickte Seite
      setShowLoginDialog(true);
    } else {
      setSeite(neueSeite);
    }
  };

  const handleFormSubmit = (data: BuchSuchFormData) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <>
      <NavBar onSeiteWechsel={handleSeiteWechsel} />
      <div className="App" style={{ padding: "2rem" }}>
        {seite === "suchen" && <BuchSuchenForm onSubmit={handleFormSubmit} />}
        {seite === "anlegen" && <BuchAnlegenForm />}
      </div>
      <LoginDialog
        open={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          if (pendingAdminSeite) {
            setSeite(pendingAdminSeite);
            setPendingAdminSeite(null); // aufräumen
          }
        }}
      />
    </>
  );
}
