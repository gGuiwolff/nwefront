export const error = (state = null, action) => {
    switch (action.type) {
        case "SET_ERROR":
            state = action.error;
            break;
        case "RESET_ERROR":
            state = null;
            break;
        default:
            return state;
    }
    return state;
};
