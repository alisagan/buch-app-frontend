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
  IconButton,
  DialogActions,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

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

  // Zustand für das Öffnen des Lösch-Dialogs
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Zustand für das ausgewählte Buch, das gelöscht werden soll
  const [selectedBuch, setSelectedBuch] = useState<BuchMitExtras | null>(null);

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

  // Öffnet den Bestätigungsdialog für das Löschen eines Buches
  const handleDeleteClick = (buch: BuchMitExtras) => {
    setSelectedBuch(buch);
    setDeleteDialogOpen(true);
  };

  // Diese Funktion wird später mit der Löschlogik befüllt
  const confirmDelete = () => {
    console.log("Löschen bestätigen für:", selectedBuch);
    setDeleteDialogOpen(false);
    setSelectedBuch(null);
  };

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
                    <TableCell align="center">Aktion</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.isbn}>
                      <TableCell>{row.isbn}</TableCell>
                      <TableCell>{row.titel?.titel || ""}</TableCell>
                      <TableCell>{row.art}</TableCell>
                      <TableCell>{row.preis}</TableCell>
                      <TableCell>{row.lieferbar}</TableCell>
                      <TableCell>{row.datum}</TableCell>
                      <TableCell>{row.schlagwörter}</TableCell>
                      <TableCell>{row.rating}</TableCell>
                      <TableCell>{row.homepage}</TableCell>
                      <TableCell align="center">
                        {/* Mülleimer-Icon zum Löschen */}
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteClick(row)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
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

      {/* Bestätigungsdialog zum Löschen eines Buchs */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Löschen bestätigen</DialogTitle>
        <DialogContent>
          <Typography>
            Möchtest du das Buch mit ISBN <strong>{selectedBuch?.isbn}</strong>{" "}
            wirklich löschen?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
            Abbrechen
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Löschen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
