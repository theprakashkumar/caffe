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

    const [isUserLogin, setLogin] = useState(initialLogin);
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
                    console.log({ ...response.data });
                    console.log(response.data.name);
                    setLogin(true);
                    setUserDetails({
                        userId: response.data.id,
                        name: response.data.name,
                        email: response.data.email,
                        token: response.data.token,
                    });
                    console.log("use", userDetails.userId);
                    console.log("use", userDetails);
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
        setUserDetails(emptyUser);
        localStorage.removeItem("login");
    };

    const signUp = async (userDetail) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/users/signup",
                {
                    ...userDetail,
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
