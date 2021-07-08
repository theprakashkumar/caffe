const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return [...state, action.payload.product];
        case "REMOVE_FROM_CART":
            return state.filter((item) => item._id !== action.payload.id);
        case "INCREASE_QUANTITY":
            return state.map((item) => {
                return item.id === action.payload.id
                    ? {
                          ...item,
                          quantity: item.quantity + 1,
                      }
                    : item;
            });
        case "DECREASE_QUANTITY":
            let foundItem = state.find((item) => item.id === action.payload.id);
            if (foundItem.quantity === 1) {
                return state.filter((item) => item.id !== action.payload.id);
            }
            return state.map((item) => {
                return item.id === action.payload.id
                    ? {
                          ...item,
                          quantity: item.quantity - 1,
                      }
                    : item;
            });
    }
};

export default cartReducer;
