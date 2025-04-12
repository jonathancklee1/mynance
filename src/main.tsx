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
            light: "#1B2F7A",
            dark: "#1B2F7A",
            contrastText: "#fff",
        },
        secondary: {
            main: "#3A5491",
            light: "#3A5491",
            dark: "#3A5491",
            contrastText: "#fff",
        },
        background: {
            default: "#0C0637",
            paper: "#0C0637",
        },
        text: {
            primary: "#fff",
            secondary: "#fff",
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
                    backgroundColor: "#3A5491",
                    borderRadius: 5,
                },
            },
        },
        MuiBottomNavigation: {
            styleOverrides: {
                root: {
                    "& .css-1kcvi62-MuiBottomNavigationAction-label.Mui-selected":
                        {
                            color: "#fff",
                        },
                    "& .css-1umw9bq-MuiSvgIcon-root": {
                        fill: "#fff",
                    },
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
