import { FormProvider, useForm } from "react-hook-form";
// Import der Formular-Hooks und des Providers von react-hook-form für Formularverwaltung

import ISBNFeld from "./FormularComponents/ISBNFeld";
import TitelFeld from "./FormularComponents/TitelFeld";
import PreisSlider from "./FormularComponents/PreisSlider";
import LieferbarSwitch from "./FormularComponents/LieferbarSwitch";
import DatumFeld from "./FormularComponents/DatumFeld";
import ArtSelect from "./FormularComponents/ArtSelect";
import SchlagwörterCheckboxen from "./FormularComponents/SchlagwörterCheckboxen";
import Rating from "./FormularComponents/Rating";
// Import der einzelnen Formular-Komponenten für die jeweiligen Felder

import { sucheBuecher } from "../api/buchApi";
import type { BuchSuchFormData } from "../types/BuchSuchFormData";
import Suchergebnisse from "./Suchergebnisse";
import type { Buch } from "../types/Buch";
import { useState } from "react";
// Import der Funktion zum Suchen der Bücher aus dem API-Modul

export default function BuchSuchForm() {
  // Haupt-Komponente für das Buch-Suchformular

  const methods = useForm({
    // React Hook Form Initialisierung mit Default-Werten für die Felder
    defaultValues: {
      isbn: "",
      titel: "",
      art: "",
      preis: 50,
      lieferbar: false,
      datum: "",
      schlagwörter: [],
      rating: 0,
    },
  });

  // Suchergebnisse in State Array speichern und nur Content
  const [ergebnisse, setErgebnisse] = useState<Buch[]>([]);

  const onSubmit = async (data: BuchSuchFormData) => {
    // Funktion, die beim Absenden des Formulars ausgeführt wird
    try {
      // Filtere alle Formularfelder heraus, die leer oder nicht gesetzt sind
      const filteredData: Record<string, unknown> = {};
      Object.entries(data).forEach(([key, value]) => {
        if (
          value !== "" &&
          value !== null &&
          !(Array.isArray(value) && value.length === 0)
        ) {
          filteredData[key] = value;
        }
      });

      // API-Aufruf mit den gefilterten Suchkriterien
      const result = await sucheBuecher(filteredData);

      // Ausgabe der Suchergebnisse in der Konsole
      console.log("Suchergebnisse:", result);

      //Nur die Daten des Ergebnisses rausziehen und in Array speichern
      setErgebnisse(result.content || []);

      // Erzeugt aus den Suchkriterien einen URL-Query-String und gibt ihn aus
      //const queryString = new URLSearchParams(filteredData).toString();
      //console.log("Suche mit Query:", `https://localhost:3000?${queryString}`);

      // nutzen von Unknown für Fehler
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unbekannter Fehler", error);
      }
    }
  };

  return (
    // FormProvider stellt den Formularzustand allen untergeordneten Komponenten zur Verfügung
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h1>Suche</h1>

        {/* Einzelne Eingabekomponenten des Suchformulars */}
        <ISBNFeld />
        <TitelFeld />
        <ArtSelect />
        <PreisSlider />
        <LieferbarSwitch />
        <DatumFeld />
        <SchlagwörterCheckboxen />
        <Rating />

        {/* Absende-Button, der deaktiviert wird während das Formular abgeschickt wird */}
        <button disabled={methods.formState.isSubmitting}>Suchen</button>
      </form>

      <Suchergebnisse daten={ergebnisse} />
    </FormProvider>
  );
}
