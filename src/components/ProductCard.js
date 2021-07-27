import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { WishlistContext } from "../contexts/WishlistContext";
import { AuthContext } from "../contexts/AuthContext";
import "./ProductCard.css";

const ProductCard = (props) => {
    const { _id, name, image, price, ratings, mrp, discount } = props.details;
    const { isUserLogin, userId, token } = useContext(AuthContext);

    const { state: wishlistState, dispatch: wishlistDispatch } =
        useContext(WishlistContext);

    const [isProductInWishlist, setIsProductInWishlist] = useState(false);

    const navigate = useNavigate();

    const inWishlist = (id) => {
        const alreadyInWishlist = wishlistState.find((item) => item._id === id);
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
                    _id,
                },
            });
            if (response.data.success) {
                wishlistDispatch({
                    type: "SYNC_WISHLIST",
                    payload: {
                        product: response.data.wishlist.wishlistItems,
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
    }, []);

    useEffect(() => {
        inWishlist(_id);
    }, [wishlistState]);

    return (
        <div class="card-product">
            <div class="card-product__image__wrapper">
                <img src={image} alt="product" class="card-product__image" />
                <button class="card-product__icon" onClick={clickHandler}>
                    {isProductInWishlist ? "wished" : "wish"}
                    {/* <span class="material-icons md-36">favorite_border</span> */}
                </button>
            </div>

            <div class="card-product__name">{name}</div>

            <div class="card-product__description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
                accusamus, quo veniam at ipsum
            </div>

            <div class="card-product__rating__wrapper">
                <div class="card-product__rating__icon__wrapper">
                    <span class="card-product__rating__icon__text">
                        {ratings}
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
                    {"\u20B9"} {price}
                </div>
                <strike class="card-product__price__crossed ml-2">
                    {"\u20B9"} {mrp}{" "}
                </strike>
                <div class="card-product__price__discount ml-2">
                    {discount} off
                </div>
            </div>

            <Link to={`/product/${_id}`}>
                <button class="btn mt-1">SHOP NOW</button>
            </Link>
        </div>
    );
};

export default ProductCard;
