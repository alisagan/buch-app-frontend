import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { login } from "../service/authService";

// Die Komponente erwartet Props, um den Dialog zu steuern
// - `open`: bestimmt, ob der Dialog sichtbar ist
// - `onClose`: wird aufgerufen, wenn der Dialog geschlossen werden soll
// - `onLoginSuccess`: wird aufgerufen, wenn der Login erfolgreich war
type LoginDialogProps = {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
};

export default function LoginDialog({
  open,
  onClose,
  onLoginSuccess,
}: LoginDialogProps) {
  // State-Hooks für Eingabefelder, um die Benutzerinteraktion zu speichern
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Asynchrone Login-Logik:
  // Ruft die externe `login`-Funktion auf, verarbeitet Erfolg und Fehler.
  // - Bei Erfolg: wird der Erfolgshandler aufgerufen und der Dialog geschlossen
  // - Bei Fehler: erscheint eine Fehlermeldung via `alert` und Logging
  const handleLogin = async () => {
    try {
      await login(username, password);
      onLoginSuccess();
      onClose();
    } catch (err) {
      alert("Login fehlgeschlagen");
      console.error(err);
    }
  };

  // MUI-Dialogstruktur:
  // - Enthält Eingabefelder mit State-Bindung
  // - Button-Leiste für Abbrechen und Einloggen
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Admin-Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Benutzername"
          fullWidth
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Passwort"
          type="password"
          fullWidth
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Abbrechen</Button>
        <Button onClick={handleLogin}>Einloggen</Button>
      </DialogActions>
    </Dialog>
  );
}
