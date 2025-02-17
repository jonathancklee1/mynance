import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AppsIcon from "@mui/icons-material/Apps";
import { useState } from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Link } from "react-router";
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
            <Link to={"/dashboard"}>
                <BottomNavigationAction label="Overview" icon={<AppsIcon />} />
            </Link>
            <Link to={"/personal-finance"}>
                <BottomNavigationAction
                    label="Personal Finance"
                    icon={<AccountBalanceIcon />}
                />
            </Link>
            <Link to={"/investments"}>
                <BottomNavigationAction
                    label="Investments"
                    icon={<AttachMoneyIcon />}
                />
            </Link>
        </BottomNavigation>
    );
}

export default BottomNav;
