import "./EmptyCart.css";
import { Link } from "react-router-dom";
import Cart from "../assets/add_shopping_cart_black_48dp.svg";
const EmptyCart = () => {
    return (
        <div className="empty-cart flex flex-dir-cl flex-align-center">
            <div className="heading--h5">Cart</div>
            <img
                className="empty-cart__image mt-2"
                src={Cart}
                alt="Empty Cart Logo"
            />
            <div className="heading--h6">I am empty :(</div>
            <div>Your Cart is Empty</div>
            <Link className="btn btn--link" to="/products">
                Go to Catalog
            </Link>
        </div>
    );
};

export default EmptyCart;

{
    /* <div className="empty-wishlist flex flex-dir-cl flex-align-center">
<div className="heading--h5">Wishlist</div>
<img  className="empty-wishlist__image" src={emptyWishlist} alt="Empty Wishlist Logo" />
<div className="heading--h6">I am empty :(</div>
<div>Your Wishlist is Empty</div>
<Link className="btn btn--link" to="/products">Go to Catalog</Link>
</div> */
}
