export type BuchAnlegenFormData = {
  isbn: string;
  titel: string;
  art: string;
  preis: number;
  rabatt: number;
  homepage: string;
  lieferbar: boolean;
  datum: string;
  schlagwörter: string[];
  rating: number;
};