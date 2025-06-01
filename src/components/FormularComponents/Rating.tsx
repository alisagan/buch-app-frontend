import { useFormContext } from "react-hook-form";
import { useState } from "react";

export default function Rating() {
  const { register, setValue } = useFormContext();
  const [rating, setRating] = useState(0);

  const handleClick = (value: number) => {
    setRating(value);
    setValue("rating", value);
  };

  return (
    <div>
      <span>Rating:</span>
      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            style={{
              cursor: "pointer",
              fontSize: "2rem",
              color: value <= rating ? "#FFD700" : "#ccc",
            }}
            onClick={() => handleClick(value)}
          >
            ★
          </span>
        ))}
        <input type="hidden" {...register("rating")} value={rating} />
      </div>
    </div>
  );
}
