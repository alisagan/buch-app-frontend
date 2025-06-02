import { useFormContext } from "react-hook-form";
import { useState } from "react";

export default function PreisSlider() {
  const { register } = useFormContext();
  const [preis, setPreis] = useState(50);

  return (
    <div>
      <label>
        <span>Preis: {preis} €</span>
        <input
          type="range"
          min="1"
          max="100"
          step="1"
          value={preis}
          {...register("preis", {
            onChange: (e) => setPreis(e.target.value),
          })}
        />
      </label>
    </div>
  );
}
