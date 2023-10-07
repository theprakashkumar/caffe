import "./Profile.css";
import { useContext, useState } from "react";
import Avatar from "../assets/account_circle_black_48dp.svg";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";
import Orders from "../components/Orders";
import AddressContainer from "../components/AddressContainer";

const Profile = () => {
    const { name, logout } = useContext(AuthContext);

    const { dispatch: cartDispatch } = useContext(CartContext);
    const { dispatch: wishlistDispatch } = useContext(WishlistContext);

    const [currentActive, setCurrentActive] = useState("orders");

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
            <div className="logged-in-container mb-2">
                <img
                    className="logged-in__image mt-2"
                    src={Avatar}
                    alt="Avatar Logo"
                />
                <div className="heading--h6 mt-1 mb-1">Hi {name}!</div>
                <button className="btn btn-sm" onClick={handleLogout}>
                    Logout
                </button>

                {/* order and address button */}
                <div className="profile-button-container">
                    <button
                        onClick={() => setCurrentActive("orders")}
                        style={{
                            borderRight: "none",
                            background: currentActive === "orders" && "#0f172a",
                            color: currentActive === "orders" && "#fff",
                        }}
                    >
                        Orders
                    </button>
                    <button
                        onClick={() => setCurrentActive("address")}
                        style={{
                            borderLeft: "none",
                            background:
                                currentActive === "address" && "#0f172a",
                            color: currentActive === "address" && "#fff",
                        }}
                    >
                        Address
                    </button>
                </div>

                {currentActive === "orders" ? (
                    <Orders />
                ) : (
                    <AddressContainer isCheckout={false} />
                )}
            </div>
        </div>
    );
};

export default Profile;
