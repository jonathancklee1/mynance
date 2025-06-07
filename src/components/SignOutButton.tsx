import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
function SignOutButton() {
    const auth = getAuth();
    const navigate = useNavigate();
    function handleSignOut() {
        signOut(auth)
            .then(() => {
                console.log("User signed out successfully");
                navigate("/");
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    }

    return (
        <IconButton
            aria-label="sign-out"
            color="secondary"
            onClick={handleSignOut}
        >
            <LogoutIcon />
        </IconButton>
    );
}

export default SignOutButton;
