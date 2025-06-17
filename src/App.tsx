import "./App.css";
import { useState, useEffect } from "react";
import BuchSuchenForm from "./components/BuchSuchenForm";
import NavBar from "./components/NavBar";
import BuchAnlegenForm from "./components/BuchAnlegenForm";

export default function App() {
  const [seite, setSeite] = useState<"suchen" | "anlegen">("suchen");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSeiteWechsel = (neueSeite: "suchen" | "anlegen") => {
    setSeite(neueSeite);
  };

  const handleLogin = (email: string, password: string) => {
    // Beispielhafte Login-Logik
    if (email && password) {
      localStorage.setItem("token", "demo-token");
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setSeite("suchen");
  };

  return (
    <>
      <NavBar
        isLoggedIn={isLoggedIn}
        onSeiteWechsel={handleSeiteWechsel}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <div className="App" style={{ padding: "2rem" }}>
        {seite === "suchen" && <BuchSuchenForm />}
        {seite === "anlegen" && isLoggedIn && <BuchAnlegenForm />}
      </div>
    </>
  );
}
