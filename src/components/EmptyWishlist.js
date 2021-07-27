import "./EmptyWishlist.css";
import { Link } from "react-router-dom";
import emptyWishlist from "../assets/bookmark_add_black_48dp.svg";
const EmptyWishlist = () => {
    return (
        <div>
            <h1>Wishlist</h1>
            <img src={emptyWishlist} alt="React Logo" />
            <h2>I am empty :(</h2>
            <h4>Your Wishlist is Empty</h4>
            <Link to="/products">Go to Catalog</Link>
        </div>
    );
};

export default EmptyWishlist;
