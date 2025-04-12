import { Route, Routes } from "react-router";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Finance from "./pages/Finance";
import Investments from "./pages/Investments";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/personal-finance" element={<Finance />} />
                <Route path="/investments" element={<Investments />} />
            </Routes>
        </QueryClientProvider>
    );
}

export default App;
