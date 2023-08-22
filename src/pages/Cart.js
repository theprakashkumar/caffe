import axios from "axios";
import "./Cart.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import Loader from "../components/Loader";
import CartCard from "../components/CartCard";
import EmptyCart from "../components/EmptyCart";

const Cart = () => {
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const { state, dispatch } = useContext(CartContext);
    const { userId, token } = useContext(AuthContext);

    // get cart data from server
    const getCart = async () => {
        try {
            const response = await axios.get(`/cart/${userId}`, {
                headers: {
                    authorization: token,
                },
            });
            if (response.data.success) {
                dispatch({
                    type: "SYNC_CART",
                    payload: {
                        product: response.data.cart.cartItems,
                    },
                });
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getTotal = () => {
        const total = state.reduce((total, product) => {
            return total + product.product?.price * product.quantity;
        }, 0);
        setTotal(total);
    };

    useEffect(() => {
        getCart();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getTotal();
        // eslint-disable-next-line
    }, [state]);
    return (
        <div>
            {loading ? (
                <Loader />
            ) : state[0] ? (
                <div className="cart">
                    <div className="heading--h5 mb-2 cart__title">Cart</div>
                    <div className="cart__content flex">
                        <div className="cart__content-left ">
                            {state.map((item) => {
                                return (
                                    <CartCard product={item} key={item._id} />
                                );
                            })}
                        </div>
                        <div className="cart__content-right">
                            <div className="cart__content__price">
                                <div className="cart__content-right__subtotal flex flex-justify-sb">
                                    <div>Subtotal</div>
                                    <div>
                                        {"\u20B9"}
                                        {total}
                                    </div>
                                </div>
                                <div className="cart__content-right__shipping flex flex-justify-sb">
                                    <div>Shipping</div>
                                    <div>{"\u20B9"}0</div>
                                </div>
                                <div className="cart__content-right__total flex flex-justify-sb">
                                    <div>Total</div>
                                    <div>
                                        {"\u20B9"}
                                        {total}
                                    </div>
                                </div>
                            </div>
                            <button
                                className="btn btn-lg btn--icon cart__content-right__button mt-1"
                                onClick={() =>
                                    alert("Still Wrorking On This! 🫠")
                                }
                            >
                                Check Out
                                <span className="material-icons-outlined  btn--icon__icon ml-1">
                                    east
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <EmptyCart />
            )}
        </div>
    );
};

export default Cart;
