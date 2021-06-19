import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import fakeApi from "../api/fakeApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { isUserLogin: initialLogin, token: initialToken } = JSON.parse(
        localStorage.getItem("login")
    ) || { isUserLogin: false, token: null };
    const [isUserLogin, setLogin] = useState(initialLogin);
    const [token, setToken] = useState(initialToken);
    const { state } = useLocation();
    const navigate = useNavigate();

    const loginWithCredential = async (email, password) => {
        if (isUserLogin) {
            logout();
        } else {
            try {
                const response = await axios.post(
                    "http://localhost:5000/users/login",
                    {
                        email,
                        password,
                    }
                );
                if (response.data.success) {
                    console.log("Logged In...");
                    setLogin(true);
                    setToken(response.data.token);
                    localStorage?.setItem(
                        "login",
                        JSON.stringify({
                            isUserLogin: true,
                            token: response.data.token,
                        })
                    );
                }
                navigate(state?.from ? state.from : "/");
            } catch (error) {
                console.log("Something Went Wrong!", error);
            }
        }
    };

    const logout = () => {
        console.log("Logged Out!");
        setLogin(false);
        setToken(null);
        localStorage.removeItem("login");
    };

    const signUp = async (userDetails) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/users/signup",
                {
                    ...userDetails,
                }
            );
            if (response.data.success) {
                console.log("New User Created!");
                // ! USER NEED TO BE LOGGED IN HERE!
                navigate("/");
            }
        } catch (error) {
            console.log("Error While Creating New User!", error);
        }
    };
    return (
        <AuthContext.Provider
            value={{ isUserLogin, loginWithCredential, logout, signUp }}
        >
            {children}
        </AuthContext.Provider>
    );
};
