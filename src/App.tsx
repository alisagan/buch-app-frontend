import "./App.css";
import React, { useState } from "react";
import BuchSuchenForm from "./components/BuchSuchenForm";
import NavBar from "./components/NavBar";
import BuchAnlegenForm from "./components/BuchAnlegenForm";
import type { BuchSuchFormData } from "./types/BuchSuchFormData";

export default function App() {
  const [seite, setSeite] = useState<"suchen" | "anlegen">("suchen");

  const handleFormSubmit = (data: BuchSuchFormData) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <>
      <NavBar onSeiteWechsel={setSeite} />
      <div className="App" style={{ padding: "2rem" }}>
        {seite === "suchen" && <BuchSuchenForm onSubmit={handleFormSubmit} />}
        {seite === "anlegen" && <BuchAnlegenForm />}
      </div>
    </>
  );
}
