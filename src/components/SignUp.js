import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const initialUserDetails = {
    name: "",
    email: "",
    password: "",
};

const SignUp = () => {
    const [userDetails, setUserDetails] = useState(initialUserDetails);
    const { signUp } = useContext(AuthContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        signUp(userDetails);
        setUserDetails(initialUserDetails);
    };

    const handleChange = (e) => {
        setUserDetails((userDetails) => ({
            ...userDetails,
            [e.target.name]: e.target.value,
        }));
    };
    return (
        <div className="signup">
            <form onSubmit={handleSubmit}>
                <div class="input-text-wrapper">
                    <input
                        class="input-text  input-text-full-name"
                        type="text"
                        placeholder="Full Name"
                        name="name"
                        value={userDetails.name}
                        onChange={handleChange}
                    />
                </div>

                <div class="input-text-wrapper">
                    <input
                        class="input-text input-text-email"
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleChange}
                    />
                </div>

                <div class="input-text-wrapper">
                    <input
                        class="input-text input-text-password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={userDetails.password}
                        onChange={handleChange}
                    />
                </div>

                <button class="btn btn--lg">SIGN UP</button>
            </form>
        </div>
    );
};

export default SignUp;
