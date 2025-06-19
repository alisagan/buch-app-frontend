import { FormProvider, useForm } from "react-hook-form";
import ISBNFeld from "./FormularComponents/ISBNFeld";
import TitelFeld from "./FormularComponents/TitelFeld";
import PreisSlider from "./FormularComponents/PreisSlider";
import LieferbarSwitch from "./FormularComponents/LieferbarSwitch";
import DatumFeld from "./FormularComponents/DatumFeld";
import ArtSelect from "./FormularComponents/ArtSelect";
import SchlagwörterCheckboxen from "./FormularComponents/SchlagwörterCheckboxen";
import Rating from "./FormularComponents/Rating";
import HomepageFeld from "./FormularComponents/HomepageFeld";
import RabattFeld from "./FormularComponents/RabattFeld";
import type { BuchAnlegenFormData } from "../types/BuchAnlegenFormData";
import axiosInstance from "../api/axios";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

export default function BuchAnlegenForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotificationOpen, setSuccessNotificationOpen] =
    useState<boolean>(false);

  const methods = useForm<BuchAnlegenFormData>({
    defaultValues: {
      isbn: "",
      titel: "",
      art: "",
      preis: 0,
      rabatt: 0,
      homepage: "",
      lieferbar: false,
      datum: new Date().toISOString().split("T")[0], // heute als Standardwert
      schlagwörter: [],
      rating: 0,
    },
  });

  const onSubmit = async (data: BuchAnlegenFormData) => {
    // titel-String in Objekt umwandeln
    const payload = {
      ...data,
      titel: {
        titel: data.titel, // der eingegebene Titel als String
        // untertitel kannst du hier ggf. hinzufügen, z.B. leer oder optional
        // untertitel: "",
      },
    };

    try {
      console.log("POST Body:", payload);
      await axiosInstance.post("/rest", payload); // POST mit Axios, baseURL wird verwendet
      setSuccessNotificationOpen(true);
      setErrorMessage(null); // Fehlernachricht zurücksetzen
      methods.reset(); // Formular zurücksetzen
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setErrorMessage(
          "Fehler: " + (err.response?.data?.message || err.message),
        );
      } else {
        setErrorMessage("Unbekannter Fehler");
      }
    }
  };
  const handleClose = () => {
    setSuccessNotificationOpen(false);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h1>Buch Anlegen</h1>

        {/*  Wiederverwendbare Formularfelder */}
        <ISBNFeld />
        <TitelFeld />
        <ArtSelect />
        <PreisSlider />
        <RabattFeld />
        <HomepageFeld />
        <LieferbarSwitch />
        <DatumFeld />
        <SchlagwörterCheckboxen />
        <Rating />

        <button disabled={methods.formState.isSubmitting}>Anlegen</button>

        {errorMessage && (
          <Alert style={{ marginTop: "5px" }} variant="filled" severity="error">
            {errorMessage}
          </Alert>
        )}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={successNotificationOpen}
          onClose={handleClose}
          message="Buch erfolgreich angelegt!"
        />
      </form>
    </FormProvider>
  );
}
