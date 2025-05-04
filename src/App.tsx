import { Route, Routes } from "react-router";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Finance from "./pages/Finance";
import Investments from "./pages/Investments";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, ThemeProvider } from "@mui/material";
import useThemeStore from "./stores/ThemeStore";

function App() {
    const { theme } = useThemeStore();

    const breakpointOverrides = {
        values: {
            xs: 0,
            sm: 769,
            md: 1024,
            lg: 1281,
            xl: 1440,
        },
    };

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
                primary: "#022b3a",
                secondary: "#022b3a",
                disabled: "#48e5c2",
            },
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        borderRadius: 5,
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
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
        breakpoints: breakpointOverrides,
    });
    const theme2 = createTheme({
        palette: {
            primary: {
                main: "#e1e5f2",
                light: "#ff595e",
                dark: "#04052e",
                contrastText: "#04052e",
            },
            secondary: {
                main: "#ff595e",
                light: "#ffffff",
                dark: "#ff595e",
                contrastText: "#ffffff",
            },
            error: {
                main: "#FF0000",
                light: "#FF0000",
                dark: "#FF0000",
                contrastText: "#ffffff",
            },
            success: {
                main: "#00a878",
                light: "#00a878",
                dark: "#00a878",
                contrastText: "#ffffff",
            },
            background: {
                default: "#ffffff",
                paper: "#e1e5f2",
            },
            text: {
                primary: "#04052e",
                secondary: "#022b3a",
                disabled: "#04052e",
            },
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        borderRadius: 5,
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
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
        breakpoints: breakpointOverrides,
    });
    const theme3 = createTheme({
        palette: {
            primary: {
                main: "#3d348b",
                light: "#7dcfb6",
                dark: "#04052e",
                contrastText: "#ffffff",
            },
            secondary: {
                main: "#7dcfb6",
                light: "#858ae3",
                dark: "#7dcfb6",
                contrastText: "#ffffff",
            },
            error: {
                main: "#FF0000",
                light: "#FF0000",
                dark: "#FF0000",
                contrastText: "#ffffff",
            },
            success: {
                main: "#00a878",
                light: "#00a878",
                dark: "#00a878",
                contrastText: "#ffffff",
            },
            background: {
                default: "#858ae3",
                paper: "#3d348b",
            },
            text: {
                primary: "#ffffff",
                secondary: "#ffffff",
            },
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        borderRadius: 5,
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
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
        breakpoints: breakpointOverrides,
    });
    const queryClient = new QueryClient();

    return (
        <ThemeProvider
            theme={
                theme === "theme1"
                    ? theme1
                    : theme === "theme2"
                    ? theme2
                    : theme3
            }
        >
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/personal-finance" element={<Finance />} />
                    <Route path="/investments" element={<Investments />} />
                </Routes>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
