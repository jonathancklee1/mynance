import { createContext } from "react";
import { AuthProviderObj } from "../types/interfaces";

const AuthContext = createContext<AuthProviderObj>({
    currentUser: null,
    userLoggedIn: false,
    loading: false,
    initUser: () => {},
});
export default AuthContext;
