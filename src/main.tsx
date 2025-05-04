import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
const themeVariant = localStorage.getItem("theme") ?? "dark";
const theme1 = createTheme({
    palette: {
        primary: {
            main: "#14213d",
            light: "#FFA500",
            dark: "#48e5c2",
            contrastText: "#48e5c2",
        },
        secondary: {
            main: "#48e5c2",
            light: "#022b3a",
            dark: "#48e5c2",
            contrastText: "#ffffff",
        },
        error: {
            main: "#FF0000",
            light: "#FF0000",
            dark: "#FF0000",
            contrastText: "#ffffff",
        },
        success: {
            main: "#00FF00",
            light: "#00FF00",
            dark: "#00FF00",
            contrastText: "#ffffff",
        },
        background: {
            default: "#14213d",
            paper: "#14213d",
        },
        text: {
            primary: "#48e5c2",
            secondary: "#022b3a",
            disabled: "#48e5c2",
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: "#0C0637",
                    borderRadius: 5,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: "primary.light",
                    borderRadius: 5,
                    fontWeight: "bold",
                },
            },
        },
        MuiBottomNavigation: {
            styleOverrides: {
                root: {
                    textAlign: "center",
                    height: "100px",
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    borderRadius: 26,
                    border: "none",
                    "& .MuiPaper-root": {
                        overflowY: "visible",
                    },
                },
            },
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 769,
            md: 1024,
            lg: 1281,
            xl: 1440,
        },
    },
});
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider theme={themeVariant === "theme1" ? theme1 : theme1}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);
