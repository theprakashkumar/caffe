import "./CartCard.css";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";

const CartCard = (props) => {
    const { userId, token } = useContext(AuthContext);
    const { dispatch } = useContext(CartContext);
    const { _id, quantity } = props.product;
    const {
        image,
        name,
        price,
        discount,
        mrp,
        _id: productId,
    } = props.product.product;

    // delete from the cart
    const removeFromCart = async (id) => {
        try {
            const response = await axios.delete(`/cart/${userId}`, {
                headers: {
                    authorization: token,
                },
                data: {
                    _id: id,
                },
            });
            if (response.data.success) {
                dispatch({
                    type: "SYNC_CART",
                    payload: {
                        product: response.data.updatedCart.cartItems,
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // update cart
    const updateCart = async (id, quantity) => {
        try {
            const response = await axios.put(
                `/cart/${userId}`,
                {
                    _id: id,
                    quantity,
                },
                {
                    headers: {
                        authorization: token,
                    },
                }
            );
            if (response.data.success) {
                dispatch({
                    type: "SYNC_CART",
                    payload: {
                        product: response.data.updatedCart.cartItems,
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="card-cart mb-1">
            <div className="card-cart__image__wrapper">
                <img src={image} className="card-cart__image" alt="Product" />
            </div>

            <div className="card-cart__description">
                <div className="card-cart__description__title">{name}</div>

                <div className="card-cart__price__wrapper">
                    <div className="card-cart__price">
                        {"\u20B9"}
                        {price}
                    </div>
                    <strike className="card-cart__price__crossed ml-2">
                        {"\u20B9"} {mrp}{" "}
                    </strike>
                    <div className="card-cart__price__discount ml-2">
                        {discount} off
                    </div>
                </div>

                <div className="card-cart__control__wrapper">
                    <button
                        onClick={() => updateCart(_id, quantity - 1)}
                        className="btn card-cart__control__button"
                    >
                        <span className="material-icons-round">remove</span>
                    </button>

                    <div className="cart-cart__control__quantity">
                        {quantity}
                    </div>

                    <button
                        onClick={() => updateCart(_id, quantity + 1)}
                        className="btn card-cart__control__button"
                    >
                        <span className="material-icons-round">add</span>
                    </button>
                    <button
                        onClick={() => removeFromCart(productId)}
                        className="btn card-cart__control__button card-cart__control__button-delete"
                    >
                        <span className="material-icons-round card-cart__control__button__icon">
                            delete
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartCard;
