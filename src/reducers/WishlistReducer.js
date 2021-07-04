// ! Move to Cart Statement

const wishlistReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_WISHLIST":
            return [
                ...state,
                {
                    product: action.payload.product,
                },
            ];
        case "REMOVE_FROM_WISHLIST":
            return state.filter((item) => item.id !== action.payload.id);
        case "MOVE_ITEM_TO_CART":
            console.log("Item Has Move to Cart!");
    }
};

export default wishlistReducer;
