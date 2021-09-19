import { useContext, useState } from "react";
import { DataContext } from "../contexts/DataContext";
import { FilterContext } from "../contexts/FilterContext";
import Filter from "./Filter";
import ProductCard from "./ProductCard";

const ProductList = () => {
    const { data } = useContext(DataContext);
    const { state } = useContext(FilterContext);
    const { fastDeliveryOnly, showAll, sortBy } = state;
    // const [isLoading] = useState(false);

    // filter products
    const getFilteredProduct = (product, fastDeliveryOnly, showAll) => {
        return product
            .filter(({ fastDelivery }) =>
                fastDeliveryOnly ? fastDelivery : true
            )
            .filter(({ inStock }) => (showAll ? true : inStock));
    };

    // sort products
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
            {data ? (
                sortedProduct.map((product) => (
                    <ProductCard details={product} />
                ))
            ) : (
                <p>Loading Data</p>
            )}
        </div>
    );
};

export default ProductList;
