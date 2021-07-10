import axios from "axios";
import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { AuthContext } from "../contexts/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

const ProductPage = (props) => {
    const { data } = useContext(DataContext);
    const { dispatch: cartDispatch } = useContext(CartContext);
    const { dispatch: wishlistDispatch } = useContext(WishlistContext);
    const { isUserLogin, userId, token } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const product = data.find((item) => item._id === id);
    const { _id, image, name, price, discount, originalPrice } = product;

    // add product to the wishlist
    const addToWishlist = async (id) => {
        try {
            const response = await axios.post(
                `/wishlist/${userId}`,
                {
                    _id,
                },
                {
                    headers: {
                        authorization: token,
                    },
                }
            );
            if (response.data.success) {
                console.log(response.data);
                wishlistDispatch({
                    type: "ADD_TO_WISHLIST",
                    payload: {
                        product,
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // add product to cart
    const addToCart = async (id) => {
        try {
            const response = await axios.post(
                `/cart/${userId}`,
                {
                    _id: id,
                },
                {
                    headers: {
                        authorization: token,
                    },
                }
            );
            if (response.data.success) {
                console.log("add to cart");
                cartDispatch({
                    type: "ADD_TO_CART",
                    payload: {
                        product,
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // // remove product from the wishlist
    // const removeFromWishlist = (id) => {
    //     try {
    //         const response = await axios.delete(
    //             `/wishlist/${userId}`,
    //             {
    //                 _id: id,
    //             },
    //             {
    //                 headers: {
    //                     authorization: token,
    //                 },
    //             }
    //         );
    //         if (response.data.success) {
    //             console.log("Deleted Item from Wishlist");
    //             console.log("response.data");
    //             wishlistDispatch({
    //                 type: "REMOVE_FROM_WISHLIST",
    //                 payload: { id: id },
    //             });
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <div className="product-page">
            <div className="product-page__main">
                <div className="product-page__main__right">
                    <img src={image} alt="product-page" />
                </div>
                <div className="product-page__main__left">
                    <div className="product-page__main__left__title">
                        {name}
                    </div>
                    <div className="product-page__main__left__review_wrapper">
                        <div className="product-page__main__left__review_icon_wrapper">
                            <span className="product-page__main__left__review__text"></span>
                            <div className="product--page__main__left__review__icon"></div>
                        </div>
                        <div className="product-page__main__left__review__rating"></div>
                    </div>

                    <div class="product-page__main__left__price__wrapper">
                        <div class="product-page__main__left__price">
                            {"\u20B9"} {price}
                        </div>
                        <strike class="product-page__main__left__price__crossed ml-2">
                            {"\u20B9"} {originalPrice}{" "}
                        </strike>
                        <div class="product-page__main__left__price__discount ml-2">
                            {discount} off
                        </div>
                    </div>

                    {/* <button class="btn mt-1" onClick={() => wishlistDispatch({type: 'ADD_TO_WISHLIST', payload: {id: id}})}>WISHLIST</button> */}

                    <button
                        class="btn mt-1"
                        onClick={() => {
                            isUserLogin
                                ? addToWishlist(_id)
                                : navigate("/login");
                        }}
                    >
                        WISHLIST
                    </button>

                    <button
                        class="btn mt-1"
                        onClick={() => {
                            isUserLogin ? addToCart(_id) : navigate("/login");
                        }}
                    >
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
