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
        background: {
            default: "#14213d",
            paper: "#14213d",
        },
        text: {
            primary: "#48e5c2",
            secondary: "#022b3a",
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    color: "#fff",
                    backgroundColor: "#0C0637",
                    borderRadius: 5,
                    "& .css-17est1k-MuiFormLabel-root-MuiInputLabel-root": {
                        color: "#FFF",
                    },
                    "& .css-17est1k-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                        {
                            color: "#FFF",
                        },
                    "& .css-tsjiwq-MuiFormLabel-root-MuiInputLabel-root": {
                        color: "#FFF",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: "#fff",
                    backgroundColor: "primary.light",
                    borderRadius: 5,
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
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);
