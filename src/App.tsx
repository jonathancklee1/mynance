import { Route, Routes } from "react-router";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Finance from "./pages/Finance";
import Investments from "./pages/Investments";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/personal-finance" element={<Finance />} />
            <Route path="/investments" element={<Investments />} />
        </Routes>
    );
}

export default App;
