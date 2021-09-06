import "./Nav.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";

const Nav = () => {
    const { state: cartState } = useContext(CartContext);
    const { state: wishlistState } = useContext(WishlistContext);
    return (
        <div className="nav">
            <Link className="nav__logo" to="/">
                Caffè
            </Link>
            <div className="nav__menu">
                <Link className="nav__item" to="/wishlist">
                    <div class="icon-with-badge">
                        <span class="material-icons-outlined icon-with-badge__icon">
                            bookmark_border
                        </span>
                        <span class=" icon-with-badge__text">
                            {wishlistState?.length}
                        </span>
                    </div>
                </Link>
                <Link className="nav__item" to="/cart">
                    <div class="icon-with-badge">
                        <span class="material-icons-outlined icon-with-badge__icon">
                            shopping_cart
                        </span>
                        <span class="icon-with-badge__text">
                            {cartState?.length}
                        </span>
                    </div>
                </Link>
                <Link className="nav__item" to="/login">
                    <div class="icon-with-badge">
                        <span class="material-icons-outlined icon-with-badge__icon">
                            perm_identity
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Nav;
