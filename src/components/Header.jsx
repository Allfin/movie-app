import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as LinkRouter } from "react-router-dom";
import Button from "@mui/material/Button";
import { Container, IconButton, useScrollTrigger } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  const menuItems = ["HOME", "CELEBRITIES", "NEWS"];

  const hanlderNav = (menu) => {
    console.log(menu);
  };

  const toggleDrawer = (value) => {
    console.log(value);
  };

  const scroolTrigger = useScrollTrigger({
    disableHysteresis: true, // Menghindari lag dalam mendeteksi perubahan scroll
    threshold: 50, // Ganti warna setelah scroll lebih dari 50px
  });

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: scroolTrigger ? "#0F2133" : "transparent",
        transition: "background-color 0.2s ease",
      }}
    >
      <Container>
        <Toolbar
          sx={{
            "@media (min-width: 0px)": { paddingRight: 0, paddingLeft: 0 },
          }}
        >
          {/* Logo */}
          <Typography
            component={LinkRouter}
            to="/"
            variant="body1"
            sx={{ flexGrow: 1, fontStyle: "none" }}
          >
            Movie App
          </Typography>
          {/* Menu Items */}
          <div>
            {menuItems.map((menu, index) => (
              <Button
                component={LinkRouter}
                to={`/${menu}`}
                color="inherit"
                key={index}
                onClick={() => hanlderNav(menu)}
              >
                <Typography
                  variant="body2"
                  sx={{
                    ":hover": {
                      color: "#fff",
                    },
                  }}
                >
                  {menu}
                </Typography>
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
      </Container>
    </AppBar>
  );
}
