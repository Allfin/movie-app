import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  const menuItems = ["HOME", "CELEBRITIES", "NEWS"];

  const hanlderNav = (menu) => {
    console.log(menu);
  };

  const toggleDrawer = (value) => {
    console.log(value);
  };

  return (
    <Container>
      <AppBar position="static" color="transparent" sx={{ py: "15px" }}>
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Movie App
          </Typography>
          {/* Menu Items */}
          <div>
            {menuItems.map((menu, index) => (
              <Button
                color="inherit"
                key={index}
                onClick={() => hanlderNav(menu)}
              >
                {menu}
              </Button>
            ))}
            {/* Menu for mobile */}
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
