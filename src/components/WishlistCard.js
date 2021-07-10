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
                    _id,
                },
            });
            if (response.data.success) {
                console.log("Item Deleted From the server!");
                wishlistDispatch({
                    type: "REMOVE_FROM_WISHLIST",
                    payload: { _id },
                });
                // Delete item form the context
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div class="card-wishlist">
            <div class="card-wishlist__image__wrapper">
                <img
                    src={image}
                    class="card-wishlist__image"
                    alt="Product Image"
                />
            </div>
            <div class="card-wishlist__description">
                <div class="card-wishlist__description__title">{name}</div>

                <div class="card-wishlist__price__wrapper">
                    <div class="card-wishlist__price">
                        {"\u20B9"} {price}
                    </div>
                    <strike class="card-wishlist__price__crossed ml-2">
                        {"\u20B9"} {mrp}{" "}
                    </strike>
                    <div class="card-wishlist__price__discount ml-2">
                        {discount} off
                    </div>
                </div>

                <div class="card-wishlist__control__wrapper">
                    <button
                        class="btn btn--icon btn--sm card-wishlist__control__button"
                        onClick={() => removeFromWishlist(_id)}
                    >
                        <span class="material-icons-outlined btn--icon__icon">
                            delete
                        </span>
                        DELETE
                    </button>

                    <button
                        class="btn btn--icon btn--sm card-wishlist__control__button"
                        onClick={() => {
                            cartDispatch({
                                type: "ADD_TO_CART",
                                payload: { id: _id },
                            });
                            wishlistDispatch({
                                type: "REMOVE_FROM_WISHLIST",
                                payload: { id: _id },
                            });
                        }}
                    >
                        <span class="material-icons-outlined btn--icon__icon">
                            shopping_bag
                        </span>
                        MOVE TO BAG
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WishlistCard;