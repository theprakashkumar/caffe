const wishlistReducer = (state, action) => {
    switch (action.type) {
        case "SYNC_WISHLIST":
            return [...action.payload.product];
        case "ADD_TO_WISHLIST":
            return [...state, { ...action.payload.product }];
        case "REMOVE_FROM_WISHLIST":
            return state.filter(
                (item) => item._id !== action.payload.product._id
            );
        case "RESET_WISHLIST":
            return [];
        default:
            return state;
    }
};

export default wishlistReducer;
