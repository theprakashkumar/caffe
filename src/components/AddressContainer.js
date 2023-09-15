import "./AddressContainer.css";
import { AuthContext } from "../contexts/AuthContext";
import useAddress from "../hooks/useAddress";
import { useContext, useEffect, useState } from "react";
import AddressCard from "./AddressCard";
import AddNewAddress from "./AddNewAddress";
import { ToastContainer } from "react-toastify";

const AddressContainer = ({ isCheckout }) => {
    const {
        isLoading: addressLoading,
        addresses,
        newAddressThere,
    } = useAddress();

    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="addressContainer">
            {isCheckout && (
                <p className="heading heading--h5 mt-1 mb-1 addressContainer-title">
                    Delivery Address
                </p>
            )}
            <div className="addresses">
                {!addressLoading &&
                    addresses.map((address) => (
                        <AddressCard {...address} isCheckout={isCheckout} />
                    ))}
            </div>
            {isCheckout && (
                <button
                    className="btn btn--link mt-1"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add New Address
                </button>
            )}
            {isModalOpen && (
                <div
                    onClick={() => {
                        setIsModalOpen(false);
                    }}
                    className="new-address-form-wrapper"
                >
                    <AddNewAddress closeModal={setIsModalOpen} />
                </div>
            )}
            <ToastContainer
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
            />
        </div>
    );
};

export default AddressContainer;
