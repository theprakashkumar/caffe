import "./ProductList.css";
import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import { FilterContext } from "../contexts/FilterContext";
import Loader from "../components/Loader";
import Filter from "../components/Filter";
import ProductCard from "../components/ProductCard";

const ProductList = () => {
    const { data } = useContext(DataContext);
    const { state } = useContext(FilterContext);
    const { fastDeliveryOnly, showAll, sortBy, categories } = state;

    // filter products
    const getFilteredProduct = (
        product,
        fastDeliveryOnly,
        showAll,
        categories
    ) => {
        return product
            .filter(({ fastDelivery }) =>
                fastDeliveryOnly ? fastDelivery : true
            )
            .filter(({ inStock }) => (showAll ? true : inStock))
            .filter(({ category }) =>
                categories.includes(category) || categories.length === 0
                    ? true
                    : false
            );
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

    const filteredProduct = getFilteredProduct(
        data,
        fastDeliveryOnly,
        showAll,
        categories
    );
    const sortedProduct = getSortedProduct(filteredProduct, sortBy);

    return (
        <div className="product-list-container">
            <Filter />
            {data[0] ? (
                <div className="product-list">
                    {sortedProduct.map((product) => (
                        <ProductCard key={product._id} details={product} />
                    ))}
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default ProductList;
