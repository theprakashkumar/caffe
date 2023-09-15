import { useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router";
import AddressContainer from "../components/AddressContainer";

const Checkout = () => {
    const { state: cartData } = useContext(CartContext);

    const navigate = useNavigate();

    useEffect(() => {
        // if there is nothing is the cart navigate to /cart
        if (cartData.length === 0) {
            navigate("/cart");
        }
    }, [cartData]);

    return (
        <>
            <AddressContainer isCheckout={true} />
            <div>Payment</div>
        </>
    );
};

export default Checkout;
