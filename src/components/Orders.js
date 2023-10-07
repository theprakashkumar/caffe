import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import OrderCard from "./OrderCard";
import { PropagateLoader } from "react-spinners";

const Orders = () => {
    const { userId, token } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await axios.get(`/order/${userId}`, {
                    headers: { authorization: token },
                });

                if (response.data.success) {
                    setOrders(response.data.order);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                // ! SHOW TOAST
            }
        };
        getOrders();
        // eslint-disable-next-line
    }, []);
    return (
        <div>
            {loading ? (
                <div className="mt-5">
                    <PropagateLoader
                        color={"#0f172a"}
                        size={15}
                        speedMultiplier={1.5}
                    />
                </div>
            ) : (
                <div>
                    {orders.length === 0 ? (
                        <p className="heading mt-2">No order found</p>
                    ) : (
                        <div className="order-card-container">
                            {orders.map((order) => (
                                <OrderCard {...order} key={order.orderId} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Orders;
