export const privateMessages = (state = {}, action) => {
    switch (action.type) {
        case "ADD_PRIVATE_MESSAGES":
            let contact = action.messages[0];
            const messages = action.messages[1];
            state = { ...state, [contact]: messages };
            break;
        case "ADD_PRIVATE_MESSAGE":
            contact = action.message[0];
            state = {
                ...state,
                [contact]: [...state[contact], action.message[1]],
            };
            break;
    }
    return state;
};
