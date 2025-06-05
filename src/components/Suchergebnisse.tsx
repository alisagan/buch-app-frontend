import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { Box, Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { useState, useEffect } from "react";

interface SuchergebnisseProps {
  daten: any[];
}

export default function Suchergebnisse({ daten }: SuchergebnisseProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (daten.length > 0) {
      setOpen(true); // Öffnet den Dialog automatisch wenn Ergebnisse da sind
    }
  }, [daten]);

  const columns: GridColDef[] = [
    { field: "isbn", headerName: "ISBN", width: 150 },
    { field: "titel", headerName: "Titel", width: 200 },
    { field: "art", headerName: "Art", width: 130 },
    { field: "preis", headerName: "Preis (€)", width: 120 },
    {
      field: "lieferbar",
      headerName: "Lieferbar",
      width: 130,
      valueFormatter: (params: any) => (params.value ? "Ja" : "Nein"),
    },
    { field: "datum", headerName: "Datum", width: 130 },
    { field: "rating", headerName: "★ Rating", width: 130 },
  ];

  const rows = Array.isArray(daten)
    ? daten.map((buch, index) => ({
        id: index + 1,
        ...buch,
        titel: buch.titel?.titel || "", // Entpacke Titel-Objekt
      }))
    : [];

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="lg">
      <DialogTitle>Suchergebnisse</DialogTitle>
      <DialogContent>
        <Box sx={{ height: 450, width: "100%", mt: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5, page: 0 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            getRowHeight={() => 48}
          />
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
