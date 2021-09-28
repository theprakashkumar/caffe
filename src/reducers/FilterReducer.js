const reducer = (state, action) => {
    switch (action.type) {
        case "TOOGLE_FASTDELIVERY":
            return {
                ...state,
                fastDeliveryOnly: !state.fastDeliveryOnly,
            };
        case "TOOGLE_INVENTORY":
            return {
                ...state,
                showAll: !state.showAll,
            };
        case "SORT_BY":
            return {
                ...state,
                sortBy: action.payload,
            };
        case "CATEGORY":
            return {
                ...state,
                categories: state.categories.some(
                    (value) => value === action.payload.newCategory
                )
                    ? state.categories.filter(
                          (value) => value !== action.payload.newCategory
                      )
                    : state.categories.concat(action.payload.newCategory),
            };
        case "CLEAR_ALL":
            return {
                fastDeliveryOnly: false,
                showAll: false,
                sortBy: null,
                categories: [],
            };

        default:
            return state;
    }
};

export default reducer;
