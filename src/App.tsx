import { Route, Routes } from "react-router";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Finance from "./pages/Finance";
import Investments from "./pages/Investments";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import useThemeStore from "./stores/ThemeStore";
import AuthProvider from "./context/AuthProvider";
import { theme1, theme2, theme3 } from "./theme/themes";

function App() {
    const { theme } = useThemeStore();

    const queryClient = new QueryClient();

    return (
        <AuthProvider>
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
        </AuthProvider>
    );
}

export default App;
