import React from "react";
import { useFormContext } from "react-hook-form";

export default function TitelFeld() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
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
          aria-invalid={errors["titel"] ? "true" : "false"}
          placeholder="Titel"
          type="search"
        />
      </label>
      {errors["titel"] && <p role="alert">{errors["titel"].message}</p>}
    </div>
  );
}
