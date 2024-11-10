import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Dosis, Arial, sans-serif",
    lineHeight: 1.5,
    color: "#fff",
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
