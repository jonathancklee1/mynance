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
            contrastText: "#fff",
        },
        text: {
            primary: "#fff",
            secondary: "#000",
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
