import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const CartCard = (props) => {
    const { dispatch } = useContext(CartContext);
    const { quantity } = props.product;
    const { image, name, price, mrp, id } = props.product.product;

    return (
        <div className="card-cart">
            <div className="card-cart__image__wrapper">
                <img
                    src={image}
                    className="card-cart__image"
                    alt="Product Image"
                />
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
                        10% off
                    </div>
                </div>

                <div className="card-cart__control__wrapper">
                    <button
                        onClick={() =>
                            dispatch({
                                type: "DECREASE_QUANTITY",
                                payload: { id },
                            })
                        }
                        className="btn card-cart__control__button"
                    >
                        <span className="material-icons-round">remove</span>
                    </button>

                    <div className="cart-cart__control__quantity">
                        {quantity}
                    </div>

                    <button
                        onClick={() =>
                            dispatch({
                                type: "INCREASE_QUANTITY",
                                payload: { id },
                            })
                        }
                        className="btn card-cart__control__button"
                    >
                        <span className="material-icons-round">add</span>
                    </button>
                    <button
                        onClick={() => dispatch({ type: "REMOVE_FROM_CART" })}
                        className="btn card-cart__control__button"
                    >
                        <span className="material-icons-round">delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartCard;
