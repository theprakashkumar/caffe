import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import fakeApi from "../api/fakeApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isUserLogin, setLogin] = useState(false);
    const { state } = useLocation();
    const navigate = useNavigate();

    const loginWithCredential = async (username, password) => {
        if (isUserLogin) {
            setLogin(false);
        } else {
            try {
                const response = await fakeApi(username, password);
                if (response.success) {
                    setLogin(true);
                }
                navigate(state?.from ? state.from : "/");
            } catch (error) {
                console.log("Wrong Password");
            }
        }
    };

    const logout = () => {
        setLogin(false);
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
