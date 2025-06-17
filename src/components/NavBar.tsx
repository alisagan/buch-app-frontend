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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HkaLogo from "../assets/hka-logo.jpg";

// Zwei Seiten die es gibt
const pages: { label: string; key: SeiteKey }[] = [
  { label: "Suchen", key: "suchen" },
];
const privatePages: { label: string; key: SeiteKey }[] = [
  { label: "Anlegen", key: "anlegen" },
];

//Zentrale Seiten Elemente
type SeiteKey = "suchen" | "anlegen";

type NavBarProps = {
  isLoggedIn: boolean;
  onLogin: (email: string, password: string) => void;
  onLogout: () => void;
  onSeiteWechsel: (seite: SeiteKey) => void;
};

export default function NavBar({
  isLoggedIn,
  onLogin,
  onLogout,
  onSeiteWechsel,
}: NavBarProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleAccountIconClick = (event: React.MouseEvent<HTMLElement>) => {
    if (isLoggedIn) {
      setAnchorElUser(event.currentTarget);
    } else {
      setLoginOpen(true);
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutClick = () => {
    handleCloseUserMenu();
    const confirmed = window.confirm("Möchtest du dich wirklich ausloggen?");
    if (confirmed) {
      onLogout();
    }
  };

  const handleLogin = () => {
    onLogin(email, password);
    setLoginOpen(false);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ alignItems: "center" }}>
            {/* Uni-Logo */}
            <img
              src={HkaLogo}
              alt="HKA Logo"
              style={{ marginRight: 8, height: 55, objectFit: "contain" }}
            />
            <Typography variant="h6" noWrap sx={{ mr: 2 }} />

            {/* Zentrales BUCH */}
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

            {/* Burger-Menü */}
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
                        onSeiteWechsel(key);
                        handleCloseNavMenu();
                      }}
                    >
                      <Typography textAlign="center">{label}</Typography>
                    </MenuItem>
                  )
                )}
              </Menu>
            </Box>

            {/* Einheitliches AccountCircle Icon */}
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
      <Dialog open={loginOpen} onClose={() => setLoginOpen(false)}>
        <DialogTitle>Login</DialogTitle>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoginOpen(false)}>Abbrechen</Button>
          <Button onClick={handleLogin} variant="contained">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
