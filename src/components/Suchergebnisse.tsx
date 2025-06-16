// Import von MUI-Komponenten und React Hooks
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";

// Import der Typdefinitionen für Bücher
import type { Buch, BuchMitExtras } from "../types/Buch";

// Props-Definition: Die Komponente erhält eine Liste von Büchern
interface SuchergebnisseProps {
  daten: Buch[];
}

export default function Suchergebnisse({ daten }: SuchergebnisseProps) {
  // Zustand für das Öffnen des Dialogs mit der Tabelle
  const [open, setOpen] = useState(false);

  // Zustand für die angezeigten Zeilen (Buchliste inkl. Zusatzinfos)
  const [rows, setRows] = useState<BuchMitExtras[]>([]);

  // Sobald neue Daten übergeben werden, Dialog öffnen und Zeilen aufbereiten
  useEffect(() => {
    if (daten.length > 0) {
      setOpen(true);
      const mapped: BuchMitExtras[] = daten.map((buch, index) => ({
        ...buch,
        id: index + 1,
        lieferbar: buch.lieferbar ? "Ja" : "Nein", // boolean → string
      }));
      setRows(mapped);
    }
  }, [daten]);

  return (
    <>
      {/* Hauptdialog für die Suchergebnisse */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>Suchergebnisse</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
              <Table stickyHeader size="small">
                <TableHead sx={{ "& th": { fontWeight: "bold" } }}>
                  <TableRow>
                    <TableCell>ISBN</TableCell>
                    <TableCell>Titel</TableCell>
                    <TableCell>Art</TableCell>
                    <TableCell>Preis (€)</TableCell>
                    <TableCell>Lieferbar</TableCell>
                    <TableCell>Datum</TableCell>
                    <TableCell>Schlagwörter</TableCell>
                    <TableCell>★ Rating</TableCell>
                    <TableCell>Homepage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.isbn}>
                      <TableCell>{row.isbn}</TableCell>
                      <TableCell>{row.titel?.titel || ""}</TableCell>
                      <TableCell>{row.art}</TableCell>
                      <TableCell>
                        {parseFloat(row.preis).toFixed(2).replace(".", ",")} €
                      </TableCell>
                      <TableCell>{row.lieferbar}</TableCell>
                      <TableCell>{row.datum}</TableCell>

                      {/* Schlagwörter ausgeben (Backend: schlagwoerter) */}
                      <TableCell>
                        {row.schlagwoerter?.join(", ") || ""}
                      </TableCell>

                      <TableCell>{row.rating}</TableCell>
                      <TableCell>{row.homepage}</TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Button zum Schließen des Dialogs */}
          <Box mt={2} textAlign="right">
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Schließen
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
