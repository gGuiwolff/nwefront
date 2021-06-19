export const threads = (state = null, action) => {
    switch (action.type) {
        case "RECEIVE_THREADS":
            state = action.threads;
            break;
        case "UPDATE_THREAD":
            const contact = action.message[0];
            state = {
                ...state,
                [contact]: {
                    recipient: action.message[1].recipient_id,
                    sender: action.message[1].recipient_id,
                    message: action.message[1].message,
                    time: action.message[1].created_at,
                },
            };
            break;
        default:
            return state;
    }
    return state;
};
