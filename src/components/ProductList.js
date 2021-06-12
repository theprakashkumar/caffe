import { useContext } from "react";
import { data } from "../data";
import { FilterContext } from "../contexts/FilterContext";
import Filter from "./Filter";
import ProductCard from "./ProductCard";

const ProductList = () => {
    const { state } = useContext(FilterContext);
    const {fastDeliveryOnly, showAll, sortBy} = state;

    // filter data
    const getFilteredData = (data, fastDeliveryOnly, showAll) => {
        return data
        .filter(({fastDelivery}) => (
            fastDeliveryOnly ? fastDelivery : true
        ))
        .filter(({inStock}) =>  (
            showAll ? true : inStock
        ));
    };
   
    // sort data
    const getSortedData = (data, sortBy) => {
        if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
            return data.sort((a, b) => a["price"] - b["price"]);
        }
        if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
            return data.sort((a, b) => b["price"] - a["price"]);
        }
        return data;
    };
    
    const filteredData = getFilteredData(data, fastDeliveryOnly, showAll);
    const sortedData = getSortedData(filteredData, sortBy);

    return(
        <div className="product-card">
            <Filter />
            { sortedData.map((product) => <ProductCard details={product}/>)}
        </div>
    )
}

export default ProductList;