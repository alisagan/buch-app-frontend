import React from "react";
import { useFormContext } from "react-hook-form";

export default function RabattFeld() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const rabattError = errors["rabat"];
  return (
    <div>
      <label>
        <span>Rabatt</span>
        <input
          {...register("rabatt", {
            min: {
              value: 0.0,
              message: "Value must be greater.",
            },
            max: {
              value: 1.0,
              message: "Value must be smaller.",
            },
          })}
          aria-invalid={errors["rabatt"] ? "true" : "false"}
          placeholder="0.5"
          step="0.01"
          type="number"
        />
      </label>
      {typeof rabattError?.message === "string" && (
        <p role="alert">{rabattError.message}</p>
      )}
    </div>
  );
}
