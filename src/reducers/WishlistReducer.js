const wishlistReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_WISHLIST':
            return [...state, {
                id: action.payload.id
            }];
        case 'REMOVE_FROM_WISHLIST':
            return state.filter(item => item.id !== action.payload.id);
    }
}

export default wishlistReducer;