import "./WishlistCard.css";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { CartContext } from "../contexts/CartContext";

const WishlistCard = (props) => {
    const { userId, token } = useContext(AuthContext);
    const { dispatch: cartDispatch } = useContext(CartContext);
    const { dispatch: wishlistDispatch } = useContext(WishlistContext);
    const { image, name, price, mrp, discount, _id } = props.product.product;

    // remove product from the wishlist
    const removeFromWishlist = async (id) => {
        try {
            const response = await axios.delete(`/wishlist/${userId}`, {
                headers: {
                    authorization: token,
                },
                data: {
                    _id: id,
                },
            });
            if (response.data.success) {
                wishlistDispatch({
                    type: "SYNC_WISHLIST",
                    payload: {
                        product: response.data.updatedWishlist.wishlistItems,
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // move item to cart
    const moveToCart = async (id) => {
        try {
            const response = await axios.put(
                `/wishlist/${userId}`,
                {
                    _id: id,
                },
                {
                    headers: {
                        authorization: token,
                    },
                }
            );
            if (response.data.success) {
                cartDispatch({
                    type: "SYNC_CART",
                    payload: {
                        product: response.data.updatedCart.cartItems,
                    },
                });
                wishlistDispatch({
                    type: "SYNC_WISHLIST",
                    payload: {
                        product: response.data.updatedWishlist.wishlistItems,
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="card-wishlist mb-1">
            <div className="card-wishlist__image__wrapper">
                <img
                    src={image}
                    className="card-wishlist__image"
                    alt="Product"
                />
            </div>
            <div className="card-wishlist__description">
                <div className="card-wishlist__description__title">{name}</div>

                <div className="card-wishlist__price__wrapper">
                    <div className="card-wishlist__price">
                        {"\u20B9"} {price}
                    </div>
                    <strike className="card-wishlist__price__crossed ml-2">
                        {"\u20B9"} {mrp}{" "}
                    </strike>
                    <div className="card-wishlist__price__discount ml-2">
                        {discount} off
                    </div>
                </div>

                <div className="card-wishlist__control__wrapper">
                    <button
                        className="btn btn--icon btn--sm card-wishlist__control__button"
                        onClick={() => removeFromWishlist(_id)}
                    >
                        <span className="material-icons-outlined btn--icon__icon">
                            delete
                        </span>
                        DELETE
                    </button>

                    <button
                        className="btn btn--icon btn--sm card-wishlist__control__button"
                        onClick={() => moveToCart(_id)}
                    >
                        <span className="material-icons-outlined btn--icon__icon">
                            shopping_cart
                        </span>
                        MOVE TO CART
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WishlistCard;
