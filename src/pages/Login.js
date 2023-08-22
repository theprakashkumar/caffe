import "./Login.css";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const { isUserLogin, loginWithCredential } = useContext(AuthContext);

    const [credential, setCredential] = useState({ email: "", password: "" });

    const navigate = useNavigate();
    const { state } = useLocation();

    const handleChange = (e) => {
        setCredential((credential) => ({
            ...credential,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(credential.email)) {
            return toast.error("Please enter a valid email address", {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }

        const loginStatus = await loginWithCredential(
            credential.email,
            credential.password
        );

        if (loginStatus === 403) {
            toast.error("Wrong Password!", {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        } else if (loginStatus === 401) {
            toast.error("User Not Found!", {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    };

    const guestLogin = async () => {
        await loginWithCredential("guest@gmail.com", "guest");
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        if (isUserLogin) {
            navigate(state?.from ? state.from : "/");
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className="login">
            <>
                <div className="login-from-container">
                    <div className="heading heading--h4 login-heading">
                        Welcome Back!
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="input-text-wrapper mb-1">
                            <input
                                className="input-text  input-text-email"
                                type="text"
                                placeholder="Email"
                                name="email"
                                value={credential.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-text-wrapper">
                            <input
                                className="input-text input-text-password"
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={credential.password}
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            className="btn btn--md login-btn login-btn-dark mt-1 mb-1"
                            disabled={!credential.email || !credential.password}
                        >
                            Login
                        </button>
                    </form>

                    <button
                        onClick={guestLogin}
                        className="btn btn--md login-btn mb-1"
                    >
                        Login as Guest
                    </button>

                    <Link
                        className="btn btn--link login-btn-link mt-1"
                        to="/signup"
                    >
                        Don't Have Account Create One!
                    </Link>
                </div>
            </>

            <ToastContainer
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
            />
        </div>
    );
};

export default Login;
