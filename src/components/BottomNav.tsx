import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";

function BottomNav() {
    const [tab, setTab] = useState("");
    console.log(tab);
    return (
        <BottomNavigation
            showLabels
            value={tab}
            onChange={(event, newValue) => {
                setTab(newValue);
            }}
            sx={{
                position: "fixed",
                bottom: 0,
                width: "100%",
                backgroundColor: "primary.main",
            }}
        >
            <BottomNavigationAction label="Overview" />
            <BottomNavigationAction label="Personal Finance" />
            <BottomNavigationAction label="Investments" />
        </BottomNavigation>
    );
}

export default BottomNav;
