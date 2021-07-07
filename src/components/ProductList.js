import { useContext, useState } from "react";
import { DataContext } from "../contexts/DataContext";
import { FilterContext } from "../contexts/FilterContext";
import Filter from "./Filter";
import ProductCard from "./ProductCard";

const ProductList = () => {
    const { data } = useContext(DataContext);
    const { state } = useContext(FilterContext);
    const { fastDeliveryOnly, showAll, sortBy } = state;
    const [isLoading] = useState(false);

    // filter data
    const getFilteredProduct = (product, fastDeliveryOnly, showAll) => {
        return product
            .filter(({ fastDelivery }) =>
                fastDeliveryOnly ? fastDelivery : true
            )
            .filter(({ inStock }) => (showAll ? true : inStock));
    };

    // sort product
    const getSortedProduct = (product, sortBy) => {
        if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
            return product.sort((a, b) => a["price"] - b["price"]);
        }
        if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
            return product.sort((a, b) => b["price"] - a["price"]);
        }
        return product;
    };

    const filteredProduct = getFilteredProduct(data, fastDeliveryOnly, showAll);
    const sortedProduct = getSortedProduct(filteredProduct, sortBy);

    return (
        <div className="product-card">
            <Filter />
            {isLoading ? (
                <p>Loading Data</p>
            ) : (
                sortedProduct.map((product) => (
                    <ProductCard details={product} />
                ))
            )}
        </div>
    );
};

export default ProductList;
