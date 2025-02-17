import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AppsIcon from "@mui/icons-material/Apps";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Link } from "react-router";
import { useLocation } from "react-router";

const BottomNav = () => {
    const location = useLocation();

    return (
        <BottomNavigation
            value={location.pathname}
            showLabels
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1,
                backgroundColor: "primary.main",
            }}
        >
            <BottomNavigationAction
                label="Overview"
                value="/dashboard"
                icon={<AppsIcon />}
                component={Link}
                to="/dashboard"
            />
            <BottomNavigationAction
                label="Personal Finance"
                value="/personal-finance"
                icon={<AccountBalanceIcon />}
                component={Link}
                to="/personal-finance"
            />
            <BottomNavigationAction
                label="Investments"
                value="/investments"
                icon={<AttachMoneyIcon />}
                component={Link}
                to="/investments"
            />
        </BottomNavigation>
    );
};

export default BottomNav;
