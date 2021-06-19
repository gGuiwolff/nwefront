export const chat = (state = [], action) => {
    switch (action.type) {
        case "ADD_MESSAGES":
            state = action.messages;
            break;
        case "ADD_MESSAGE":
            state = [...state, action.message];
            break;
    }
    return state;
};
