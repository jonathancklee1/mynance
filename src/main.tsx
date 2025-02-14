import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
const theme = createTheme({
    palette: {
        primary: {
            main: "#0C0637",
            contrastText: "#fff",
        },
        secondary: {
            main: "#3A5491",
            contrastText: "#0C0637",
        },
    },
});
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);
