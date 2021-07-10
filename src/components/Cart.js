import axios from "axios";
import "./Cart.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import CartCard from "./CartCard";

const Cart = () => {
    const [loading, setLoading] = useState(true);
    const { state, dispatch } = useContext(CartContext);
    const { isUserLogin, userId, token } = useContext(AuthContext);

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

    useEffect(() => {
        getCart();
    }, []);
    return (
        <div>
            {loading ? (
                <p>loading</p>
            ) : state[0] ? (
                state.map((item) => {
                    return <CartCard product={item} />;
                })
            ) : (
                "Your Cart Is Empty! 😟"
            )}
        </div>
    );
};

export default Cart;
