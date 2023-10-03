import "./AddressContainer.css";
import { useContext, useEffect, useState } from "react";
import AddressCard from "./AddressCard";
import AddNewAddress from "./AddNewAddress";
import { ToastContainer } from "react-toastify";
import { AddressContext } from "../contexts/AddressContext";

const AddressContainer = ({ isCheckout, selectAddressHandler }) => {
    const [addressLoading, setAddressLoading] = useState(true);

    const { getAddress, addresses } = useContext(AddressContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        setAddressLoading(true);
        getAddress();
        setAddressLoading(false);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        // eslint-disable-next-line
    }, []);
    return (
        <div className="addressContainer">
            <div className="addresses">
                {!addressLoading &&
                    addresses.map((address) => (
                        <AddressCard
                            address={address}
                            isCheckout={isCheckout}
                            key={address._id}
                            selectAddressHandler={selectAddressHandler}
                        />
                    ))}
            </div>
            {isCheckout && (
                <button
                    className="btn btn--link mt-1"
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                        });
                        setIsModalOpen(true);
                    }}
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
