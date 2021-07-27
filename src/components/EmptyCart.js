import "./EmptyCart.css";
import { Link } from "react-router-dom";
import Cart from "../assets/add_shopping_cart_black_48dp.svg";
const EmptyCart = () => {
    return (
        <div>
            <h1>Cart</h1>
            <img src={Cart} alt="React Logo" />
            <h2>I am empty :(</h2>
            <h4>Your Cart is Empty</h4>
            <Link to="/products">Go to Catalog</Link>
        </div>
    );
};

export default EmptyCart;
