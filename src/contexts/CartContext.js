import { createContext, useContext, useEffect, useReducer } from "react";
import cartReducer from "../reducers/CartReducer";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const initialState = [];
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const { isUserLogin, token, userId } = useContext(AuthContext);

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
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isUserLogin) {
            getCart();
        }
    }, [isUserLogin]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};
