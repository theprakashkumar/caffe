// ! Move to Cart Statement

const wishlistReducer = (state, action) => {
    switch (action.type) {
        case "SYNC_WISHLIST":
            return [...action.payload.product];
        case "ADD_TO_WISHLIST":
            return [...state, { ...action.payload.product }];
        case "REMOVE_FROM_WISHLIST":
            return state.filter(
                (item) => item.product._id !== action.payload._id
            );
        case "MOVE_ITEM_TO_CART":
            console.log("Item Has Move to Cart!");
    }
};

export default wishlistReducer;
