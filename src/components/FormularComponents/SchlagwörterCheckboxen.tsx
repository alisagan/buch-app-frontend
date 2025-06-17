import React from "react";
import { useFormContext } from "react-hook-form";

const schlagworte = [
  { label: "Typescript", value: "Typescript" },
  { label: "Java", value: "Java" },
  { label: "Javascript", value: "Javascript" },
  { label: "Python", value: "Python" },
];

export default function SchlagwörterCheckboxen() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const schlagwoerterError = errors["schlagwörter"];

  return (
    <div>
      <p>Schlagwörter</p>
      {schlagworte.map(({ label, value }, index) => (
        <label key={value + index}>
          <span>{label}</span>
          <input
            {...register("schlagwörter")}
            aria-invalid={errors["schlagwörter"] ? "true" : "false"}
            value={value}
            type="checkbox"
          />
        </label>
      ))}
      {typeof schlagwoerterError?.message === "string" && (
        <p role="alert">{schlagwoerterError.message}</p>
      )}
    </div>
  );
}
