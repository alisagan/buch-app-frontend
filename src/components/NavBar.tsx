import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Container,
  Alert,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HkaLogo from "../assets/hka-logo.jpg";
import { useNavigate } from "react-router-dom";

// Definiert die öffentlichen Seiten der Navigation
const pages: { label: string; key: SeiteKey }[] = [
  { label: "Suchen", key: "suchen" },
];

// Definiert die geschützten Seiten, die nur im eingeloggten Zustand angezeigt werden
const privatePages: { label: string; key: SeiteKey }[] = [
  { label: "Anlegen", key: "anlegen" },
];

// Zulässige Seitenschlüssel (für Navigation und Seitenauswahl)
type SeiteKey = "suchen" | "anlegen";

// Übergabeparameter für die NavBar-Komponente
type NavBarProps = {
  isLoggedIn: boolean; // Gibt an, ob der Benutzer eingeloggt ist
  onLogin: (email: string, password: string) => Promise<void>; // Login-Funktion
  onLogout: () => void; // Logout-Funktion
};

export default function NavBar({ isLoggedIn, onLogin, onLogout }: NavBarProps) {
  const navigate = useNavigate();
  // Zustand für geöffnete Navigationsmenüs (mobil/klein)
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  // Zustand für Benutzer-Menü (z.B. Logout)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  // Zustand für Sichtbarkeit des Login-Dialogs
  const [loginOpen, setLoginOpen] = React.useState(false);
  // Eingabefelder für E-Mail und Passwort im Login-Dialog
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginFailed, setLoginFailed] = React.useState(false);

  React.useEffect(() => {
    if (!loginOpen) {
      setLoginFailed(false); // Fehlerstatus zurücksetzen, wenn Dialog geschlossen wird
    }
  }, [loginOpen]);

  // Öffnet das Navigationsmenü (z.B. bei Burger-Icon)
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  // Schließt das Navigationsmenü
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Klick auf Benutzer-Icon: Login-Dialog oder User-Menü öffnen
  const handleAccountIconClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isLoggedIn) {
      setAnchorElUser(event.currentTarget);
    } else {
      setLoginOpen(true);
    }
  };

  // Schließt das Benutzer-Menü
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Führt Logout durch nach Bestätigung
  const handleLogoutClick = () => {
    handleCloseUserMenu();
    const confirmed = window.confirm("Möchtest du dich wirklich ausloggen?");
    if (confirmed) {
      onLogout();
    }
  };

  // Login-Handler: ruft Login-Funktion aus Props auf und schließt Dialog
  const handleLogin = async () => {
    try {
      await onLogin(email, password);
      setLoginOpen(false);
      setEmail("");
      setPassword("");
    } catch {
      setLoginFailed(true);
    }
  };

  return (
    <>
      {/* Hauptnavigation */}
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ alignItems: "center" }}>
            {/* Uni-Logo links */}
            <img
              src={HkaLogo}
              alt="HKA Logo"
              style={{ marginRight: 8, height: 55, objectFit: "contain" }}
            />
            <Typography variant="h6" noWrap sx={{ mr: 2 }} />

            {/* Titel der Anwendung */}
            <Typography
              variant="h4"
              noWrap
              sx={{
                flexGrow: 1,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              BUCH
            </Typography>

            {/* Burger-Menü (Seitenwechsel) */}
            <Box sx={{ display: "flex" }}>
              <IconButton
                aria-label="Menü öffnen"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                {[...pages, ...(isLoggedIn ? privatePages : [])].map(
                  ({ label, key }) => (
                    <MenuItem
                      key={key}
                      onClick={() => {
                        navigate("/" + key); // Seitenwechsel auslösen
                        handleCloseNavMenu(); // Menü schließen
                      }}
                    >
                      <Typography textAlign="center">{label}</Typography>
                    </MenuItem>
                  ),
                )}
              </Menu>
            </Box>

            {/* Benutzer-Icon mit Login/Logout */}
            <Box sx={{ ml: 2 }}>
              <Tooltip title={isLoggedIn ? "Benutzeroptionen" : "Login"}>
                <IconButton
                  size="large"
                  onClick={handleAccountIconClick}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Login-Dialog */}
      <Dialog
        open={loginOpen}
        onClose={() => {
          setLoginOpen(false);
        }}
      >
        <DialogTitle>Login</DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Verhindert das Standard-Formularverhalten
            handleLogin(); // Ruft die Login-Funktion auf
          }}
        >
          <DialogContent>
            <TextField
              margin="dense"
              label="E-Mail"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Passwort"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {loginFailed ? (
              <Alert variant="filled" severity="error">
                Login fehlgeschlagen. Bitte überprüfe deine Eingaben.
              </Alert>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setLoginOpen(false);
              }}
            >
              Abbrechen
            </Button>
            <Button type="submit" onClick={handleLogin} variant="contained">
              Login
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
