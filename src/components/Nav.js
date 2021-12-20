import "./Nav.css";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";

const Nav = () => {
    const { state: cartState } = useContext(CartContext);
    const { state: wishlistState } = useContext(WishlistContext);
    return (
        <div className="navbar">
            <Link className="navbar__logo" to="/">
                Caffè
            </Link>
            <div className="navbar__menu">
                <NavLink
                    activeClassName="navbar__item-active"
                    className="navbar__item"
                    to="/wishlist"
                >
                    <div class="icon-with-badge">
                        <span class="material-icons-outlined icon-with-badge__icon">
                            bookmark_border
                        </span>
                        <span class=" icon-with-badge__text">
                            {wishlistState?.length}
                        </span>
                    </div>
                </NavLink>
                <NavLink
                    activeClassName="navbar__item-active"
                    className="navbar__item"
                    to="/cart"
                >
                    <div class="icon-with-badge">
                        <span class="material-icons-outlined icon-with-badge__icon">
                            shopping_cart
                        </span>
                        <span class="icon-with-badge__text">
                            {cartState?.length}
                        </span>
                    </div>
                </NavLink>
                <NavLink
                    activeClassName="navbar__item-active"
                    className="navbar__item"
                    to="/login"
                >
                    <div class="icon-with-badge">
                        <span class="material-icons-outlined icon-with-badge__icon">
                            perm_identity
                        </span>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default Nav;
