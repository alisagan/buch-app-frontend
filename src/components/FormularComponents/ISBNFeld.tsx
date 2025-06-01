import React from "react";
import { useFormContext } from "react-hook-form";

export default function ISBNFeld() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <label>
        <span>ISBN</span>
        <input
          {...register("isbn", {
            minLength: {
              value: 13,
              message: "13 Ziffern sind nötig",
            },
            maxLength: {
              value: 13,
              message: "13 Ziffern sind nötig",
            },
          })}
          aria-invalid={errors["isbn"] ? "true" : "false"}
          placeholder="ISBN"
          type="search"
        />
      </label>
      {errors["isbn"] && <p role="alert">{errors["isbn"].message}</p>}
    </div>
  );
}
