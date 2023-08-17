import { useEffect, createContext, useContext, useReducer } from "react";
import wishlistReducer from "../reducers/WishlistReducer";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const initialState = [];
    const [state, dispatch] = useReducer(wishlistReducer, initialState);
    const { isUserLogin, token, userId } = useContext(AuthContext);

    const getWishlist = async () => {
        try {
            const response = await axios.get(`/wishlist/${userId}`, {
                headers: {
                    authorization: token,
                },
            });
            if (response.data.success) {
                dispatch({
                    type: "SYNC_WISHLIST",
                    payload: {
                        product: response.data.wishlist.wishlistItems,
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isUserLogin) {
            getWishlist();
        }
    }, [isUserLogin]);

    return (
        <WishlistContext.Provider value={{ state, dispatch }}>
            {children}
        </WishlistContext.Provider>
    );
};
