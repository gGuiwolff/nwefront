export const loading = (state = false, action) => {
    switch (action.type) {
        case "SET_LOADING":
            state = action.payload;
            break;
        default:
            return state;
    }
    return state;
};
