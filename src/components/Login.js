import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";

const Login = () => {
    const { isUserLogin, name, loginWithCredential, logout } =
        useContext(AuthContext);
    const { dispatch: cartDispatch } = useContext(CartContext);
    const { dispatch: wishlistDispatch } = useContext(WishlistContext);
    const [credential, setCredential] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setCredential((credential) => ({
            ...credential,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginWithCredential(credential.email, credential.password);
    };

    const handleLogout = () => {
        cartDispatch({
            type: "RESET_CART",
        });
        wishlistDispatch({
            type: "RESET_WISHLIST",
        });
        logout();
    };
    return (
        <div className="login">
            <p>
                {isUserLogin ? name : "Not Logged In"}
                {credential.email} {credential.password}
            </p>

            {isUserLogin ? (
                <>
                    <p>Hi There!</p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <form onSubmit={handleSubmit}>
                        <div class="input-text-wrapper">
                            <input
                                class="input-text  input-text-email"
                                type="text"
                                placeholder="Email"
                                name="email"
                                value={credential.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div class="input-text-wrapper">
                            <input
                                class="input-text input-text-password"
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={credential.password}
                                onChange={handleChange}
                            />
                        </div>

                        <button class="btn btn--md">Login</button>
                    </form>
                    <Link to="/signup">Don't Have Account Create One!</Link>
                </>
            )}
        </div>
    );
};

export default Login;
