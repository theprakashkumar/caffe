import { Link } from "react-router-dom";
import "./OrderCard.css";
const OrderCard = ({ address, mobile, totalPrice, time, items }) => {
    return (
        <div className="order-card mb-1">
            <div className="top-section">
                <span className="user-details-container">
                    <p className="">Delivery Address: {address}</p>
                    <p>{`Mobile: ${mobile}`}</p>
                </span>
                <span>
                    <p>{new Date(time).toISOString().split("T")[0]}</p>
                    <p className="heading top-section-total-price">{`${"\u20B9"}${totalPrice}`}</p>
                </span>
            </div>

            <div>
                <p className="heading">{`${items?.length} ${
                    items.length > 1 ? "items" : "item"
                }:`}</p>
                <div>
                    {items.map((item) => (
                        <div className="flex flex-justify-sb" key={item._id}>
                            <span>
                                <Link to={`/product/${item.product._id}`}>
                                    {item.product.name}
                                </Link>
                                {" X " + item.quantity}
                            </span>
                            <p>
                                {"\u20B9"}
                                {item.quantity * item.mrp}
                            </p>
                        </div>
                    ))}
                    <hr className="mt-0-5 mb-0-5" />
                    <p className="item-grand-total mt-0-5">{`Grand Total ${"\u20B9"}${totalPrice}`}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
