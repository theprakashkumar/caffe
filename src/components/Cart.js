import "./Cart.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import { data } from "../data";

const foundProduct = (id) => {
    return data.find(item => item.id === id)
}

const Cart = () => {
    const { first } = useContext(AuthContext);
    const { state, dispatch } = useContext(CartContext);
    // console.log(state);
    return ( 
        <div>
            <h1>{first}</h1>
            { state[0] ?
                state.map(item => {
                    let product = foundProduct(item.id);
                    return(
                        <div className="card-cart">

                        <div className="card-cart__image__wrapper">
                            <img src={product.image} className="card-cart__image" alt="Product Image" />
                        </div>

                        <div className="card-cart__description">

                            <div className="card-cart__description__title">{product.name}</div>

                            <div className="card-cart__price__wrapper">
                                <div className="card-cart__price">{'\u20B9'}{product.price}</div>
                                <strike className="card-cart__price__crossed ml-2">{'\u20B9'} 1000 </strike>
                                <div className="card-cart__price__discount ml-2">10% off</div>
                            </div>

                            <div className="card-cart__control__wrapper">
                                <button onClick={() => dispatch({type: 'DECREASE_QUANTITY', payload: {id: item.id}})} className="btn card-cart__control__button">
                                    <span className="material-icons-round">
                                        remove
                                    </span>
                                </button>

                                <div className="cart-cart__control__quantity">{item.quantity}</div>

                                <button onClick={() => dispatch({type: 'INCREASE_QUANTITY', payload: {id: item.id}})} className="btn card-cart__control__button">
                                    <span className="material-icons-round">
                                        add
                                    </span>
                                </button>
                                <button onClick={() => dispatch({type: 'REMOVE_FROM_CART'})} className="btn card-cart__control__button">
                                    <span className="material-icons-round">
                                        delete
                                    </span>
                                </button>
                            </div>

                        </div>
                    </div>
                    )
                })
                :
                "Your Cart Is Empty! 😟"
            }
        </div>
     );
}
 
export default Cart;