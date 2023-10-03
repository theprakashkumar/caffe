import "./Checkout.css";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router";
import AddressContainer from "../components/AddressContainer";

const Checkout = () => {
    const { state: cartData } = useContext(CartContext);
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

    useEffect(() => {
        // if there is nothing in the cart navigate to /cart
        if (cartData.length === 0) {
            navigate("/cart");
        }
        // eslint-disable-next-line
    }, [cartData]);

    return (
        <div className="checkout-container">
            <p className="heading heading--h5 mt-1 mb-1 delivery-title">
                Delivery Address
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
            {}
            <div>Payment</div>
        </div>
    );
};

export default Checkout;
