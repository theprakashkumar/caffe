import "./AddressCard.css";
const AddressCard = (props) => {
    const { name, street, city, state, zipCode, mobile } = props.address;
    const { isCheckout, selectAddressHandler } = props;
    return (
        <div className="address-card">
            <p className="heading heading--h6">{name}</p>
            <p>{`${street} ${city}, ${state}-${zipCode}`}</p>
            <p>{` `}</p>
            <p>{`Mobile: ${mobile}`}</p>
            {isCheckout && (
                <button
                    className="btn btn--sm mt-1"
                    onClick={() => selectAddressHandler(props.address)}
                >
                    Deliver Here
                </button>
            )}
        </div>
    );
};

export default AddressCard;
