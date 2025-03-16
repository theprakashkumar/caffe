import "./ProductCard.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { WishlistContext } from "../contexts/WishlistContext";
import { AuthContext } from "../contexts/AuthContext";
import "./ProductCard.css";

const ProductCard = (props) => {
    const {
        _id,
        name,
        image,
        price,
        rating,
        mrp,
        discount,
        tastingNodes,
        category,
        ratings,
        reviews,
    } = props.details;
    const { isUserLogin, userId, token } = useContext(AuthContext);

    const { state: wishlistState, dispatch: wishlistDispatch } =
        useContext(WishlistContext);

    const [isProductInWishlist, setIsProductInWishlist] = useState(false);

    const navigate = useNavigate();

    const inWishlist = (id) => {
        const alreadyInWishlist = wishlistState?.find(
            (item) => item.product._id === id
        );
        if (alreadyInWishlist) {
            setIsProductInWishlist(true);
        }
    };

    // add product to wishlist
    const addToWishlist = async (id) => {
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
                    type: "SYNC_WISHLIST",
                    payload: {
                        product: response.data.updatedWishlist.wishlistItems,
                    },
                });
                setIsProductInWishlist(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // remove product from the wishlist
    const removeFromWishlist = async (id) => {
        try {
            const response = await axios.delete(`/wishlist/${userId}`, {
                headers: {
                    authorization: token,
                },
                data: {
                    _id: id,
                },
            });
            if (response.data.success) {
                wishlistDispatch({
                    type: "SYNC_WISHLIST",
                    payload: {
                        product: response.data.updatedWishlist.wishlistItems,
                    },
                });
            }
            setIsProductInWishlist(false);
        } catch (error) {
            console.log(error);
        }
    };

    const clickHandler = () => {
        if (isUserLogin) {
            !isProductInWishlist ? addToWishlist(_id) : removeFromWishlist(_id);
        } else {
            navigate("/login", { state: { from: "/products" } });
        }
    };

    useEffect(() => {
        inWishlist(_id);
        // eslint-disable-next-line
    }, [wishlistState]);

    return (
        <div className="card-product">
            <div className="card-product__image__wrapper">
                <img
                    src={image}
                    alt="product"
                    className="card-product__image product-card-image"
                />
                <button className="card-product__icon" onClick={clickHandler}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 20 24"
                        fill={isProductInWishlist ? "#f87171" : "#94a3b8"}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"></path>
                    </svg>
                </button>
            </div>

            <div className="card-product__name">{name}</div>

            <div className="card-product__description">
                {tastingNodes} | {category}
            </div>

            <div className="card-product__rating__wrapper">
                <div className="card-product__rating__icon__wrapper">
                    <span className="card-product__rating__icon__text">
                        {rating}
                    </span>
                    <span className="material-icons-outlined card-product__rating__icon">
                        star
                    </span>
                </div>
                <span className="card-product__rating__reviews">
                    {ratings} Ratings & {reviews} Reviews
                </span>
            </div>

            <div className="card-product__price__wrapper">
                <div className="card-product__price">
                    {"\u20B9"} {price}
                </div>
                <strike className="card-product__price__crossed ml-2">
                    {"\u20B9"} {mrp}{" "}
                </strike>
                <div className="card-product__price__discount ml-2">
                    {discount} off
                </div>
            </div>

            <Link to={`/product/${_id}`}>
                <button className="btn mt-1">SHOP NOW</button>
            </Link>
        </div>
    );
};

export default ProductCard;
