import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type LoginDialogProps = {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
};

export default function LoginDialog({ open, onClose, onLoginSuccess }: LoginDialogProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    //Einfacher Dummy-Check, kann ersetzt werden
    if (username === "admin" && password === "admin") {
      onLoginSuccess();
      onClose();
    } else {
      alert("Login fehlgeschlagen");
    }
  };

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