const cartReducer = (state, action) => {
    switch (action.type) {
        case "SYNC_CART":
            return [...action.payload.product];
        case "ADD_TO_CART":
            return [...state, { ...action.payload.product }];
        case "REMOVE_FROM_CART":
            return state.filter(
                (item) => item._id !== action.payload.product._id
            );
        case "RESET_CART":
            return [];
        default:
            return state;
    }
};

export default cartReducer;
