import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Dosis, Arial, sans-serif",
    color: "#fff",
    h2: { fontSize: "24px", fontWeight: 700 },
    p: {
      fontSize: "14px",
      fontWeight: 700,
      fontFamily: "Dosis, Arial, sans-serif",
    },
    body1: { fontSize: "1.5rem" },
    body2: { fontSize: "1rem", color: "rgb(171, 183, 196)" },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
