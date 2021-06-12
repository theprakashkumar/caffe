import "./Wishlist.css";
import { useContext, useReducer } from "react";
import { WishlistContext } from "../contexts/WishlistContext";
import { CartContext } from "../contexts/CartContext";
import { data } from "../data";

const foundProduct = (id) => {
    return data.find(item => item.id === id)
}
const Wishlist = () => {
    const { state, dispatch: wishlistDispatch } = useContext(WishlistContext);
    const { dispatch: cartDispatch } = useContext(CartContext);
    return ( 
        <div>
            { state[0] ? 
                state.map(item => {
                    let product = foundProduct(item.id);
                    return (
                        <div class="card-wishlist">
                        <div class="card-wishlist__image__wrapper">
                            <img src={product.image} class="card-wishlist__image" alt="Product Image" />
                        </div>
                        <div class="card-wishlist__description">
                            <div class="card-wishlist__description__title">{product.name}</div>

                            <div class="card-wishlist__price__wrapper">
                                <div class="card-wishlist__price">{'\u20B9'} {product.price}</div>
                                <strike class="card-wishlist__price__crossed ml-2">{'\u20B9'} 1000 </strike>
                                <div class="card-wishlist__price__discount ml-2">10% off</div>
                            </div>

                            <div class="card-wishlist__control__wrapper">
                                
                                <button class="btn btn--icon btn--sm card-wishlist__control__button" onClick={() => wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: { id: item.id } })}>
                                    <span class="material-icons-outlined btn--icon__icon">
                                        delete
                                    </span>
                                    DELETE
                                </button>

                                <button class="btn btn--icon btn--sm card-wishlist__control__button" onClick={() => {
                                    cartDispatch({ type: 'ADD_TO_CART', payload: { id: item.id }});
                                    wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: { id: item.id }});
                                }}>
                                    <span class="material-icons-outlined btn--icon__icon">
                                        shopping_bag
                                    </span>
                                    MOVE TO BAG
                                </button>
                                
                            </div>

                            </div>
                        </div>
                    )
                })
                :
                "Your Wishlist is Empty :("
            }
        </div>
     );
}
 
export default Wishlist;