import React from "react";
import { useFormContext } from "react-hook-form";

export default function LieferbarSwitch() {
  const { register } = useFormContext();
  return (
    <div>
      <label className="switch-label">
        <span>Lieferbar?</span>
        <label className="switch">
          <input type="checkbox" {...register("lieferbar")} />
          <span className="slider"></span>
        </label>
      </label>
    </div>
  );
}
