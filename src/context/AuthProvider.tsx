import { onAuthStateChanged } from "firebase/auth";
import { SetStateAction, useEffect, useState } from "react";
import { auth } from "../assets/firebase";
import AuthContext from "./AuthContext";

interface AuthProviderProps {
    children: React.ReactNode;
}
function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, () => {
            setCurrentUser(null);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const initUser = async (user: SetStateAction<null>) => {
        console.log("init user", user);
        if (user) {
            setCurrentUser(user);
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    };
    const value = {
        currentUser,
        userLoggedIn,
        loading,
        initUser,
    };
    console.log(currentUser);
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export default AuthProvider;
