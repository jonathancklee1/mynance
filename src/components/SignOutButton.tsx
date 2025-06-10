import { Box, IconButton, Popover, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import useExpenseStore from "../stores/ExpenseStore";
import useInvestmentStore from "../stores/InvestmentStore";
import { useState } from "react";
function SignOutButton() {
    const auth = getAuth();
    const navigate = useNavigate();
    const { resetExpenseStore } = useExpenseStore();
    const { resetInvestmentStore } = useInvestmentStore();
    function handleSignOut() {
        signOut(auth)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            })
            .finally(() => {
                resetExpenseStore();
                resetInvestmentStore();
            });
    }
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Box sx={{ display: "flex", alignItems: "center", overflow: "hidden" }}>
            <IconButton
                aria-label="sign-out"
                color="secondary"
                onClick={handleSignOut}
                aria-owns={open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                <LogoutIcon />
            </IconButton>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: "none",
                    overflow: "visible",
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{ p: 1, pointerEvents: "none" }}>
                    Sign Out
                </Typography>
            </Popover>
        </Box>
    );
}

export default SignOutButton;
