// App.tsx
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BuchSuchenForm from "./components/BuchSuchenForm";
import BuchAnlegenForm from "./components/BuchAnlegenForm";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar /> {/* bleibt immer sichtbar */}
      <div className="App" style={{ padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<BuchSuchenForm />} />
          <Route path="/anlegen" element={<BuchAnlegenForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
