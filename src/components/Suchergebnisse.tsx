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

interface SuchergebnisseProps {
  daten: any[];
}

export default function Suchergebnisse({ daten }: SuchergebnisseProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (daten.length > 0) {
      setOpen(true);
    }
  }, [daten]);

  const rows = Array.isArray(daten)
    ? daten.map((buch, index) => ({
        id: index + 1,
        isbn: buch.isbn || "",
        titel: buch.titel?.titel || "",
        art: buch.art || "",
        preis: buch.preis || "",
        lieferbar: buch.lieferbar ? "Ja" : "Nein",
        datum: buch.datum || "",
        rating: buch.rating || "",
      }))
    : [];

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="lg">
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
                  <TableCell>★ Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.isbn}</TableCell>
                    <TableCell>{row.titel}</TableCell>
                    <TableCell>{row.art}</TableCell>
                    <TableCell>{row.preis}</TableCell>
                    <TableCell>{row.lieferbar}</TableCell>
                    <TableCell>{row.datum}</TableCell>
                    <TableCell>{row.rating}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box mt={2} textAlign="right">
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Schließen
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
