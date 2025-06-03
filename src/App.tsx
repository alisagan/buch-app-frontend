import "./App.css";
import React from "react";
import BuchSuchenForm from "./components/BuchSuchenForm";
import type { BuchSuchFormData } from "./types/BuchSuchFormData";

export default function App() {
  const handleFormSubmit = (data: BuchSuchFormData) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="App" style={{ padding: "2rem" }}>
      <BuchSuchenForm onSubmit={handleFormSubmit} />
    </div>
  );
}
