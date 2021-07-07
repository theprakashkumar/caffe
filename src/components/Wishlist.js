import "./Wishlist.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { DataContext } from "../contexts/DataContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { CartContext } from "../contexts/CartContext";
import WishlistCard from "./WishlistCard";

const Wishlist = () => {
    const [loading, setLoading] = useState(true);
    const { userId, token } = useContext(AuthContext);
    const { state, dispatch: wishlistDispatch } = useContext(WishlistContext);
    const { dispatch: cartDispatch } = useContext(CartContext);

    // load data from the server
    const getWishlist = async () => {
        try {
            const response = await axios.get(`/wishlist/${userId}`, {
                headers: {
                    authorization: token,
                },
            });
            if (response.data.success) {
                addToContext(response.data.wishlist.wishlistItems);
                console.log(response.data.wishlist.wishlistItems);
                setLoading(false);
            }
        } catch (error) {
            console.log("Something wrong");
            console.log(error);
        }
    };

    // send the data to context
    const addToContext = (arr) => {
        for (const product of arr) {
            wishlistDispatch({
                type: "ADD_TO_WISHLIST",
                payload: {
                    product: product.product,
                },
            });
        }
    };

    // delete product from the wishlist

    useEffect(() => {
        getWishlist();
    }, []);

    return (
        <div>
            {loading ? (
                <p>loading</p>
            ) : state[0] ? (
                state.map((item) => {
                    return <WishlistCard product={item} />;
                })
            ) : (
                "Your Wishlist is Empty :("
            )}
        </div>
    );
};

export default Wishlist;
