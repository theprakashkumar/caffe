import { createContext, useReducer } from 'react';
import wishlistReducer from '../reducers/WishlistReducer';

export const WishlistContext = createContext();

export const WishlistProvider = ({children}) => {
    const initialState = [];
    const [state, dispatch] = useReducer(wishlistReducer, initialState);
    return (
        <WishlistContext.Provider value={{state, dispatch}}>
            {children}
        </WishlistContext.Provider>
    )
}