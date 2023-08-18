import "./Wishlist.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { WishlistContext } from "../contexts/WishlistContext";
import Loader from "../components/Loader";
import WishlistCard from "../components/WishlistCard";
import EmptyWishlist from "../components/EmptyWishlist";

const Wishlist = () => {
    const [loading, setLoading] = useState(true);
    const { userId, token } = useContext(AuthContext);
    const { state, dispatch: wishlistDispatch } = useContext(WishlistContext);

    // load data from the server
    const getWishlist = async () => {
        try {
            const response = await axios.get(`/wishlist/${userId}`, {
                headers: {
                    authorization: token,
                },
            });
            if (response.data.success) {
                wishlistDispatch({
                    type: "SYNC_WISHLIST",
                    payload: {
                        product: response.data.wishlist.wishlistItems,
                    },
                });
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // delete product from the wishlist

    useEffect(() => {
        getWishlist();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            {loading ? (
                <Loader />
            ) : state[0] ? (
                <div className="wishlist flex flex-dir-cl flex-align-center">
                    <div className="heading--h5 mb-2">Wishlist</div>
                    {state.map((item) => {
                        return <WishlistCard product={item} key={item._id} />;
                    })}
                </div>
            ) : (
                <EmptyWishlist />
            )}
        </div>
    );
};

export default Wishlist;
