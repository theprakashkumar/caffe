import "./EmptyWishlist.css";
import { Link } from "react-router-dom";
import emptyWishlist from "../assets/bookmark_add_black_48dp.svg";
const EmptyWishlist = () => {
    return (
        <div className="empty-wishlist flex flex-dir-cl flex-align-center">
            <div className="heading--h5">Wishlist</div>
            <img
                className="empty-wishlist__image"
                src={emptyWishlist}
                alt="Empty Wishlist Logo"
            />
            <div className="heading--h5">I am empty :(</div>
            <div >Your Wishlist is Empty</div>
            <Link className="btn btn--link link" to="/products">
                Go to Catalog
            </Link>
        </div>
    );
};

export default EmptyWishlist;
