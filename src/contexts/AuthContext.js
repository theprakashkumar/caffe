import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext();

const emptyUser = {
    userId: "",
    name: "",
    email: "",
    token: "",
};
export const AuthProvider = ({ children }) => {
    const { isUserLogin: initialLogin, userDetails: initialUserDetails } =
        JSON.parse(localStorage.getItem("login")) || {
            isUserLogin: false,
            userDetails: emptyUser,
        };

    const [isUserLogin, setIsUserLogin] = useState(initialLogin);
    const [userDetails, setUserDetails] = useState(initialUserDetails);
    const { state } = useLocation();
    const navigate = useNavigate();

    const loginWithCredential = async (email, password) => {
        if (isUserLogin) {
            logout();
        } else {
            try {
                const response = await axios.post("/users/login", {
                    email,
                    password,
                });
                if (response.data.success) {
                    setUserDetails({
                        userId: response.data.id,
                        name: response.data.name,
                        email: response.data.email,
                        token: response.data.token,
                    });
                    setIsUserLogin(true);

                    localStorage?.setItem(
                        "login",
                        JSON.stringify({
                            isUserLogin: true,
                            userDetails: {
                                userId: response.data.id,
                                name: response.data.name,
                                email: response.data.email,
                                token: response.data.token,
                            },
                        })
                    );
                    navigate(state?.from ? state.from : "/");
                    return response.data.status;
                }
            } catch (error) {
                console.log("Something Went Wrong While Logging In!", error);
                return error.response.status;
            }
        }
    };

    const logout = () => {
        console.log("Logged Out!");
        setIsUserLogin(false);
        setUserDetails(emptyUser);
        localStorage.removeItem("login");
    };

    const signUp = async (userDetail) => {
        try {
            const response = await axios.post("/users/signup", {
                ...userDetail,
            });
            if (response.data.success) {
                console.log("New User Created!");
                // ! USER NEED TO BE LOGGED IN HERE!
                navigate("/login");
            }
        } catch (error) {
            console.log("Error While Creating New User!", error);
            return error.response.status;
        }
    };
    return (
        <AuthContext.Provider
            value={{
                isUserLogin,
                loginWithCredential,
                userId: userDetails.userId,
                token: userDetails.token,
                name: userDetails.name,
                logout,
                signUp,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
