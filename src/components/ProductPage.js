import { useContext } from "react";
import { CartContext } from '../contexts/CartContext';
import { WishlistContext }  from '../contexts/WishlistContext'; 
import { AuthContext } from "../contexts/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { data } from "../data";

const ProductPage = (props) => {
    const { dispatch: cartDispatch } = useContext(CartContext);
    const { dispatch: wishlistDispatch } = useContext(WishlistContext);
    const { isUserLogin } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const product = data.find(item => item.id === id);
    const { image, name, price, discount, originalPrice } = product;
    // console.log(product);
    return(
        <div className="product-page">
            <div className="product-page__main">
                <div className="product-page__main__right">
                    <img src={image} alt="product-page"/>
                </div>
                <div className="product-page__main__left">
                    <div className="product-page__main__left__title">
                        { name }
                    </div>
                    <div className="product-page__main__left__review_wrapper">
                        <div className="product-page__main__left__review_icon_wrapper">
                            <span className="product-page__main__left__review__text"></span>
                            <div className="product--page__main__left__review__icon"></div>
                        </div>
                        <div className="product-page__main__left__review__rating">

                        </div>
                    </div>
                    
                    <div class="product-page__main__left__price__wrapper">
                        <div class="product-page__main__left__price">{'\u20B9'} { price }</div>
                        <strike class="product-page__main__left__price__crossed ml-2">{'\u20B9'} { originalPrice } </strike>
                        <div class="product-page__main__left__price__discount ml-2">{ discount } off</div>
                    </div>

                {/* <button class="btn mt-1" onClick={() => wishlistDispatch({type: 'ADD_TO_WISHLIST', payload: {id: id}})}>WISHLIST</button> */}

                 <button class="btn mt-1" onClick={() => {
                     isUserLogin 
                     ? wishlistDispatch({type: 'ADD_TO_WISHLIST', payload: {id: id}})
                     : navigate("/login")
                }}>WISHLIST</button>

                <button class="btn mt-1" onClick={() => {
                    isUserLogin
                    ? cartDispatch({ type: 'ADD_TO_CART', payload: { id: id}})
                    : navigate("/login")
                }}>ADD TO CART</button>
                
                </div>
            </div>
        </div>
    )
}

export default ProductPage;