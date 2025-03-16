import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
    const { userId, token } = useContext(AuthContext);
    const [addresses, setAddresses] = useState([]);

    const getAddress = async () => {
        try {
            const response = await axios.get(`/address/${userId}`, {
                headers: {
                    authorization: token,
                },
            });
            if (response.data.success) {
                setAddresses(response.data.addresses.addresses);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addNewAddress = async (address) => {
        try {
            const response = await axios.post(
                `/address/${userId}`,
                {
                    address,
                },
                {
                    headers: {
                        authorization: token,
                    },
                }
            );

            setAddresses(response.data.updatedAddresses.addresses);

            return true;
        } catch (error) {
            console.log(error);
            // toast.error("Couldn't Add Address!", {
            //     position: toast.POSITION.BOTTOM_CENTER,
            // });
        }
    };

    useEffect(() => {}, []);
    return (
        <AddressContext.Provider
            value={{ getAddress, addNewAddress, addresses, setAddresses }}
        >
            {children}
        </AddressContext.Provider>
    );
};
