import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";

const useAddress = () => {
    const { userId, token } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [addresses, setAddresses] = useState([]);

    const [newAddressThere, setNewAddressThere] = useState("Nope");
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

            setNewAddressThere("if ran");
            setAddresses(response.data.updatedAddresses.addresses);

            // return true;
        } catch (error) {
            console.log(error);
            toast.error("Couldn't Add Address!", {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }
    };

    useEffect(() => {
        const getAddress = async () => {
            try {
                const response = await axios.get(`/address/${userId}`, {
                    headers: {
                        authorization: token,
                    },
                });
                if (response.data.success) {
                    setAddresses(response.data.addresses.addresses);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getAddress();
    }, []);

    return { isLoading, addresses, addNewAddress, newAddressThere };
};

export default useAddress;
