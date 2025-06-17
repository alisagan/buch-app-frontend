import React from "react";
import { useFormContext } from "react-hook-form";

export default function TitelFeld() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Fehler extrahieren und vorab typisieren
  const titelError = errors["titel"];

  return (
    <div>
      <label>
        <span>Titel</span>
        <input
          {...register("titel", {
            minLength: {
              value: 1,
              message: "Titel zu kurz",
            },
            maxLength: {
              value: 100,
              message: "Titel zu lang",
            },
          })}
          aria-invalid={titelError ? "true" : "false"}
          placeholder="Titel"
          type="search"
        />
      </label>

      {/* Fehlermeldung nur anzeigen, wenn sie ein String ist */}
      {typeof titelError?.message === "string" && (
        <p role="alert">{titelError.message}</p>
      )}
    </div>
  );
}
