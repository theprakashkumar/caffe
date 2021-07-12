import "./Nav.css"
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { AuthContext } from "../contexts/AuthContext";

const Nav = () => {
    const { state: cartState } = useContext(CartContext);
    const { state: wishlistState } = useContext(WishlistContext);
    const { isUserLogin } = useContext(AuthContext);
    return (
        <div className="nav">
            <Link to="/">
                <div className="nav__brand">
                    Caffè
                </div>
            </Link>
            <Link to="/wishlist">
                <div class="icon-with-badge">
                    <span class="material-icons-outlined icon-with-badge__icon">
                        bookmark_border
                    </span>
                    <span class=" icon-with-badge__text">{wishlistState?.length}</span>
                </div>
            </Link>
            {/* <p>{ isUserLogin.toString() }</p> */}
            <Link to="/cart">
                <div class="icon-with-badge">
                    <span class="material-icons-outlined icon-with-badge__icon">
                        shopping_bag
                    </span>
                    <span class="icon-with-badge__text">{cartState?.length}</span>
                </div>
            </Link>
            <Link to="/login">
            <div class="icon-with-badge">
                <span class="material-icons-outlined icon-with-badge__icon">
                    perm_identity
                </span>
            </div>
            </Link>
        </div>
    );
}

export default Nav;