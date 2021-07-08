import axios from "axios";
import "./Cart.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import CartCard from "./CartCard";

// const foundProduct = (id) => {
//    return data.find(item => item.id === id)
// }

const Cart = () => {
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
                addToCart(response.data.cart.cartItems);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // send data to server
    const addToCart = (arr) => {
        for (const product of arr) {
            dispatch({
                type: "ADD_TO_CART",
                payload: {
                    product,
                },
            });
        }
    };

    useEffect(() => {
        getCart();
    }, []);
    return (
        <div>
            {state[0]
                ? state.map((item) => {
                      // let product = foundProduct(item.id);
                      return <CartCard product={item} />;
                  })
                : "Your Cart Is Empty! 😟"}
        </div>
    );
};

export default Cart;
