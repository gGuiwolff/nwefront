export const contacts = (state = {}, action) => {
    switch (action.type) {
        case "ADD_CONTACT":
            const { id } = action.contact;
            state = { ...state, [id]: action.contact };
            break;
        default:
            return state;
    }
    return state;
};
