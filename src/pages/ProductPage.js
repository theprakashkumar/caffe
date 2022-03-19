import "./ProductPage.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { AuthContext } from "../contexts/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import PuffLoader from "react-spinners/PuffLoader";
import PropagateLoader from "react-spinners/PropagateLoader";
import Loader from "../components/Loader";

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

    const [addingToCart, setAddingToCart] = useState(false);
    const [addingToWishlist, setAddingToWishlist] = useState(false);

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
            setAddingToCart(true);
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
                setAddingToCart(false);
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
            setAddingToWishlist(true);
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
                setAddingToWishlist(false);
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

    // alert(product.inStock);
    return (
        <div className="product-page-container">
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
                                    {product.ratings} Ratings &{" "}
                                    {product.reviews} Reviews
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
                                    class="btn mt-1 mr-1 product-page__wishlist-button"
                                    onClick={() => {
                                        isUserLogin
                                            ? addToWishlist(product?._id)
                                            : navigate("/login");
                                    }}
                                    disabled={addingToWishlist}
                                >
                                    {addingToWishlist ? (
                                        <div className="product-page__button__animation-container">
                                            <PuffLoader
                                                color={"#0f172a"}
                                                size={35}
                                                speedMultiplier={1.5}
                                            />
                                        </div>
                                    ) : isProductInWishlist ? (
                                        "WISHLISTED"
                                    ) : (
                                        "WISHLIST"
                                    )}
                                </button>

                                <button
                                    class="btn mt-1 product-page__cart-button"
                                    onClick={() => {
                                        isUserLogin
                                            ? addToCartHandler(product?._id)
                                            : navigate("/login");
                                    }}
                                    disabled={addingToCart || !product.inStock}
                                >
                                    {addingToCart ? (
                                        <div className="product-page__button__animation-container">
                                            <PuffLoader
                                                color={"#f8fafc"}
                                                size={35}
                                                speedMultiplier={1.5}
                                            />
                                        </div>
                                    ) : isProductInCart ? (
                                        "GO TO CART"
                                    ) : !product.inStock ? (
                                        "OUT OF STOCK"
                                    ) : (
                                        "ADD TO CART"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="product-page__description mt-6 mb-6">
                        <div className="heading heading--h6">Description</div>
                        <div>{product.description}</div>
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default ProductPage;
