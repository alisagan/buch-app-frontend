// types/Buch.ts
export interface Buch {
  isbn: string;
  titel: { titel?: string };
  art: string;
  preis: number;
  lieferbar: boolean;
  datum: string;
  schlagwörter: string;
  rating: number;
  homepage: string;
}

export interface BuchMitExtras extends Omit<Buch, "lieferbar"> {
  lieferbar: string; // jetzt ist es "Ja" | "Nein"
  id: number;
}
