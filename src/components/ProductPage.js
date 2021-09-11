import "./ProductPage.css";
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
        inCart(id);
        inWishlist(id);
    }, []);

    useEffect(() => {
        inCart(id);
    }, [cartState]);

    useEffect(() => {
        inWishlist(id);
    }, [wishlistState]);

    return (
        <div>
            {product ? (
                <div className="product-page">
                    <div className="product-page__main mt-3">
                        <div className="product-page__main__right">
                            <img
                                src={product.image}
                                className="product-page__main__right__image"
                                alt="product-image"
                            />
                        </div>
                        <div className="product-page__main__left">
                            <div className="product-page__main__left__title heading heading--h3">
                                {product.name}
                            </div>
                            <div class="card-product__rating__wrapper">
                                <div class="card-product__rating__icon__wrapper">
                                    <span class="card-product__rating__icon__text">
                                        {product.rating}
                                    </span>
                                    <span class="material-icons-outlined card-product__rating__icon">
                                        star
                                    </span>
                                </div>
                                <span class="card-product__rating__reviews">
                                    342 Ratings & 29 Reviews
                                </span>
                            </div>
                            <div class="card-product__price__wrapper">
                                <div class="card-product__price">
                                    {"\u20B9"} {product.price}
                                </div>
                                <strike class="card-product__price__crossed ml-2">
                                    {"\u20B9"} {product.mrp}
                                </strike>
                                <div class="card-product__price__discount ml-2">
                                    {product.discount} off
                                </div>
                            </div>
                            <div className="product-page__main__left__review_wrapper">
                                <div className="product-page__main__left__review_icon_wrapper">
                                    <span className="product-page__main__left__review__text"></span>
                                    <div className="product--page__main__left__review__icon"></div>
                                </div>
                                <div className="product-page__main__left__review__rating"></div>
                            </div>

                            <div class="card-product__description mt-1 mb-1">
                                Tasting Nodes: {product.tastingNodes}
                                <br />
                                Roast: {product.category}
                            </div>

                            <div className="product-page__button-container">
                                <button
                                    class="btn mt-1 mr-1"
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
                                    class="btn mt-1 product-page__cart-button"
                                    onClick={() => {
                                        isUserLogin
                                            ? addToCartHandler(product?._id)
                                            : navigate("/login");
                                    }}
                                >
                                    {isProductInCart
                                        ? "GO TO CART"
                                        : "ADD TO CART"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="product-page__description mt-6">
                        <div className="heading heading--h6">Description</div>
                        <div>{product.description}</div>
                    </div>
                </div>
            ) : (
                <p>loading</p>
            )}
        </div>
    );
};

export default ProductPage;
