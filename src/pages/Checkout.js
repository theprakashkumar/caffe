import "./Checkout.css";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router";
import AddressContainer from "../components/AddressContainer";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../components/Loader";
import OrderPlaced from "../components/OrderPlaced";

const Checkout = () => {
    const [status, setStatus] = useState("idle");
    const { state: cartData, dispatch: cartDispatch } = useContext(CartContext);
    const { userId, token, email } = useContext(AuthContext);
    const [selectedAddress, setSelectedAddress] = useState();
    const [isAddressContainerOpen, setIsAddressContainerOpen] = useState(true);

    const selectAddressHandler = (address) => {
        setSelectedAddress(address);
        setIsAddressContainerOpen(false);
    };

    const editButtonHandler = () => {
        setIsAddressContainerOpen(true);
    };

    const navigate = useNavigate();

    const getTotalCartValue = () => {
        const total = cartData.reduce((total, product) => {
            return total + product.product?.price * product.quantity;
        }, 0);

        return total;
    };

    // on successful payment make API to verify payment and save order
    const paymentSuccessful = async (razorpayResponse) => {
        try {
            setStatus("verifying");
            const response = await axios.post(
                `/order/placeorder/${userId}`,
                {
                    paymentId: razorpayResponse.razorpay_payment_id,
                    orderId: razorpayResponse.razorpay_order_id,
                    signature: razorpayResponse.razorpay_signature,
                    address: ` ${selectedAddress?.name}, ${selectedAddress?.street}, ${selectedAddress?.city}, ${selectedAddress?.state}-${selectedAddress?.zipCode}`,
                    items: cartData.map((item) => ({
                        product: item.product._id,
                        quantity: item.quantity,
                        mrp: item.product.mrp,
                    })),

                    totalPrice: getTotalCartValue(),
                },
                {
                    headers: {
                        authorization: token,
                    },
                }
            );

            if (response.data.success) {
                // set status to success
                setStatus("success");
                // update the cart
                cartDispatch({
                    type: "SYNC_CART",
                    payload: {
                        product: [],
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlePayment = async (e) => {
        // create order
        try {
            const order = await axios.post(
                `/order/${userId}`,
                { amount: getTotalCartValue() * 100 },
                {
                    headers: {
                        authorization: token,
                    },
                }
            );
            // open modal
            const options = {
                key: process.env.RAZORPAY_KEY_ID,
                amount: getTotalCartValue * 100,
                currency: "INR",
                name: "Caffè",
                description: "Test Transaction",
                image: "https://res.cloudinary.com/theprakashkumar/image/upload/v1696482028/caffe/Coffee/favicon-96x96_x3irua.png",
                order_id: order.data.newOrder.id,
                // this method will get fired on successful payment
                handler: function (response) {
                    paymentSuccessful(response);
                },
                prefill: {
                    name: selectedAddress?.name,
                    email,
                    contact: selectedAddress?.mobile,
                },
                notes: {
                    address: ` ${selectedAddress?.name}, ${selectedAddress?.street}, ${selectedAddress?.city}, ${selectedAddress?.state}-${selectedAddress?.zipCode}`,
                },
                theme: {
                    color: "#0F172A",
                },
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // if there is nothing in the cart navigate to /cart
        if (cartData.length === 0 && status !== "success") {
            navigate("/cart");
        }
        // eslint-disable-next-line
    }, [cartData]);

    return (
        <div className="checkout-container">
            {status === "idle" && (
                <>
                    <p className="heading heading--h5 mt-1 mb-1 delivery-title">
                        1. Delivery Address
                    </p>
                    {isAddressContainerOpen && (
                        <AddressContainer
                            isCheckout={true}
                            selectAddressHandler={selectAddressHandler}
                        />
                    )}
                    {selectedAddress && !isAddressContainerOpen && (
                        <div className="selected-address-container">
                            <div>
                                <p className="heading heading--h6">
                                    {selectedAddress.name}
                                </p>
                                <p>
                                    {`${selectedAddress.street} ${selectedAddress.city}, ${selectedAddress.state}-${selectedAddress.zipCode}`}
                                </p>
                                <p></p>
                                <p>{`Mobile: ${selectedAddress.mobile}`}</p>
                            </div>
                            <button
                                onClick={editButtonHandler}
                                className="btn btn-md edit-btn"
                            >
                                Edit
                            </button>
                        </div>
                    )}
                    <p className="heading heading--h5 mt-1 mb-1 delivery-title">
                        2. Payment
                    </p>

                    {selectedAddress && !isAddressContainerOpen && (
                        <div className="payment-container">
                            <div>
                                <p className="order-summery-text">
                                    Order Summary
                                </p>
                                <p>{`${cartData.length} ${
                                    cartData.length > 1 ? "Items" : "Item"
                                }`}</p>
                            </div>

                            <button
                                className="btn"
                                onClick={(e) => handlePayment(e)}
                            >
                                {`Pay ${"\u20B9"}${getTotalCartValue()}`}
                            </button>
                        </div>
                    )}
                </>
            )}
            {status === "verifying" && <Loader />}
            {status === "success" && <OrderPlaced />}
        </div>
    );
};

export default Checkout;
