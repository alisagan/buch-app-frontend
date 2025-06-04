import React from "react";
import { useFormContext } from "react-hook-form";

export default function HomepageFeld() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <label>
        <span>Homepage</span>
        <input
          {...register("homepage", {
            minLength: {
              value: 8,
              message: "Link muss mindestens 8 Zeichen beeinhalten",
            },
            maxLength: {
              value: 80,
              message: "Link darf nicht mehr als 80 Zeichen beeinhalten",
            },
          })}
          aria-invalid={errors["homepage"] ? "true" : "false"}
          placeholder="https://beispiel.at"
          type="search"
        />
      </label>
      {errors["omepage"] && <p role="alert">{errors["homepage"].message}</p>}
    </div>
  );
}
