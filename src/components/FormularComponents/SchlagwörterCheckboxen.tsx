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
      {errors["schlagwörter"] && (
        <p role="alert">{errors["schlagwörter"].message}</p>
      )}
    </div>
  );
}
