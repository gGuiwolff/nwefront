export const friends = (state = [], action) => {
    switch (action.type) {
        case "RECEIVE_FRIENDS":
            state = action.friends;
            break;
        case "ACCEPT_FRIEND":
            state = state.map((friend) =>
                friend.id === action.id ? { ...friend, accepted: true } : friend
            );
            break;
        case "UNFRIEND":
            state = state.filter((friend) => friend.id !== action.id);
            break;
        default:
            return state;
    }
    return state;
};
