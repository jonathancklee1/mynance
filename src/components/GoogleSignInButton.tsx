import { Button, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../assets/firebase";
import { useNavigate } from "react-router";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { AuthProviderObj } from "../types/interfaces";

function GoogleSignInButton() {
    const navigate = useNavigate();
    const context = useContext<AuthProviderObj>(AuthContext);

    function googleLogin() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                if (result.user) {
                    console.log(result.user);
                    context.initUser(result.user);
                    context.userLoggedIn = true;
                }
            })
            .then(() => navigate("/dashboard", { replace: true }));
    }
    return (
        <Button
            variant="contained"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                fontWeight: "bold",
                px: 4,
                py: 2,
                fontSize: "1.1rem",
                background: " #FFFFFF",
                borderRadius: 2,
                color: "primary.light",
                transition: "all .3s ease-in-out",
                "&:hover": {
                    backgroundColor: "primary.light",
                    color: "text.secondary",
                },
            }}
            onClick={googleLogin}
        >
            <Google />
            <Typography fontWeight={"bold"}>Sign in with Google</Typography>
        </Button>
    );
}

export default GoogleSignInButton;
