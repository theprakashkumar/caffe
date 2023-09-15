import "./AddressCard.css";
const AddressCard = ({
    name,
    street,
    city,
    state,
    zipCode,
    mobile,
    isCheckout,
}) => {
    return (
        <div className="address-card">
            <p className="heading heading--h6">{name}</p>
            <p>{`${street}`}</p>
            <p>{` ${city}, ${state}-${zipCode}`}</p>
            <p>{`Mobile: ${mobile}`}</p>
            {isCheckout && (
                <button className="btn btn--sm mt-1">Deliver Here</button>
            )}
        </div>
    );
};

export default AddressCard;
