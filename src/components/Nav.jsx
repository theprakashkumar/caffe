import "./Nav.css";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { AuthContext } from "../contexts/AuthContext";

const Nav = () => {
    const { isUserLogin } = useContext(AuthContext);
    const { state: cartState } = useContext(CartContext);
    const { state: wishlistState } = useContext(WishlistContext);
    return (
        <div className="navbar">
            <Link className="navbar__logo" to="/">
                Caffè
            </Link>
            {isUserLogin ? (
                <div className="navbar__menu">
                    <NavLink
                        activeClassName="navbar__item-active"
                        className="navbar__item"
                        to="/wishlist"
                    >
                        <div className="icon-with-badge">
                            <span className="material-icons-outlined icon-with-badge__icon">
                                bookmark_border
                            </span>
                            <span className=" icon-with-badge__text">
                                {wishlistState?.length}
                            </span>
                        </div>
                    </NavLink>
                    <NavLink
                        activeClassName="navbar__item-active"
                        className="navbar__item"
                        to="/cart"
                    >
                        <div className="icon-with-badge">
                            <span className="material-icons-outlined icon-with-badge__icon">
                                shopping_cart
                            </span>
                            <span className="icon-with-badge__text">
                                {cartState?.length}
                            </span>
                        </div>
                    </NavLink>
                    <NavLink
                        activeClassName="navbar__item-active"
                        className="navbar__item"
                        to="/profile"
                    >
                        <div className="icon-with-badge">
                            <span className="material-icons-outlined icon-with-badge__icon">
                                perm_identity
                            </span>
                        </div>
                    </NavLink>
                </div>
            ) : (
                <Link className="navbar__link" to="/login">
                    Login
                </Link>
            )}
        </div>
    );
};

export default Nav;
