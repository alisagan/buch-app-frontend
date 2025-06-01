import { useFormContext } from "react-hook-form";

export default function DatumField() {
  const { register } = useFormContext();

  return (
    <div>
      <label>
        <span>Datum</span>
        <input {...register("datum")} type="date" />
      </label>
    </div>
  );
}
