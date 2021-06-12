const reducer = (state, action) => {
    switch(action.type){
        case 'TOOGLE_FASTDELIVERY':
            return {
                ...state,
                fastDeliveryOnly: !state.fastDeliveryOnly
            };
        case 'TOOGLE_INVENTORY':
            return {
                ...state, 
                showAll: !state.showAll
            };
        case 'SORT_BY':
            return {
                ...state,
                sortBy: action.payload
            };
        default:
            return state;   
    }
}

export default reducer;