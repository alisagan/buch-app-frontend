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
          {...register(
            "isbn",
            // , {
            //   pattern: {
            //     value: /^(\d{3})-(\d{1})-(\d{3})-(\d{5})-(\d{1})$/,
            //     message: "ISBN muss dem Muster xxx-x-xxx-xxxxx-x entsprechen",
            //   },
            // }
          )}
          aria-invalid={errors["isbn"] ? "true" : "false"}
          placeholder="978-3-897-22583-1"
          type="text"
        />
      </label>
      {errors["isbn"] && <p role="alert">{errors["isbn"].message}</p>}
    </div>
  );
}
