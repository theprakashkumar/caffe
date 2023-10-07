import "./OrderPlaced.css";
import { Link } from "react-router-dom";
import Cart from "../assets/new_releases_FILL0_wght400_GRAD0_opsz24.svg";
const OrderPlaced = () => {
    return (
        <div className="order-placed flex flex-dir-cl flex-align-center">
            <img
                className="order-placed__image mt-2"
                src={Cart}
                alt="Empty Cart Logo"
            />
            <div className="heading--h6 mt-`">Yay, Order Placed!</div>
            <Link className="btn btn--link link" to="/products">
                Shop More
            </Link>
        </div>
    );
};

export default OrderPlaced;
