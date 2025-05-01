import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AppsIcon from "@mui/icons-material/Apps";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Link } from "react-router";
import { useLocation } from "react-router";
import { useTheme } from "@mui/material/styles";

const BottomNav = () => {
    const location = useLocation();
    const theme = useTheme();
    function getNavButtonSx(path: string) {
        const navButtonSx = {
            "&>svg ": {
                fill:
                    location.pathname === `/${path}`
                        ? theme.palette.primary.light + " !important"
                        : theme.palette.text.primary + " !important",
            },
            "& span": {
                color:
                    location.pathname === `/${path}`
                        ? theme.palette.primary.light + " !important"
                        : theme.palette.text.primary + " !important",
            },
        };
        return navButtonSx;
    }

    return (
        <BottomNavigation
            value={location.pathname}
            showLabels
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                width: "100vw",
            }}
        >
            <BottomNavigationAction
                label="Overview"
                value="/dashboard"
                icon={<AppsIcon />}
                component={Link}
                to="/dashboard"
                sx={{
                    ...getNavButtonSx("dashboard"),
                }}
            />
            <BottomNavigationAction
                label="Personal Finance"
                value="/personal-finance"
                icon={<AccountBalanceIcon />}
                component={Link}
                to="/personal-finance"
                sx={{
                    ...getNavButtonSx("personal-finance"),
                }}
            />
            <BottomNavigationAction
                label="Investments"
                value="/investments"
                icon={<AttachMoneyIcon />}
                component={Link}
                to="/investments"
                sx={{
                    ...getNavButtonSx("investments"),
                }}
            />
        </BottomNavigation>
    );
};

export default BottomNav;
