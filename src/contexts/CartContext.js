import { createContext, useReducer } from 'react';
import cartReducer from '../reducers/CartReducer';

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const initialState = [];
    const [state, dispatch] = useReducer(cartReducer, initialState);
    console.log(state);
    return (
        <CartContext.Provider value={{state, dispatch}}>
            {children}
        </CartContext.Provider>
    )
}

// Cart Should Have Following Functionality: * Add to Cart * Remove From Card * Increase Quqantiy * Decrease Quantity
