import { createContext, useReducer } from "react";
import reducer from "../reducers/FilterReducer";

export const FilterContext = createContext();

const initialState = {
    fastDeliveryOnly: false,
    showAll: false,
    sortBy: null
}

export const FilterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <FilterContext.Provider value = {{state, dispatch}}>
            { children }
        </FilterContext.Provider>
    );
};