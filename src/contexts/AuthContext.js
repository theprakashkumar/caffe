import { createContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import fakeApi from "../api/fakeApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isUserLogin, setLogin] = useState(false);
    const { state } = useLocation();
    const navigate = useNavigate();

    const loginWithCredential = async (username, password ) => {
        if (isUserLogin) {
            setLogin(false);
        } else {
            try {
                const response = await fakeApi(username, password);
                if (response.success) {
                    setLogin(true);
                };
                navigate(state?.from ? state.from : "/");
            } catch (error) {
                console.log("Wrong Password"); 
            }
        }
    }

    const logout = () => {
        setLogin(false);
    }
    return (
        <AuthContext.Provider value={{ isUserLogin, loginWithCredential, logout }}>
            { children }
        </AuthContext.Provider>
    )
};