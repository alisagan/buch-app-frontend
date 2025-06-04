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

export default function BuchAnlegenForm() {
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
      rating: 0
    }
  });

  const onSubmit = async (data: BuchAnlegenFormData) => {
    try {
      await axiosInstance.post('/rest', data); // POST mit Axios, baseURL wird verwendet
      alert('Buch erfolgreich angelegt!');
      methods.reset(); // Formular zurücksetzen
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert('Fehler: ' + (err.response?.data?.message || err.message));
      } else {
        alert('Unbekannter Fehler');
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h1>Buch anlegen</h1>

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
      </form>
    </FormProvider>
  );
}

