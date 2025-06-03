import { useFormContext } from "react-hook-form";

export default function ArtSelect() {
  const { register } = useFormContext();

  return (
    <div>
      <label>
        <span>Art</span>
        <select {...register("art")}>
          <option value="HARDCOVER">Hardcover</option>
          <option value="EPUB">EPUB</option>
          <option value="PAPERBACK">Paperback</option>
        </select>
      </label>
    </div>
  );
}
