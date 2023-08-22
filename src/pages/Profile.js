import "./Profile.css";
import { useContext } from "react";
import Avatar from "../assets/account_circle_black_48dp.svg";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";

const Profile = () => {
    const { name, logout } = useContext(AuthContext);

    const { dispatch: cartDispatch } = useContext(CartContext);
    const { dispatch: wishlistDispatch } = useContext(WishlistContext);

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
        <div className="profile">
            <div className="logged-in-container">
                <img
                    className="logged-in__image mt-2"
                    src={Avatar}
                    alt="Avatar Logo"
                />
                <div className="heading--h6 mt-1 mb-1">Hi {name}!</div>
                <button className="btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
