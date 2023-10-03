import "./AddNewAddress.css";
import { useState, useContext } from "react";
import { AddressContext } from "../contexts/AddressContext";

const AddNewAddress = ({ closeModal }) => {
    const { addNewAddress } = useContext(AddressContext);
    const [newAddress, setNewAddress] = useState({
        name: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        mobile: "",
    });

    const [isAdding, setIsAdding] = useState(false);

    const isAnyFieldEmpty =
        !newAddress.name ||
        !newAddress.street ||
        !newAddress.city ||
        !newAddress.state ||
        !newAddress.zipCode ||
        !newAddress.mobile;

    const changeHandler = (e) => {
        setNewAddress((newAddress) => ({
            ...newAddress,
            [e.target.name]: e.target.value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsAdding(true);
        const isNewAddressAdded = await addNewAddress(newAddress);
        if (isNewAddressAdded) {
            return closeModal(false);
        }
        setIsAdding(false);
    };

    return (
        <div
            className="add-new-address"
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <p className="heading heading--h5 new-address-input-title">
                Add New Address
            </p>
            <form onSubmit={(e) => submitHandler(e)}>
                <div className="input-text-wrapper mb-1">
                    <input
                        className="input-text new-address-input"
                        type="text"
                        value={newAddress.name}
                        placeholder="Name"
                        name="name"
                        onChange={(e) => changeHandler(e)}
                        disabled={isAdding}
                    />
                </div>
                <div className="input-text-wrapper mb-1">
                    <input
                        className="input-text new-address-input"
                        type="text"
                        value={newAddress.street}
                        placeholder="Street"
                        name="street"
                        onChange={(e) => changeHandler(e)}
                        disabled={isAdding}
                    />
                </div>
                <div className="input-text-wrapper mb-1">
                    <input
                        className="input-text new-address-input"
                        type="text"
                        value={newAddress.city}
                        placeholder="City"
                        name="city"
                        onChange={(e) => changeHandler(e)}
                        disabled={isAdding}
                    />
                </div>
                <div className="input-text-wrapper mb-1">
                    <input
                        className="input-text new-address-input"
                        type="text"
                        value={newAddress.state}
                        placeholder="State"
                        name="state"
                        onChange={(e) => changeHandler(e)}
                        disabled={isAdding}
                    />
                </div>
                <div className="input-text-wrapper mb-1">
                    <input
                        className="input-text new-address-input"
                        type="text"
                        value={newAddress.zipCode}
                        placeholder="Zip Code"
                        name="zipCode"
                        onChange={(e) => changeHandler(e)}
                        disabled={isAdding}
                    />
                </div>
                <div className="input-text-wrapper mb-1">
                    <input
                        className="input-text new-address-input"
                        type="text"
                        value={newAddress.mobile}
                        placeholder="Mobile"
                        name="mobile"
                        onChange={(e) => changeHandler(e)}
                        disabled={isAdding}
                    />
                </div>
                <button
                    className="btn add-address-btn mt-0-5"
                    disabled={isAnyFieldEmpty || isAdding}
                >
                    {isAdding ? "Adding New Address" : " Add Address"}
                </button>
            </form>
        </div>
    );
};

export default AddNewAddress;
