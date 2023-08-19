import "./SignUp.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const initialUserDetails = {
    name: "",
    email: "",
    password: "",
};

const SignUp = () => {
    const [userDetails, setUserDetails] = useState(initialUserDetails);
    const { signUp } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(userDetails.email)) {
            return toast.error("Please enter a valid email address", {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }

        if (userDetails.password.length < 8) {
            return toast.error("Password must be of least 8 character!", {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
        const signUpStatus = await signUp(userDetails);
        console.log(signUpStatus);
        if (signUpStatus === 409) {
            toast.error("User Already Exits!", {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        } else if (signUpStatus === 200) {
            toast.success("User Created!", {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    };

    const handleChange = (e) => {
        setUserDetails((userDetails) => ({
            ...userDetails,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);
    return (
        <div className="signup">
            <div className="sign-up-from-container">
                <div className="heading heading--h4 sign-up-heading">
                    Create Account!
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-text-wrapper mb-1">
                        <input
                            className="input-text  input-text-full-name"
                            type="text"
                            placeholder="Full Name"
                            name="name"
                            value={userDetails.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-text-wrapper mb-1">
                        <input
                            className="input-text input-text-email"
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-text-wrapper">
                        <input
                            className="input-text input-text-password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={userDetails.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        className="btn btn--lg sign-up-btn mt-1 mb-1"
                        disabled={
                            !userDetails.name ||
                            !userDetails.email ||
                            !userDetails.password
                        }
                    >
                        SIGN UP
                    </button>
                    <Link
                        className="btn btn--link signup-btn-link mt-1"
                        to="/login"
                    >
                        Login Instead?
                    </Link>
                </form>
            </div>
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

export default SignUp;
