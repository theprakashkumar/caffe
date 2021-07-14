import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { AuthContext } from "../contexts/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

const ProductPage = () => {
    const { state: cartState, dispatch: cartDispatch } =
        useContext(CartContext);
    const { state: wishlistState, dispatch: wishlistDispatch } =
        useContext(WishlistContext);
    const { isUserLogin, userId, token } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    const [isProductInCart, setIsProductInCart] = useState(false);
    const [isProductInWishlist, setIsProductInWishlist] = useState(false);

    // find if item is already in cart or wishlist
    // const inCartOrWishlist = (id) => {
    //     const inCart = cartState.find((item) => item.product?._id === id);
    //     const inWishlist = wishlistState.find(
    //         (item) => item.product?._id === id
    //     );

    //     if (inCart) {
    //         setIsProductInCart(true);
    //     }
    //     if (inWishlist) {
    //         setIsProductInWishlist(true);
    //     }

    //     console.log({isProductInCart})
    //     console.log("product id", id);
    //     // console.log("product id from inCart", inCart.product._id);
    //     console.log({ inCart });
    //     console.log({ inWishlist });
    // };

    const inCart = (id) => {
        const alreadyInCart = cartState.find(
            (item) => item.product?._id === id
        );
        if (alreadyInCart) {
            setIsProductInCart(true);
        }
    };

    const inWishlist = (id) => {
        const alreadyInWishlist = wishlistState.find((item) => item._id === id);
        if (alreadyInWishlist) {
            setIsProductInWishlist(true);
        }
    };

    // add product to cart
    const addToCartHandler = async (id) => {
        if (isProductInCart) {
            return navigate("/cart");
        }
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
                cartDispatch({
                    type: "ADD_TO_CART",
                    payload: {
                        product,
                    },
                });
                setIsProductInCart(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // add product to wishlist
    const addToWishlist = async (id) => {
        if (isProductInWishlist) {
            return navigate("/wishlist");
        }
        try {
            const response = await axios.post(
                `/wishlist/${userId}`,
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

    useEffect(() => {
        // get product from server
        const getProduct = async (id) => {
            try {
                const response = await axios.get(`/products/${id}`);
                if (response.data.success) {
                    setProduct(response.data.product);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getProduct(id);
        console.log("3", isProductInCart);
        inCart(id);
        console.log("4", isProductInCart);
        inWishlist(id);
    }, []);

    useEffect(() => {
        console.log("1", isProductInCart);
        inCart(id);
        console.log("2", isProductInCart);
    }, [cartState]);

    useEffect(() => {
        inWishlist(id);
    }, [wishlistState]);

    return (
        <div>
            {isProductInWishlist.toString()}
            {product ? (
                <div className="product-page">
                    <div className="product-page__main">
                        <div className="product-page__main__right">
                            <img src={product.image} alt="product-page" />
                        </div>
                        <div className="product-page__main__left">
                            <div className="product-page__main__left__title">
                                {product.name}
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
                                    {"\u20B9"} {product.price}
                                </div>
                                <strike class="product-page__main__left__price__crossed ml-2">
                                    {"\u20B9"} {product.originalPrice}{" "}
                                </strike>
                                <div class="product-page__main__left__price__discount ml-2">
                                    {product.discount} off
                                </div>
                            </div>

                            <button
                                class="btn mt-1"
                                onClick={() => {
                                    isUserLogin
                                        ? addToWishlist(product?._id)
                                        : navigate("/login");
                                }}
                            >
                                {isProductInWishlist
                                    ? "WISHLISTED"
                                    : "WISHLIST"}
                            </button>

                            <button
                                class="btn mt-1"
                                onClick={() => {
                                    isUserLogin
                                        ? addToCartHandler(product?._id)
                                        : navigate("/login");
                                }}
                            >
                                {isProductInCart ? "GO TO CART" : "ADD TO CART"}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p></p>
            )}
        </div>
    );
};

export default ProductPage;
